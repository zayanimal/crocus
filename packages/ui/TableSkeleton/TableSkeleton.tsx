import React, { useMemo } from 'react'
import uuid from 'uuid-random'
import { range, set, transform } from 'lodash'
import { bem } from '@interaktiv/utils'
import type { ColumnProps } from 'react-virtualized'
import './TableSkeleton.scss'

const cn = bem('TableSkeleton')

const ROW_COUNT = 10

export const TableSkeleton = (
    columns: ColumnProps[]
): [ColumnProps[], Record<string, unknown>[]] => {
    const cols = columns.map((column) =>
        transform(
            column,
            (acc, value, key) => {
                set(acc, key, value)
                set(acc, 'cellRenderer', () => (
                    <div key={uuid()} className={cn()} />
                ))

                return acc
            },
            {} as ColumnProps
        )
    )

    const row = columns.reduce((acc, item) => set(acc, item.dataKey, ''), {})

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useMemo(() => [cols, range(ROW_COUNT).map(() => row)], [columns])
}
