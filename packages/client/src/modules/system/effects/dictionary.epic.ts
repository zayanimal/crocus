import { merge, of } from 'rxjs'
import { catchError, filter, first, map, mergeMap } from 'rxjs/operators'
import { Epic } from '@config/interfaces'
import { isActionOf } from 'typesafe-actions'
import { dictionaryActions, systemActions } from '@system/store/actions'
import { systemSelectors } from '@system/store/selectors'

/**
 * Получить необходимый словарь
 * @param action$
 * @param state$
 */
export const getDictionary: Epic = (action$, state$, { dictionary }) =>
    action$.pipe(
        filter(isActionOf(dictionaryActions.getDictionary)),
        mergeMap(({ payload }) =>
            state$.pipe(
                first(),
                map((state) => ({
                    type: systemSelectors.role(state),
                    names: payload
                }))
            )
        ),
        mergeMap((req) => dictionary.get$(req)),
        map(({ response }) => response),
        map(dictionaryActions.setDictionary),
        catchError((err, caught) =>
            merge(caught, of(systemActions.errorNotification(err.response.message)))
        )
    )
