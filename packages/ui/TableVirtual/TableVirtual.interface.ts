import type { FC } from 'react'
import type { ColumnProps } from 'react-virtualized'
import type { IPaginationMeta } from '@interaktiv/client/src/modules/shared/interfaces/pagination.interface'

interface TableVirtualProps {
    list: Record<string, unknown>[]
    getList: (limit: number) => void
    columns: ColumnProps[]
    meta: Pick<IPaginationMeta, 'currentPage' | 'totalItems' | 'totalPages'>
}

export type TableVirtualType = FC<TableVirtualProps>
