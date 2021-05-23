import { useEffect, useState } from 'react'
import type { ColumnProps } from 'react-virtualized'
import type { TableFill } from './Table.types'

export function useTableFill(data: TableFill): [unknown[], ColumnProps[]] {
    const { list, columns, mockList, mockColumns } = data

    const [preparedList, setPreparedList] = useState<unknown[]>([{}])
    const [preparedColumns, setPreparedColumns] = useState<ColumnProps[]>([])

    useEffect(() => {
        setPreparedList(mockList)
        setPreparedColumns(mockColumns)

        if (list.length) {
            setPreparedList(list)
            setPreparedColumns(columns)
        }
    }, [list, columns, mockList, mockColumns])

    return [preparedList, preparedColumns]
}
