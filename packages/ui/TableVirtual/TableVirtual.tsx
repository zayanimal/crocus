import React, { useCallback } from 'react'
import InfiniteLoader from 'react-virtualized/dist/es/InfiniteLoader'
import { Table } from '../Table'
import type { TableVirtualType } from './TableVirtual.interface'
import 'react-virtualized/styles.css'

const PAGE_COUNT = 1

const TableVirtual: TableVirtualType = (props) => {
    const {
        list,
        getList,
        columns,
        meta: { currentPage, totalItems, totalPages }
    } = props

    const loadMoreRows = useCallback(() => {
        if (currentPage <= totalPages) {
            getList(currentPage + PAGE_COUNT)
        }

        return Promise.resolve()
    }, [currentPage, totalPages, getList])

    return (
        <div style={{ height: 'calc(100vh - 8.1992em)' }}>
            <InfiniteLoader
                isRowLoaded={({ index }) => !!list[index]}
                loadMoreRows={loadMoreRows}
                rowCount={totalItems}>
                {({ onRowsRendered, registerChild }) => (
                    <Table
                        list={list}
                        columns={columns}
                        onRowsRendered={onRowsRendered}
                        ref={registerChild}
                    />
                )}
            </InfiniteLoader>
        </div>
    )
}

export { TableVirtual }
