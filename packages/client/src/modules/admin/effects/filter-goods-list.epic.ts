import { orderControlActions } from '@admin/store/actions'
import { systemActions } from '@system/store/actions'
import { orderControlSelectors } from '@admin/store/selectors'
import { Epic } from 'redux-observable'
import { of } from 'rxjs'
import {
    catchError,
    debounceTime,
    filter,
    first,
    map,
    switchMap
} from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'

const DEBOUNCE_TIME = 250

export const filterGoodsList: Epic = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(orderControlActions.filterModels)),
        debounceTime(DEBOUNCE_TIME),
        switchMap(({ payload }) =>
            state$.pipe(
                first(),
                map(orderControlSelectors.goods),
                map((goods) =>
                    goods.filter(
                        ({ good }) =>
                            good.includes(payload.toUpperCase()) && payload !== ''
                    )
                ),
                map(orderControlActions.setSelectedGoods)
            )
        ),
        catchError((mes: string) => of(systemActions.errorNotification(mes)))
    )
