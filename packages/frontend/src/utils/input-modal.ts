/*
 * @Author: ooooonly
 * @LastEditors: ooooonly
 * @Description: 快速生成input modal
 * @Date: 2021-01-30 21:48:16
 * @LastEditTime: 2021-02-27 21:31:48
 */
import { Modal, Form, Input } from 'ant-design-vue'
import { h, VNode } from "vue";

export interface InputField {
    title: String,
    result?: String,
}

export async function input<K, P extends String | Array<String> | Map<K, InputField>>(title: String, props: P): Promise<P> {
    return new Promise((resolve, reject) => {
        let formContent: any
        let result: P
        if (props instanceof String || typeof props == "string") {
            formContent = h(Form.Item as any, { label: props }, {
                default: () => h(Input, {
                    onChange: event => result = (<any>(event.target)).value
                })
            })
        } else if (props instanceof Array) {
            formContent = props.map((prop, index) => h(Form.Item, { label: prop.title }, {
                default: () => h(Input, {
                    onChange: event => (<Array<String>>result)[index] = (<any>(event.target)).value
                }, "")
            }))
        } else if (props instanceof Map) {
            const items: Array<any> = []
            result = props
            for (let entry of props.entries()) {
                items.push(
                    h(Form.Item,
                        { label: entry[1].title },
                        {
                            default: () => h(Input, {
                                onChange: event => {
                                    const target:any = event.target
                                    entry[1].result = target.value
                                }
                            }, "")
                        }))
            }
            formContent = items
        }
        Modal.confirm({
            title,
            content: h(Form, {}, {
                default: () => formContent
            }
            ),
            onOk: () => resolve(result),
            onCancel: () => reject()
        });
    });
}