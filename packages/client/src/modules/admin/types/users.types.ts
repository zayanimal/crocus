import { PaginationMeta } from '@shared/types'
import { UserFormEntity } from '@admin/entities'

export type IUser = Omit<UserFormEntity, 'password'>

export type INewUser = Omit<UserFormEntity, 'time' | 'active'>

export interface IUsersInitialState {
    list: IUser[]
    meta: PaginationMeta
    userEditMode: boolean
    userEditName: string
}
