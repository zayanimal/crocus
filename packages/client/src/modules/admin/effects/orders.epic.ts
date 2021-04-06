import { merge, of } from 'rxjs';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';
import { Epic } from '@config/interfaces';
import { isActionOf } from 'typesafe-actions';
import { systemActions } from '@system/store/actions';
import { ordersActions } from '@admin/store/actions';

export const getOrdersList: Epic = (action$, _, { order }) =>
    action$.pipe(
        filter(isActionOf(ordersActions.getOrdersList.request)),
        mergeMap(() => order.getList$()),
        map(({ response }) => ordersActions.getOrdersList.success(response)),
        catchError((err, caught) =>
            merge(caught, of(systemActions.errorNotification(err.message)))
        )
    );
