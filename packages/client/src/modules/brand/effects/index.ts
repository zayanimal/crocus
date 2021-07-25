import { combineEpics, Epic } from 'redux-observable'
import { getList } from './list.epics'

export const brandEpic: Epic = combineEpics(getList)
