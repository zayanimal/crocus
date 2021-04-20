import { createReducer, getType } from 'typesafe-actions'
import { orderControlActions } from '../actions'

export interface IPriceTypes {
    id: number
    model: string
    price: number
}

export interface IPriceTypesCount extends IPriceTypes {
    count: number
}

export interface InitialState {
    rate: number
    modelInput: string
    modelsData: IPriceTypes[]
    modelsDataInOrder: IPriceTypesCount[]
    modelsSelected: IPriceTypes[]
    showList: boolean
    validation: boolean
    drawerOpen: boolean
}

const initialState = {
    rate: 0,
    modelInput: '',
    modelsData: [],
    modelsDataInOrder: [],
    modelsSelected: [],
    showList: false,
    validation: false,
    drawerOpen: false
}

const orderControl = createReducer<InitialState>(initialState, {
    [getType(orderControlActions.fetchPriceList.success)]: (
        state,
        { payload }
    ) => ({
        ...state,
        rate: payload.rate.Valute.USD.Value,
        modelsData: payload.price
    }),

    [getType(orderControlActions.cleanPriceList)]: (state) => ({
        ...state,
        modelsData: [],
        modelsSelected: []
    }),

    [getType(orderControlActions.setModelInputValue)]: (
        state,
        { payload }
    ) => ({
        ...state,
        modelInput: payload
    }),

    [getType(orderControlActions.setSelectedModels)]: (state, { payload }) => ({
        ...state,
        modelsSelected: payload
    }),

    [getType(orderControlActions.putModelInOrder)]: (state, { payload }) => ({
        ...state,
        modelsDataInOrder: [...state.modelsDataInOrder, payload]
    }),

    [getType(orderControlActions.deleteModelInOrder)]: (
        state,
        { payload }
    ) => ({
        ...state,
        modelsDataInOrder: payload
    }),

    [getType(orderControlActions.updateModelInOrder)]: (
        state,
        { payload }
    ) => ({
        ...state,
        modelsDataInOrder: payload
    }),

    [getType(orderControlActions.clearOrder)]: (state) => ({
        ...state,
        modelInput: '',
        modelsDataInOrder: [],
        modelsSelected: [],
        showList: false
    }),

    [getType(orderControlActions.showList)]: (state, { payload }) => ({
        ...state,
        showList: payload
    }),

    [getType(orderControlActions.setValidation)]: (state, { payload }) => ({
        ...state,
        validation: payload
    }),

    [getType(orderControlActions.setDrawerOpen)]: (state, { payload }) => ({
        ...state,
        drawerOpen: payload
    })
})

export { orderControl }
