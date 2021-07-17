import type { UserFormEntity } from 'modules/main/entities'
import type { PaginationMeta } from '@interaktiv/ui/TableVirtual'

export type IUser = Omit<UserFormEntity, 'password'>

export type INewUser = Omit<UserFormEntity, 'time' | 'active'>

export interface IUsersInitialState {
    list: IUser[]
    meta: PaginationMeta
    userEditMode: boolean
    userEditName: string
}
