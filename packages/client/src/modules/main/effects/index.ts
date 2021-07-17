import { combineEpics, Epic } from 'redux-observable'
import { getUsersList, removeUser, sendNewUser } from '@main/effects/users.epic'
import { editUser, getUser } from '@main/effects/user-form.epic'
import { searchUser } from '@main/effects/search-user.epic'

export const adminEpic: Epic = combineEpics(
    getUsersList,
    sendNewUser,
    removeUser,
    getUser,
    editUser,
    searchUser
)
