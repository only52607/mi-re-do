export declare type url = string

export declare interface FileItemBase {
    uid: string
    name: string
    url?: string
}

export declare interface FileItem extends FileItemBase {
    uid: string
    name: string
    status?: string
    response?: any
    percent?: number
    url?: string
    preview?: string
    originFileObj?: any
}

export type FileItemList = Array<FileItem>

export declare interface FileInfo {
    file: FileItem
    fileList: FileItem[]
}