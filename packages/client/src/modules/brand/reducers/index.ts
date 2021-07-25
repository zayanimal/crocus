import { combineReducers } from 'redux'
import { list } from './list.reducer'
import { control } from './control.reducer'

export const brandReducer = combineReducers({
    list,
    control
})
