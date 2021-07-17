import { FC, lazy } from 'react'
import { LazyComponents } from '@system/interfaces/router.interface'

class RouteComponent {
    constructor(private Users: FC) {}

    create(name: LazyComponents) {
        return this[name]
    }
}

export const routeComponent = new RouteComponent(
    lazy(() => import('@main/containers/Users'))
)
