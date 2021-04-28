import type { FC } from 'react'

interface OrderControlDrawerProps {
    open?: boolean
    onSetOpen: (state: boolean) => void
}

export type OrderControlDrawerType = FC<OrderControlDrawerProps>
