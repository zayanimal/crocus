import { combineEpics, Epic } from 'redux-observable'
import { getUsersList, removeUser, sendNewUser } from '@admin/effects/users.epic'
import { editUser, getUser } from '@admin/effects/user-form.epic'
import { searchUser } from '@admin/effects/search-user.epic'

export const adminEpic: Epic = combineEpics(
    getUsersList,
    sendNewUser,
    removeUser,
    getUser,
    editUser,
    searchUser
)
