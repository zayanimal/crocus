/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import { ROLE, ROUTE } from '@system/constants'

export class RouterService {
    public getRouterItems(role: Role) {
        switch(role) {
            case ROLE.ADMIN: {
                return ROUTE.ADMIN
            }

            case ROLE.USER: {
                return ROUTE.USER
            }

            default: {
                return [];
            }
        }
    }
}
