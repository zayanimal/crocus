import type { FC } from 'react'

export interface ValidationErrors {
    [k: string]: string
}

export interface Field {
    label: string
    name: string
    type?: string
    class?: string
    labelClass?: string
}

type EntityProp = string | string[] | ValidationErrors

interface FieldsProps {
    fields: Field[]
    entity: { [key: string]: EntityProp }
    handler: (obj: object) => void
}

export type FieldsType = FC<FieldsProps>
