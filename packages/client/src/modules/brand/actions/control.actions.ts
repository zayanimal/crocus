import { createAction, createAsyncAction } from 'typesafe-actions'
import type { Brand } from '@brand/entities'

export const getBrand = createAsyncAction(
    '[BRAND] GET_BRAND_REQUEST',
    '[BRAND] GET_BRAND_SUCCESS',
    '[BRAND] GET_BRAND_FAILURE'
)<string, Brand, unknown>()

export const addBrand = createAsyncAction(
    '[BRAND] ADD_BRAND_REQUEST',
    '[BRAND] ADD_BRAND_SUCCESS',
    '[BRAND] ADD_BRAND_FAILURE'
)<undefined, string, unknown>()

export const editBrand = createAsyncAction(
    '[BRAND] EDIT_BRAND_REQUEST',
    '[BRAND] EDIT_BRAND_SUCCESS',
    '[BRAND] EDIT_BRAND_FAILURE'
)<string, string, unknown>()

export const set = createAction('[BRAND] SET')<object>()

export const setEditMode = createAction('[BRAND] SET_EDIT_MODE')<boolean>()

export const clear = createAction('[BRAND] CLEAR')<undefined>()
