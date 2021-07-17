import type { PaginationMeta } from '@interaktiv/ui/TableVirtual'

export interface ICompanyContact {
    email: string
    phone: string
    website: string
}

export interface ICompanyForm {
    name: string
    contact: ICompanyContact
}

export interface ICompanyListItem {
    id: string
    name: string
    time: string
    contact: ICompanyContact
}

export interface ICompaniesInitialState {
    list: ICompanyListItem[]
    meta: PaginationMeta
    companyEditMode: boolean
    companyEditName: string
}
