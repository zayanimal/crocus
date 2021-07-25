import { merge, of } from 'rxjs'
import { catchError, filter, first, map, mergeMap } from 'rxjs/operators'
import { Epic } from '@config/interfaces'
import { isActionOf } from 'typesafe-actions'
import { systemActions } from '@system/store/actions'
import { controlActions } from '@brand/actions'
import { controlSelectors } from '@brand/selectors'

export const addBrand: Epic = (action$, state$, { brandControl }) =>
    action$.pipe(
        filter(isActionOf(controlActions.addBrand.request)),
        mergeMap(() =>
            state$.pipe(
                first(),
                map((state) => controlSelectors.brand(state)),
                mergeMap((dto) =>
                    brandControl.addBrand$({
                        ...dto,
                        shopsInMalls: parseInt(dto.shopsInMalls, 10),
                        shopTotal: parseInt(dto.shopTotal, 10)
                    })
                )
            )
        ),

        map(() => systemActions.successNotification('Брэнд добавлен')),
        catchError((err, caught) =>
            merge(caught, of(systemActions.errorNotification(err.message)))
        )
    )
