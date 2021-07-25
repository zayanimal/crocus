import omit from 'lodash/omit'
import { RootStateTypes } from '@config/roots'

const controlState = (state: RootStateTypes) => state.brand.control

export const brand = (state: RootStateTypes) =>
    omit(controlState(state), ['id', 'editMode'])

export const editMode = (state: RootStateTypes) => controlState(state).editMode
