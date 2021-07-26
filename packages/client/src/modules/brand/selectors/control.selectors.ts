import omit from 'lodash/omit'
import { RootStateTypes } from '@config/roots'

const controlState = (state: RootStateTypes) => state.brand.control

export const brand = (state: RootStateTypes) =>
    omit(controlState(state), ['id', 'editMode'])

export const type = (state: RootStateTypes) => controlState(state).type

export const malls = (state: RootStateTypes) => controlState(state).malls

export const editMode = (state: RootStateTypes) => controlState(state).editMode
