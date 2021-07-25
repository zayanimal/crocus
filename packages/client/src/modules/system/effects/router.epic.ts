import { merge, of } from 'rxjs'
import { catchError, filter, first, map, switchMap } from 'rxjs/operators'
import { Epic } from '@config/interfaces'
import { isActionOf } from 'typesafe-actions'
import { systemActions } from '@system/store/actions'
import { systemSelectors } from '@system/store/selectors'

export const getRouterItems: Epic = (action$, state$, { router }) =>
    action$.pipe(
        filter(isActionOf(systemActions.getRouterItems)),
        switchMap(() =>
            state$.pipe(
                first(),
                map(systemSelectors.role),
                map((role) => router.getRouterItems(role)),
                map(systemActions.setRouterItems),
                catchError((err, caught) =>
                    merge(caught, of(systemActions.errorNotification(err.message)))
                )
            )
        )
    )
