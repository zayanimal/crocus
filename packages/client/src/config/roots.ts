import { combineReducers } from 'redux'
import { combineEpics, Epic } from 'redux-observable'
import { mainReducer } from '@system/store/reducers'
import { adminReducer } from '@main/store/reducers'
import { brandReducer } from '@brand/reducers'
import { bidReducer } from '@bid/reducers'
import { systemEpic } from '@system/effects'
import { adminEpic } from '@main/effects'
import { brandEpic } from '@brand/effects'
import { bidEpic } from '@bid/effects'

export const rootReducer = combineReducers({
    system: mainReducer,
    admin: adminReducer,
    brand: brandReducer,
    bid: bidReducer
})

export const rootEpic: Epic = combineEpics(systemEpic, adminEpic, brandEpic, bidEpic)

export type RootStateTypes = ReturnType<typeof rootReducer>
