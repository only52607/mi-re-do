import { defineComponent, h } from "@vue/runtime-core";
import { Table, Button } from "ant-design-vue"
import { PageChangedHandler, usePageData } from "./reactivity-manager";

export function useReactivityTable <R> (pageChangedHandler: PageChangedHandler<R>, options: Object = {}){
    const { pagination, onPageChange, data, loading, update } = usePageData(pageChangedHandler)
    const ReactivityTable = defineComponent({
        render() {
            return h(Table,
                    {
                        loading: loading.value,
                        onChange: onPageChange,
                        dataSource: data.value,
                        pagination,
                        ...options,
                        ...this.$props,
                        ...this.$attrs
                    } as any,
                    this.$slots
                )
        }
    })
    const UpdateButton = defineComponent({
        render() {
            return h(Button, {
                onClick: () => update(),
                loading: loading.value,
                ...this.$props,
                ...this.$attrs
            },this.$slots)
        }
    })
    return {
        ReactivityTable,
        UpdateButton,
        loading,
        update
    }
}