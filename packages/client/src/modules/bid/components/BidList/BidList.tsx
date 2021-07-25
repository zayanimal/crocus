import React, { useMemo } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { Table, TableRowButton } from '@interaktiv/ui'
import { bem } from '@interaktiv/utils'
import { ListHeader } from '@main/components/ListHeader'
import type { ColumnProps } from 'react-virtualized'
import type { BidProps } from './BidList.types'
import './BidList.scss'

const cn = bem('BidList')

const BidList: React.FC<BidProps> = (props) => {
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
                dataKey: 'brandNames',
                label: 'Названия брэндов',
                width: 300
            },
            {
                dataKey: 'fullname',
                label: 'ФИО',
                width: 300
            },
            {
                dataKey: 'email',
                label: 'E-Mail',
                width: 300
            },
            {
                dataKey: 'phone',
                label: 'Телефон',
                width: 300
            }
        ]
    }, [])

    return (
        <div className={cn()}>
            <ListHeader />
            <Table
                list={list}
                columns={columns}
                placeholder="У вас пока нет заявок"
            />
        </div>
    )
}

export { BidList }
