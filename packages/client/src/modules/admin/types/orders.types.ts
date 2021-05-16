import type { PaginationMeta } from '@interaktiv/ui/TableVirtual'

export interface OrdersState {
    list: Record<string, unknown>[]
    meta: PaginationMeta
    orderEditMode: boolean
    orderEditName: string
}
