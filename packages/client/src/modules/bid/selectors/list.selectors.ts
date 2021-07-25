import { RootStateTypes } from '@config/roots'

const bidState = (state: RootStateTypes) => state.bid.list

export const list = (state: RootStateTypes) => bidState(state).list

export const editMode = (state: RootStateTypes) => bidState(state).editMode

export const editName = (state: RootStateTypes) => bidState(state).editName
