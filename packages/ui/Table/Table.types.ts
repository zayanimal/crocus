import type { ColumnProps, IndexRange } from 'react-virtualized'

export interface TableFill {
    list: unknown[]
    columns: ColumnProps[]
    mockList: unknown[]
    mockColumns: ColumnProps[]
    withSkeleton: boolean
}

export interface TableProps {
    list: unknown[]
    columns: ColumnProps[]
    withSkeleton?: boolean
    placeholder?: string
    className?: string
    onRowsRendered?: (params: IndexRange) => void
}

export interface PlaceholderProps {
    title?: string
}
