import { RootStateTypes } from '@config/roots'

const brandState = (state: RootStateTypes) => state.brand.list

export const list = (state: RootStateTypes) => brandState(state).list

export const editMode = (state: RootStateTypes) => brandState(state).editMode

export const editName = (state: RootStateTypes) => brandState(state).editName
