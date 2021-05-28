import React from 'react'
import { Button, Input } from '@material-ui/core'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import type { ColumnProps } from 'react-virtualized'

export const columns: ColumnProps[] = [
    {
        dataKey: 'id',
        label: '№',
        width: 50
    },
    {
        dataKey: 'good',
        label: 'Наименование',
        width: 250
    },
    {
        dataKey: 'qty',
        label: 'Кол-во',
        width: 100,
        cellRenderer: ({ cellData }) => (
            <Input type="number" value={cellData} onChange={() => {}} />
        )
    },
    {
        dataKey: 'price',
        label: 'Цена',
        width: 150
    },
    {
        dataKey: 'node',
        label: 'Действие',
        width: 100,
        cellRenderer: () => (
            <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={() => {}}>
                <DeleteOutlineIcon />
            </Button>
        )
    }
]
