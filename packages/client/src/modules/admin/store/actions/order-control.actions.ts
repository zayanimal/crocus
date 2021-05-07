/* eslint-disable @typescript-eslint/indent */
import { createAction, createAsyncAction } from 'typesafe-actions'

export interface IPriceTypes {
    id: number
    model: string
    price: number | string
}

export interface IPriceTypesCount extends IPriceTypes {
    count: number
}

export interface IPriceRateTypes {
    rate: number
    price: IPriceTypes[]
}

export const fetchPriceList = createAsyncAction(
    '[CUSTOMER] FETCH_PRICE_REQUEST',
    '[CUSTOMER] FETCH_PRICE_SUCCESS',
    '[CUSTOMER] FETCH_PRICE_FAILURE'
)<undefined, IPriceRateTypes, string>()

export const setGoodsInputValue = createAction(
    '[CUSTOMER] SET_GOODS_INPUT_VALUE'
)<string>()

export const sendNewProject = createAction('[CUSTOMER] SEND_NEW_PROJECT_DATA')()
export const completeData = createAction('[CUSTOMER] COMPLETE')()

export const filterModels = createAction('[CUSTOMER] FILTER_MODELS')<string>()

export const setSelectedGoods = createAction('[CUSTOMER] SET_SELECTED_GOODS')<
    IPriceTypes[]
>()

export const cleanPriceList = createAction('[CUSTOMER] CLEAN_PRICE_LIST')()

export const putGoodInOrder = createAction('[CUSTOMER] PUT_GOOD_IN_ORDER')<
    IPriceTypesCount | undefined
>()

export const deleteModelInOrder = createAction('[CUSTOMER] DELETE_MODEL_IN_ORDER')<
    IPriceTypesCount[]
>()

export const updateModelInOrder = createAction('[CUSTOMER] UPDATE_MODEL_IN_ORDER')<
    IPriceTypesCount[]
>()

export const clearOrder = createAction('[CUSTOMER] CLEAR_ORDER')()

export const showGoodsList = createAction('[CUSTOMER] SHOW_GOODS_LIST')<boolean>()

export const setValidation = createAction('[ADMIN] SET_VALIDATION')<boolean>()

export const setDrawerOpen = createAction('[ADMIN] SET_OPEN_DRAWER')<boolean>()
