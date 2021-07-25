import { createAction, createAsyncAction } from 'typesafe-actions'
import type { Brand } from '@brand/entities'

export const getList = createAsyncAction(
    '[BRAND] GET_LIST_REQUEST',
    '[BRAND] GET_LIST_SUCCESS',
    '[BRAND] GET_LIST_FAILURE'
)<undefined, Brand[], undefined>()

export const setEditMode = createAction('[BRAND] SET_EDIT_MODE')<boolean>()
export const setEditName = createAction('[BRAND] SET_EDIT_NAME')<string>()
