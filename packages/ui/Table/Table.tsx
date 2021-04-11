import React from 'react'
import { AutoSizer, Column, Table as TableVirtualized } from 'react-virtualized'
import { bem } from '@interaktiv/utils'
import { TableSkeleton } from '../TableSkeleton'
import { useTableFill } from '../hooks'
import type { TableType } from './Table.interface'
import './Table.scss'

const cn = bem('Table')

const Table: TableType = (props) => {
    const { list = [], columns = [] } = props

    const [mockColumns, mockList] = TableSkeleton(columns)
    const [preparedList, preparedColumns] = useTableFill({
        list,
        columns,
        mockList,
        mockColumns
    })

    return (
        <AutoSizer>
            {({ width, height }) => (
                <TableVirtualized
                    className={cn()}
                    width={width}
                    height={height}
                    headerHeight={60}
                    rowClassName={cn('row')}
                    rowHeight={60}
                    rowCount={preparedList.length}
                    rowGetter={({ index }) => preparedList[index]}>
                    {preparedColumns.map((col) => (
                        <Column
                            key={col.dataKey}
                            label={col.label}
                            dataKey={col.dataKey}
                            width={col.width}
                            cellRenderer={col.cellRenderer}
                        />
                    ))}
                </TableVirtualized>
            )}
        </AutoSizer>
    )
}

export { Table }
