import React, { useCallback } from 'react'
import type { ColumnProps } from 'react-virtualized'
import Table, { Column } from 'react-virtualized/dist/es/Table'
import AutoSizer from 'react-virtualized/dist/es/AutoSizer'
import InfiniteLoader from 'react-virtualized/dist/es/InfiniteLoader'
import { bem } from '@interaktiv/utils'
import { IPaginationMeta } from '@interaktiv/client/src/modules/shared/interfaces/pagination.interface'
import { TableSkeleton } from '../TableSkeleton'
import { useTableFill } from '../hooks'
import 'react-virtualized/styles.css'
import './TableVirtual.scss'

const cn = bem('TableVirtual')

interface Props {
    list: Record<string, unknown>[]
    getList: (limit: number) => void
    columns: ColumnProps[]
    meta: Pick<IPaginationMeta, 'currentPage' | 'totalItems' | 'totalPages'>
}

const PAGE_COUNT = 1

const TableVirtual: React.FC<Props> = (props) => {
    const {
        list,
        getList,
        columns,
        meta: { currentPage, totalItems, totalPages }
    } = props

    const [mockColumns, mockList] = TableSkeleton(columns)
    const [preparedList, preparedColumns] = useTableFill({
        list,
        columns,
        mockList,
        mockColumns
    })

    const loadMoreRows = useCallback(() => {
        if (currentPage <= totalPages) {
            getList(currentPage + PAGE_COUNT)
        }

        return Promise.resolve()
    }, [currentPage, totalPages, getList])

    return (
        <div style={{ height: 'calc(100vh - 8.1992em)' }}>
            <InfiniteLoader
                isRowLoaded={({ index }) => !!preparedList[index]}
                loadMoreRows={loadMoreRows}
                rowCount={totalItems}>
                {({ onRowsRendered, registerChild }) => (
                    <AutoSizer>
                        {({ width, height }) => (
                            <Table
                                className={cn()}
                                width={width}
                                height={height}
                                onRowsRendered={onRowsRendered}
                                ref={registerChild}
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
                            </Table>
                        )}
                    </AutoSizer>
                )}
            </InfiniteLoader>
        </div>
    )
}

export { TableVirtual }
