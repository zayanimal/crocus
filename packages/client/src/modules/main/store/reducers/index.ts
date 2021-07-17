import { combineReducers } from 'redux'
import { users } from '@main/store/reducers/users.reducer'
import { userControl } from '@main/store/reducers/user-control.reducer'

export const adminReducer = combineReducers({
    users,
    userControl
})
