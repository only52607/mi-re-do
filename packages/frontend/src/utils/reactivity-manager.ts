import { reactive, Ref, ref, toRefs } from "@vue/reactivity";
import { computed, onMounted, watch, watchEffect } from "@vue/runtime-core";

/**
 * 基本使用-响应式更新-自定义响应式源
 * 非响应式
 * 后置处理器|Symbol
 * 绑定this对象
 * 触发条件
 * 默认参数
 * 获取加载时间
 * 自定义挂载生命周期
 * 延迟加载状态|静默加载状态
 * 定时执行
 * 防抖|节流
 * *自动重试
 */

type Func = (...params: any) => any
type FuncR<R> = (...params: any) => R
export type UseDataHandler<S,R> = (symbol:S, result:R) => any
export type PageChangedHandler<R> = (pagination: Pagination, filters?: any, sorter?: any) => R
type MaybePromise<R> = R | Promise<R>

export interface Pagination {
    current: number
    total: number
    size: number
    pageSize: number
}

export interface Status {
    startTime: number
    endTime: number
    execTime: number
    error: boolean
    success: boolean
    loading: boolean
}

interface UseDataOptions <S,R> {
    symbol?: S | null                                               // 用于结果处理的标识符
    binding?: any                                                   // 绑定this对象
    startLifeCycle?: Func                                           // 挂载生命周期点
    reactive?: boolean                                              // 是否响应式更新，false 为手动触发
    params?: any[]                                                  // 默认参数
    successHandler?: UseDataHandler<S,R>                            // 成功处理
    errorHandler?: UseDataHandler<S,FetchDataException>             // 失败处理
    watchSource?: () => any                                         // 响应式更新源，如不存在，则默认使用watchEffect检测
    loadingDelay?: number                                           // 延迟加载时间，超过该时间才会标记loading状态
    triggerCondition?: (...params: any) => boolean                  // 触发条件
    debounceDelay?: number                                          // 防抖延迟
    throttleDelay?: number                                          // 节流延迟

    intervalDelay?: number                                          // 定时执行时间
    intervalSlient?: boolean                                        // 静默定时执行
}

interface EffectOptions {
    silent: boolean
}

class FetchDataException {

}

let globalErrorHandler: UseDataHandler<any,any> | null
let globalSuccessHandler: UseDataHandler<any,any> | null

export function setGlobalErrorHandler(handler: UseDataHandler<any,any>) {
    globalErrorHandler = handler
}

export function setGlobalSuccessHandler(handler: UseDataHandler<any,any>) {
    globalSuccessHandler = handler
}

async function unwrapPromise<R>(source: MaybePromise<R>): Promise<R> {
    if (source instanceof Promise) {
        return await source
    } else {
        return source
    }
}

function debounce(fn: any,delay: number){
    let timer: any = null
    return function() {
        if(timer) {
            clearTimeout(timer) 
        }
        timer = setTimeout(fn,delay)
    }
}

function throttle(fn: any,delay: number){
    let valid = true
    return function() {
        if(!valid) {
            return false 
        }
        valid = false
        setTimeout(() => {
            fn()
            valid = true
        }, delay)
    }
}

