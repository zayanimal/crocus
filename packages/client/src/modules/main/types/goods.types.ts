export interface Good {
    id: number
    good: string
    price: number
}

export interface GoodInOrder extends Good {
    qty: number
}
