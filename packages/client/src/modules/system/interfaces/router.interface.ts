export type LazyComponents = 'Users' | 'Brand' | 'Bid'

export interface RouterItem {
    key: string
    path: string
    name: string
    icon: string
    component: LazyComponents
}
