import React, { useMemo } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { Table, TableRowButton } from '@interaktiv/ui'
import { bem } from '@interaktiv/utils'
import { ListHeader } from '@main/components/ListHeader'
import type { ColumnProps } from 'react-virtualized'
import type { BrandProps } from './BrandList.types'
import './BrandList.scss'

const cn = bem('BrandList')

const BrandList: React.FC<BrandProps> = (props) => {
    const { list } = props

    const { path } = useRouteMatch()
    const history = useHistory()

    const columns: ColumnProps[] = useMemo(() => {
        return [
            {
                dataKey: 'none',
                label: '',
                width: 90,
                cellRenderer: ({ rowData }) => (
                    <TableRowButton onEdit={() => {}} onRemove={() => {}} />
                )
            },
            {
                dataKey: 'type',
                label: 'Тип',
                width: 150
            },
            {
                dataKey: 'name',
                label: 'Название',
                width: 150
            },
            {
                dataKey: 'brandNames',
                label: 'Названия брэндов',
                width: 200
            },
            {
                dataKey: 'shopsTotal',
                label: 'Всего магазинов',
                width: 200
            },
            {
                dataKey: 'shopsInMalls',
                label: 'Магазины в ТЦ',
                width: 200
            },
            {
                dataKey: 'malls',
                label: 'ТЦ',
                width: 100
            }
        ]
    }, [])

    return (
        <div className={cn()}>
            <ListHeader />
            <Table
                list={list}
                columns={columns}
                placeholder="У вас пока нет брэндов"
            />
        </div>
    )
}

export { BrandList }
