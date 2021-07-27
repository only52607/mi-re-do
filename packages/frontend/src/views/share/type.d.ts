import { NewsRes, ProductRes, UserReq, UserRes } from "@/api"

export declare type url = string

export declare type Product = ProductReq | ProductRes
export declare type PrivateProduct = PrivateProductReq | PrivateProductRes
export declare type News = NewsReq | NewsRes
export declare type UserEntity = UserReq | UserRes

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

export declare type ProductAttrs = {
    illustrations?: FileItemList
    description?: string
    manual_en?: FileItemList
    manual_cn?: FileItemList
    driver?: FileItemList
    quick_start?: FileItemList
    video?: FileItemList
    extra?: FileItemList
}

export declare type ProductWithAttrs = ProductWithInventory & {
    attrs: Object
}