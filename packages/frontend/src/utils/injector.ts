import { App, inject, provide } from "@vue/runtime-core";

class UndefinedClassException {

}

export function provideClass <T> (constructor: Constructor<T>, value: T) {
    provide(constructor.toString(), value)
}

export function provideClassInApp <T> (app:App , constructor: Constructor<T>, value: T) {
    app.provide(constructor.toString(), value)
}

export function injectClass <T> (constructor: Constructor<T>): T {
    const result = inject(constructor.toString())
    if (!result) throw new UndefinedClassException()
    return result as T
}