export interface Good {
    id: number
    model: string
    price: number
}

export interface GoodInOrder extends Good {
    count: number
}
