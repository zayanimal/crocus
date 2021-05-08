import { PaginationMeta } from '@shared/types'

export interface OrdersState {
    list: Record<string, unknown>[]
    meta: PaginationMeta
    orderEditMode: boolean
    orderEditName: string
}
