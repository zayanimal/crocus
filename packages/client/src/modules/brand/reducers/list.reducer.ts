import { createReducer, getType } from 'typesafe-actions'
import { listActions } from '@brand/actions'
import type { Brand } from '@brand/entities'

type State = {
    list: Brand[]
    editMode: boolean
    editName: string
}

const initialState = {
    list: [],
    editMode: false,
    editName: ''
}

export const list = createReducer<State>(initialState, {
    [getType(listActions.getList.success)]: (state, { payload }) => ({
        ...state,
        list: payload
    }),

    [getType(listActions.setEditMode)]: (state, { payload }) => ({
        ...state,
        editMode: payload
    }),

    [getType(listActions.setEditName)]: (state, { payload }) => ({
        ...state,
        editName: payload
    })
})
