import { combineEpics, Epic } from 'redux-observable'
import { getList } from './list.epics'

export const bidEpic: Epic = combineEpics(getList)
