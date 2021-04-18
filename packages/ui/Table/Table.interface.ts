import type { ColumnProps, IndexRange } from 'react-virtualized'

export type List = Record<string, unknown>[]

export interface TableFill {
    list: List
    columns: ColumnProps[]
    mockList: List
    mockColumns: ColumnProps[]
}

export interface TableProps {
    list: Record<string, unknown>[]
    columns: ColumnProps[]
    onRowsRendered?: (params: IndexRange) => void
    className?: string
}
