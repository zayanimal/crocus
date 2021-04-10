import type { FC } from 'react'
import type { ColumnProps } from 'react-virtualized'

interface TableProps {
    list: object[]
    columns: ColumnProps[]
}

export type TableType = FC<TableProps>
