import { createReducer, getType } from 'typesafe-actions'
import { controlActions } from '@brand/actions'
import { Brand } from '@brand/entities'

interface State extends Brand {
    editMode: boolean
}

const initialState = {
    ...new Brand(),
    editMode: false
}

export const control = createReducer<State>(initialState, {
    [getType(controlActions.getBrand.success)]: (state, { payload }) => ({
        ...state,
        ...payload
    }),

    [getType(controlActions.set)]: (state, { payload }) => ({
        ...state,
        ...payload
    }),

    [getType(controlActions.setEditMode)]: (state, { payload }) => ({
        ...state,
        editMode: payload
    }),

    [getType(controlActions.clear)]: () => ({ ...initialState })
})
