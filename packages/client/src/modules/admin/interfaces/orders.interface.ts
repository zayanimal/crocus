import { IPaginationMeta } from '@shared/interfaces'

export interface OrdersInitialState {
    list: Record<string, unknown>[]
    meta: IPaginationMeta
    orderEditMode: boolean
    orderEditName: string
}
