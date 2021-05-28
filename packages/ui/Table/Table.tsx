import React, { forwardRef } from 'react'
import { AutoSizer, Column, Table as TableVirtualized } from 'react-virtualized'
import { bem, classes } from '@interaktiv/utils'
import { TableSkeleton } from '../TableSkeleton'
import { useTableFill } from './Table.hook'
import type { PlaceholderProps, TableProps } from './Table.types'
import './Table.scss'

const cn = bem('Table')

const Placeholder = (props: PlaceholderProps) => {
    const { title = '' } = props

    return <div className={cn('no-data')}>{title}</div>
}

const Table = forwardRef<TableVirtualized, TableProps>((props, ref) => {
    const {
        list = [],
        columns = [],
        withSkeleton = false,
        placeholder,
        className
    } = props

    const [mockColumns, mockList] = TableSkeleton(columns)
    const [preparedList, preparedColumns] = useTableFill({
        list,
        columns,
        mockList,
        mockColumns,
        withSkeleton
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
                    noRowsRenderer={() => <Placeholder title={placeholder} />}
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
