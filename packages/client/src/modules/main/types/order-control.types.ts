import type { Good, GoodInOrder } from './goods.types'

export interface OrderControlState {
    rate: number
    goodsInput: string
    goods: Good[]
    goodsInOrder: GoodInOrder[]
    goodsSelected: Good[]

    goodsListOpen: boolean
    drawerOpen: boolean
}
