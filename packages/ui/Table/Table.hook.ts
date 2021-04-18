import { useEffect, useState } from 'react'
import type { ColumnProps } from 'react-virtualized'
import type { List, TableFill } from './Table.interface'

export function useTableFill(data: TableFill): [List, ColumnProps[]] {
    const { list, columns, mockList, mockColumns } = data

    const [preparedList, setPreparedList] = useState([{}])
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
