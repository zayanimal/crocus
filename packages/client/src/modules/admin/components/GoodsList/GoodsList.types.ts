import type { FC } from 'react'
import type { Good } from '@admin/types'

interface GoodsListProps {
    value: string
    selected: Good[]
    listState: boolean
    setValue: (value: string) => void
    filterModels: (value: string) => void
    onPick: (value: string | null) => void
    onShowList: (value: boolean) => void
}

export type GoodsListType = FC<GoodsListProps>
