import { Brand } from '@brand/entities'
import type { RestService } from '@system/services/rest.service'

export class ListService {
    constructor(private readonly api: RestService) {}

    public getList$() {
        return this.api.get$('brand')
    }

    public addBrand$(dto: object) {
        return this.api.put$('brand/create', dto)
    }
}
