import type { ColumnProps, IndexRange } from 'react-virtualized'

export interface TableFill {
    list: unknown[]
    columns: ColumnProps[]
    mockList: unknown[]
    mockColumns: ColumnProps[]
}

export interface TableProps {
    list: unknown[]
    columns: ColumnProps[]
    onRowsRendered?: (params: IndexRange) => void
    className?: string
}
