import React, { useCallback, useEffect, useMemo, useState } from 'react'
import type { ColumnProps } from 'react-virtualized'
import Table, { Column } from 'react-virtualized/dist/es/Table'
import AutoSizer from 'react-virtualized/dist/es/AutoSizer'
import InfiniteLoader from 'react-virtualized/dist/es/InfiniteLoader'
import { bem } from '@interaktiv/utils'
import { IPaginationMeta } from '@interaktiv/client/src/modules/shared/interfaces/pagination.interface'
import { TableSkeleton } from '../TableSkeleton'
import 'react-virtualized/styles.css'
import './TableVirtual.scss'

const cn = bem('TableVirtual')

interface Props {
    list: object[]
    getList: (limit: number) => void
    columns: ColumnProps[]
    meta: Pick<IPaginationMeta, 'currentPage' | 'totalItems' | 'totalPages'>
}

const TableVirtual: React.FC<Props> = (props) => {
    const {
        list,
        getList,
        columns,
        meta: { currentPage, totalItems, totalPages }
    } = props

    const [mockCols, mockList] = useMemo(() => TableSkeleton(columns), [
        columns
    ])
    const [filledList, setFilledList] = useState([{}])
    const [cols, setCols] = useState<ColumnProps[]>([])

    useEffect(() => {
        setFilledList(mockList)
        setCols(mockCols)

        if (list.length) {
            setFilledList(list)
            setCols(columns)
        }
    }, [list, columns, mockList, mockCols])

    const loadMoreRows = useCallback(() => {
        if (currentPage <= totalPages) {
            getList(currentPage + 1)
        }

        return Promise.resolve()
    }, [currentPage, totalPages, getList])

    return (
        <div style={{ height: 'calc(100vh - 8.1992em)' }}>
            <InfiniteLoader
                isRowLoaded={({ index }) => !!filledList[index]}
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
                                rowCount={filledList.length}
                                rowGetter={({ index }) => filledList[index]}>
                                {cols.map((col) => (
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
