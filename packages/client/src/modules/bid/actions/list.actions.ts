import { createAction, createAsyncAction } from 'typesafe-actions'
import type { Bid } from '@bid/entities'

export const getList = createAsyncAction(
    '[BID] GET_LIST_REQUEST',
    '[BID] GET_LIST_SUCCESS',
    '[BID] GET_LIST_FAILURE'
)<undefined, Bid[], undefined>()

export const setEditMode = createAction('[BID] SET_EDIT_MODE')<boolean>()
export const setEditName = createAction('[BID] SET_EDIT_NAME')<string>()
