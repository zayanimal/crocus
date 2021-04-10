import React from 'react'
import { AutoSizer, Column, Table as TableVirtualized } from 'react-virtualized'
import { bem } from '@interaktiv/utils'
import type { TableType } from './Table.interface'
import './Table.scss'

const cn = bem('Table')

const Table: TableType = (props) => {
    const { columns = [], list = [] } = props

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
                    rowCount={list.length}
                    rowGetter={({ index }) => list[index]}>
                    {columns.map((col) => (
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
