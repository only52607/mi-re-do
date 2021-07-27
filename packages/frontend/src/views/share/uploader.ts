import { defineComponent, h, reactive, Ref } from "@vue/runtime-core"
import { Upload } from "ant-design-vue"
import config from "@/config"
import { FileInfo, FileItem, FileItemBase } from "./type"

export function useUpload() {
    const fileList:Array<FileItem> = reactive([])
    return defineComponent({
        props: {
            fileListSimplify: Object
        },
        render() {
            return h(Upload, {
                ...this.$attrs,
                ...this.$props,
                fileList: fileList,
                onChange:(info: FileInfo) => {
                    info.fileList.forEach((fileItem: FileItem) => {
                        if(fileItem.status == "done") {
                            if (!(fileItem as any)._simplify) {
                                (fileItem as any)._simplify = {
                                    name: fileItem.name,
                                    uid: fileItem.uid,
                                    url: fileItem.url
                                } as FileItemBase
                            }
                        }
                    })
                    this.$emit("update:fileListSimplify", fileList.filter((fileItem: FileItem) => (fileItem as any)._simplify))
                }
            } ,this.$slots)
        }
    })
}

