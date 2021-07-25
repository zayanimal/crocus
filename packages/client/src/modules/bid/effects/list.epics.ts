import { merge, of } from 'rxjs'
import { catchError, filter, map, mergeMap } from 'rxjs/operators'
import { Epic } from '@config/interfaces'
import { isActionOf } from 'typesafe-actions'
import { systemActions } from '@system/store/actions'
import { listActions } from '@bid/actions'

export const getList: Epic = (action$, _, { bidList }) =>
    action$.pipe(
        filter(isActionOf(listActions.getList.request)),
        mergeMap(() => bidList.getList$()),
        map(({ response }) => listActions.getList.success(response)),
        catchError((err, caught) =>
            merge(caught, of(systemActions.errorNotification(err.message)))
        )
    )
