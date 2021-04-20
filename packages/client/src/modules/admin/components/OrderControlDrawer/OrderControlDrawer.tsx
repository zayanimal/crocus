import React from 'react'
import { DrawerForm, Fields } from '@interaktiv/ui'
import { bem } from '@interaktiv/utils'
import type { OrderControlDrawerType } from './OrderControlDrawer.interface'
import './OrderControlDrawer.scss'

const cn = bem('OrderControlDrawer')

export const orderDrawerFields = [
    {
        label: 'Название заказчика',
        name: 'name',
        type: 'text',
        class: cn('row')
    },
    { label: 'Город', type: 'text', name: 'city', class: cn('row') },
    { label: 'Дата', type: 'date', name: 'date', class: cn('row') },
    {
        label: 'Дополнительная информация',
        type: 'text',
        name: 'info',
        class: cn('row')
    }
]

const OrderControlDrawer: OrderControlDrawerType = (props) => {
    const { open = false, onSetOpen } = props

    const closeDrawer = () => onSetOpen(false)

    return (
        <DrawerForm
            label="Данные о заказчике"
            width="400"
            toggle={open}
            onClose={closeDrawer}>
            <div className={cn()}>
                <Fields
                    fields={orderDrawerFields}
                    entity={{}}
                    handler={() => {}}
                />

                {/* <div className={cn('row')}>
                    <TextField
                        label="Название заказчика"
                        onChange={() => {}}
                        value=""
                        error={false}
                        size="small"
                        fullWidth
                        multiline
                        helperText=""
                    />
                </div>
                <div className={cn('row')}>
                    <TextField
                        label="Город"
                        onChange={() => {}}
                        value=""
                        error={false}
                        size="small"
                        helperText=""
                    />
                </div>
                <div className={cn('row')}>
                    <KeyboardDatePicker
                        disableToolbar
                        onChange={() => {}}
                        value=""
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        minDate={new Date()}
                        helperText="Срок поставки"
                    />
                </div>
                <div className={cn('row')}>
                    <TextField
                        label="Дополнительная информация"
                        onChange={() => {}}
                        value=""
                        error={false}
                        size="small"
                        fullWidth
                        multiline
                        helperText=""
                    />
                </div> */}
            </div>
        </DrawerForm>
    )
}

export { OrderControlDrawer }
