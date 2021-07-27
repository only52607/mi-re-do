declare module 'ant-design-vue/es/locale/zh_CN'

type TableDataType = {
    key: string;
    name: string;
    age: number;
    address: string;
};

type PaginationType = {
    current: number;
    pageSize: number;
    total: number;
    size: number;
};

type ColumnType = {
    title: string;
    dataIndex: string;
    filters?: {
        text: string;
        value: string;
        children?: {
        text: string;
        value: string;
        }[];
    }[];
    onFilter?: (value: string, record: TableDataType) => boolean;
    sorter?: (a: TableDataType, b: TableDataType) => number;
    sortDirections?: string[];
    defaultSortOrder?: string;
    filterMultiple?: string[] | boolean;
};