export function useData <S,R> (fetcher: FuncR<MaybePromise<R>>, options?: UseDataOptions<S,MaybePromise<R>>) {
    const status = reactive({
        loading: false,
        success: false,
        error: false,
        startTime: 0,
        endTime: 0
    } as Status)
    const data:Ref<R | undefined> = ref(undefined)
    const symbol = (options?.symbol? options?.symbol : null) as S
    const loadingDelay = options?.loadingDelay? options?.loadingDelay : 0
    const bindedFetcher = options?.binding? fetcher.bind(options.binding) : fetcher
    const effect = async (effectOptions:EffectOptions, ...params:any) => {
        // 判断是否符合触发条件
        if (options?.triggerCondition && !options?.triggerCondition(...params)) {
            return
        }
        status.startTime = Date.now()
        status.endTime = 0
        status.success = false
        status.error = false
        let startLoadingTimer = undefined
        if (!effectOptions.silent) {
            // 超过loadingDelay还没有完成加载则标记loading状态
            startLoadingTimer = setTimeout(() => {
                if (!status.success && !status.error) {
                    status.loading = true
                }
            }, loadingDelay)
        }
        try {
            data.value = await unwrapPromise(bindedFetcher(...params))
            if (startLoadingTimer) clearTimeout(startLoadingTimer)
            status.success = true
            status.loading = false
            status.endTime = Date.now()
            status.execTime = status.endTime - status.startTime
            if (options?.successHandler) {
                options.successHandler(symbol, data.value)
            } else if (globalSuccessHandler) {
                globalSuccessHandler(symbol, data.value)
            }
        } catch (e) {
            if (startLoadingTimer) clearTimeout(startLoadingTimer)
            status.error = true
            status.loading = false
            status.endTime = Date.now()
            status.execTime = status.endTime - status.startTime
            if (options?.errorHandler) {
                options.errorHandler(symbol, e)
            } else if (globalErrorHandler) {
                globalErrorHandler(symbol, e)
            }
        }
    }
    const effectWithParams = () => {
        if (options?.params) {
            effect({ silent: false }, ...options.params)
        } else {
            effect({ silent: false })
        }
    }
    const effectWithParamsSilent = () => {
        if (options?.params) {
            effect({ silent: true }, ...options.params)
        } else {
            effect({ silent: true })
        }
    }
    const effectProtected = options?.debounceDelay ? debounce(effectWithParams, options.debounceDelay) : (
        options?.throttleDelay ? throttle(effectWithParams, options.throttleDelay) : (
            effect
        )
    )
    const effectProtectedWithParams = options?.debounceDelay ? debounce(effectWithParams, options.debounceDelay) : (
                            options?.throttleDelay ? throttle(effectWithParams, options.throttleDelay) : (
                                effectWithParams
                            )
                        )
    // 响应式触发更新
    if (options?.reactive == undefined ? true : options.reactive) {
        const startLifeCycle = options?.startLifeCycle? options?.startLifeCycle : onMounted
        if (options?.watchSource) {
            startLifeCycle(() => {
                watch(options.watchSource!,effectProtectedWithParams)
                effectWithParams()
            })
        } else {
            startLifeCycle(() => {
                let watching = true
                watchEffect(() => {
                    if (watching) { // 首次直接运行，触发依赖收集
                        effectWithParams()
                    } else {
                        effectProtectedWithParams()
                    }
                })
                watching = false
            })
        }
    }
    // 定时执行器
    const intervalTimer = ref<any>(null)
    if (options?.intervalDelay) {
        if (options?.intervalSlient) {
            intervalTimer.value = setInterval(()=>effectWithParamsSilent(),options.intervalDelay) 
        } else {
            intervalTimer.value = setInterval(()=>effectWithParams(),options.intervalDelay) 
        }
    }
    return {
        update: (...params:any) => effectProtected({ silent: false }, ...params),
        updateSilent: (...params:any) => effectProtected({ silent: true }, ...params),
        status,
        data,
        intervalTimer,
        ...toRefs(status)
    }
}

export function usePageData <S,R> (fetcher: PageChangedHandler<MaybePromise<R>>, options?: UseDataOptions<S,MaybePromise<R>>){
    const pagination = reactive({} as Pagination)
    const filters = reactive({})
    const sorter = reactive({} as any)
    const onPageChange = (_pagination: Pagination, _filters?: any, _sorter?: any) => {
        pagination.current = _pagination.current
        Object.assign(filters, _filters)
        Object.assign(sorter, _sorter)
    }
    if (options) {
        options.watchSource = 
            options?.watchSource ? 
                () => [pagination.current,filters,sorter.order, sorter.columnKey,options!.watchSource!()] : 
                () => [pagination.current,filters,sorter.order, sorter.columnKey]
    } else {
        options = {
            watchSource: () => [pagination.current,filters,sorter.order, sorter.columnKey]
        }
    }
    const result = useData(()=>{
        return fetcher(pagination,filters,sorter)
    },options)
    return {
        pagination,
        filters,
        sorter,
        onPageChange,
        ...result
    }
}

export function useFunction <S,R> (executor: FuncR<MaybePromise<R>>, options?: UseDataOptions<S,MaybePromise<R>>) {
    options = options ? options : {}
    options.reactive = false
    const result = useData(executor,options)
    return {
        func: result.update,
        ...result
    }
}

export function composeBooleanRefs(...refs: Ref<boolean>[]) {
    const composeResult = computed(() => refs.find((r) => r.value))
    return composeResult
}