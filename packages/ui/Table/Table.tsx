import React, { forwardRef } from 'react'
import { AutoSizer, Column, Table as TableVirtualized } from 'react-virtualized'
import { bem, classes } from '@interaktiv/utils'
import { TableSkeleton } from '../TableSkeleton'
import { useTableFill } from './Table.hook'
import type { TableProps } from './Table.interface'
import './Table.scss'

const cn = bem('Table')

const Table = forwardRef<TableVirtualized, TableProps>((props, ref) => {
    const { list = [], columns = [], className } = props

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
                    className={classes(cn(), className)}
                    ref={ref}
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
})

export { Table }
