import { combineEpics, Epic } from 'redux-observable'
import { getList } from './list.epics'
import { addBrand } from './control.epics'

export const brandEpic: Epic = combineEpics(getList, addBrand)
