import { createReducer, getType } from 'typesafe-actions'
import type { OrderControlState } from '@admin/types'
import { orderControlActions } from '../actions'

const initialState = {
    rate: 0,
    goodsInput: '',
    goods: [],
    goodsInOrder: [],
    goodsSelected: [],

    goodsListOpen: false,
    drawerOpen: false
}

const orderControl = createReducer<OrderControlState>(initialState, {
    [getType(orderControlActions.fetchPriceList.success)]: (state, { payload }) => ({
        ...state,
        rate: payload.rate.Valute.USD.Value,
        goods: payload.price
    }),

    [getType(orderControlActions.cleanPriceList)]: (state) => ({
        ...state,
        goods: [],
        goodsSelected: []
    }),

    [getType(orderControlActions.setGoodsInputValue)]: (state, { payload }) => ({
        ...state,
        goodsInput: payload
    }),

    [getType(orderControlActions.setSelectedGoods)]: (state, { payload }) => ({
        ...state,
        goodsSelected: payload
    }),

    [getType(orderControlActions.putGoodInOrder)]: (state, { payload }) => ({
        ...state,
        goodsInOrder: [...state.goodsInOrder, payload]
    }),

    [getType(orderControlActions.deleteGoodFromOrder)]: (state, { payload }) => ({
        ...state,
        goodsInOrder: payload
    }),

    [getType(orderControlActions.updateGoodInOrder)]: (state, { payload }) => ({
        ...state,
        goodsInOrder: payload
    }),

    [getType(orderControlActions.clearOrder)]: (state) => ({
        ...state,
        goodsInOrder: [],
        goodsSelected: [],
        goodsListOpen: false
    }),

    [getType(orderControlActions.showGoodsList)]: (state, { payload }) => ({
        ...state,
        goodsListOpen: payload
    }),

    [getType(orderControlActions.setDrawerOpen)]: (state, { payload }) => ({
        ...state,
        drawerOpen: payload
    })
})

export { orderControl }
