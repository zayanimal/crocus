import { combineReducers } from 'redux'
import { list } from './list.reducer'

export const bidReducer = combineReducers({
    list
})
