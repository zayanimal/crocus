import { RootStateTypes } from '@config/roots'

export const orderControlState = (state: RootStateTypes) => state.admin.orderControl

export const rate = (state: RootStateTypes) => orderControlState(state).rate

export const goodsInputValue = (state: RootStateTypes) =>
    orderControlState(state).goodsInput

export const goods = (state: RootStateTypes) => orderControlState(state).goods

export const goodsInOrder = (state: RootStateTypes) =>
    orderControlState(state).goodsInOrder

export const goodsSelected = (state: RootStateTypes) =>
    orderControlState(state).goodsSelected

export const goodsListOpen = (state: RootStateTypes) =>
    orderControlState(state).goodsListOpen

export const drawerOpen = (state: RootStateTypes) =>
    orderControlState(state).drawerOpen
