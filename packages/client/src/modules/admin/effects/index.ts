import { combineEpics, Epic } from 'redux-observable'
import { getUsersList, removeUser, sendNewUser } from '@admin/effects/users.epic'
import { editUser, getUser } from '@admin/effects/user-form.epic'
import { getCompaniesList } from '@admin/effects/companies.epic'
import {
    createBankRequisites,
    createCompany,
    createRequisites,
    deleteCompany,
    getCompany,
    updateCompany
} from '@admin/effects/company-form.epic'
import { searchUser } from '@admin/effects/search-user.epic'
import { getOrdersList } from '@admin/effects/orders.epic'
import { getGoodsList } from '@admin/effects/get-goods-list.epic'
import { filterGoodsList } from '@admin/effects/filter-goods-list.epic'

export const adminEpic: Epic = combineEpics(
    getUsersList,
    sendNewUser,
    removeUser,
    getUser,
    editUser,
    getCompaniesList,
    getCompany,
    updateCompany,
    createCompany,
    deleteCompany,
    createRequisites,
    createBankRequisites,
    searchUser,
    getOrdersList,
    getGoodsList,
    filterGoodsList
)
