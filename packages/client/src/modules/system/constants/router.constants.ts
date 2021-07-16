import { IRouterItem } from '@system/interfaces/router.interface'

export const ROUTE_ITEMS: IRouterItem[] = [
    {
        key: 'USERS',
        path: '/users',
        name: 'Пользователи',
        icon: 'People',
        component: 'Users'
    }
]
