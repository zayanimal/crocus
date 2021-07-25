import type { RouterItem } from '@system/interfaces'

type Route = {
    [key: string]: RouterItem[]
}

export const ROUTE: Route = {
    USER: [
        {
            key: 'BRAND',
            path: '/brand',
            name: 'Брэнды',
            icon: 'Business',
            component: 'Brand'
        }
    ],
    ADMIN: [
        {
            key: 'BRAND',
            path: '/brand',
            name: 'Брэнды',
            icon: 'Business',
            component: 'Brand'
        },
        {
            key: 'BID',
            path: '/bid',
            name: 'Заявки',
            icon: 'AllInbox',
            component: 'Bid'
        }
    ]
}
