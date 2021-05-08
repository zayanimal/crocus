/* eslint-disable @typescript-eslint/indent */
import { createAction, createAsyncAction } from 'typesafe-actions'
import type { Good, GoodInOrder } from '@admin/types'

export interface IPriceRateTypes {
    rate: number
    price: Good[]
}

export const fetchPriceList = createAsyncAction(
    'FETCH_PRICE_REQUEST',
    'FETCH_PRICE_SUCCESS',
    'FETCH_PRICE_FAILURE'
)<undefined, IPriceRateTypes, string>()

export const setGoodsInputValue = createAction('SET_GOODS_INPUT_VALUE')<string>()

export const sendNewProject = createAction('SEND_NEW_PROJECT_DATA')()
export const completeData = createAction('COMPLETE')()

export const filterModels = createAction('FILTER_MODELS')<string>()

export const setSelectedGoods = createAction('SET_SELECTED_GOODS')<Good[]>()

export const cleanPriceList = createAction('CLEAN_PRICE_LIST')()

export const putGoodInOrder = createAction('PUT_GOOD_IN_ORDER')<GoodInOrder>()

export const deleteGoodFromOrder = createAction('DELETE_GOOD_FROM_ORDER')<
    GoodInOrder[]
>()

export const updateGoodInOrder = createAction('UPDATE_GOOD_IN_ORDER')<
    GoodInOrder[]
>()

export const clearOrder = createAction('CLEAR_ORDER')()

export const showGoodsList = createAction('SHOW_GOODS_LIST')<boolean>()

export const setDrawerOpen = createAction('SET_OPEN_DRAWER')<boolean>()
