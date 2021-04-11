import type { FC } from 'react'
import type { ColumnProps } from 'react-virtualized'

interface TableProps {
    list: Record<string, unknown>[]
    columns: ColumnProps[]
}

export type TableType = FC<TableProps>
