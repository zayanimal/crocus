import type { FC } from 'react'
import type { ColumnProps } from 'react-virtualized'

export interface PaginationMeta {
    currentPage: number
    itemCount: number
    itemsPerPage: number
    totalItems: number
    totalPages: number
}

interface TableVirtualProps {
    list: Record<string, unknown>[]
    getList: (limit: number) => void
    columns: ColumnProps[]
    meta: Pick<PaginationMeta, 'currentPage' | 'totalItems' | 'totalPages'>
}

export type TableVirtualType = FC<TableVirtualProps>
