import { createReducer, getType } from 'typesafe-actions'
import * as systemActions from '@system/store/actions/system.actions'
import { RouterItem } from '@system/interfaces/router.interface'

export interface SystemStateTypes {
    authFetched: boolean
    isLoggedIn: boolean
    username: string
    password: string
    role: Role
    drawer: boolean
    routerItems: RouterItem[]
    headerTitle: string
    openNotification: boolean
    typeNotification: 'success' | 'error' | 'info' | 'warning'
    messageNotification: string
}

const initialState: SystemStateTypes = {
    authFetched: false,
    isLoggedIn: false,
    username: '',
    password: '',
    role: 'user',

    drawer: false,
    routerItems: [],
    headerTitle: '',

    openNotification: false,
    typeNotification: 'success',
    messageNotification: ''
}

const systemReducer = createReducer<SystemStateTypes>(initialState, {
    [getType(systemActions.setLogin)]: (state, { payload }) => ({
        ...state,
        username: payload
    }),

    [getType(systemActions.setPassword)]: (state, { payload }) => ({
        ...state,
        password: payload
    }),

    [getType(systemActions.setAuth)]: (state, { payload }) => ({
        ...state,
        authFetched: true,
        isLoggedIn: true,
        username: payload?.username,
        role: payload?.role
    }),

    [getType(systemActions.clearUser)]: (state) => ({
        ...state,
        authFetched: true,
        isLoggedIn: false,
        username: '',
        password: '',
        routerItems: [],
        role: 'user'
    }),

    [getType(systemActions.setDrawerState)]: (state, { payload }) => ({
        ...state,
        drawer: payload
    }),

    [getType(systemActions.setRouterItems)]: (state, { payload }) => ({
        ...state,
        routerItems: payload
    }),

    [getType(systemActions.setHeaderTitle)]: (state, { payload }) => ({
        ...state,
        headerTitle: payload
    }),

    [getType(systemActions.closeNotification)]: (state) => ({
        ...state,
        openNotification: false
    }),

    [getType(systemActions.successNotification)]: (state, { payload }) => ({
        ...state,
        typeNotification: 'success',
        messageNotification: payload,
        openNotification: true
    }),

    [getType(systemActions.errorNotification)]: (state, { payload }) => ({
        ...state,
        typeNotification: 'error',
        messageNotification: payload,
        openNotification: true
    }),

    [getType(systemActions.infoNotification)]: (state, { payload }) => ({
        ...state,
        typeNotification: 'info',
        messageNotification: payload,
        openNotification: true
    }),

    [getType(systemActions.warningNotification)]: (state, { payload }) => ({
        ...state,
        typeNotification: 'warning',
        messageNotification: payload,
        openNotification: true
    })
})

export { systemReducer }
