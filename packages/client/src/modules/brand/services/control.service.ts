import type { RestService } from '@system/services/rest.service'

export class ControlService {
    constructor(private readonly api: RestService) {}

    public addBrand$(dto: object) {
        return this.api.put$('brand/create', dto)
    }
}
