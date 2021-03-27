import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import orders from '@admin/services/__mock__/orders.json';
import order from '@admin/services/__mock__/order.json';

export class OrderService {
    public getList$() {
        return of({ response: orders }).pipe(delay(500));
    }

    public find$() {
        return of({ response: order }).pipe(delay(500));
    }
}
