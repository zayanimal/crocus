import { combineReducers } from 'redux'
import { combineEpics, Epic } from 'redux-observable'
import { mainReducer } from '@system/store/reducers'
import { adminReducer } from '@admin/store/reducers'
import { systemEpic } from '@system/effects'
import { adminEpic } from '@admin/effects'

export const rootReducer = combineReducers({
    system: mainReducer,
    admin: adminReducer
})

export const rootEpic: Epic = combineEpics(systemEpic, adminEpic)

export type RootStateTypes = ReturnType<typeof rootReducer>
