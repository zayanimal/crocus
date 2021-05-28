import { of } from 'rxjs'
import { delay } from 'rxjs/operators'
import orders from '@admin/services/__mock__/orders.json'
import order from '@admin/services/__mock__/order.json'

export class OrderService {
    timeout: number

    constructor() {
        this.timeout = 500
    }

    public getList$() {
        return of({ response: orders }).pipe(delay(this.timeout))
    }

    public find$() {
        return of({ response: order }).pipe(delay(this.timeout))
    }
}
