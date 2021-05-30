import { merge, of } from 'rxjs'
import {
    catchError,
    debounceTime,
    filter,
    map,
    mergeMap,
    pluck
} from 'rxjs/operators'
import { Epic } from '@config/interfaces'
import { isActionOf } from 'typesafe-actions'
import { systemActions } from '@system/store/actions'
import { searchUserActions } from '@admin/store/actions'

/**
 * Найти пользователя
 * @param action$
 * @param state$
 * @param services
 */
const TIME_OUT = 500

export const searchUser: Epic = (action$, _, { users }) =>
    action$.pipe(
        filter(isActionOf(searchUserActions.searchUser)),
        debounceTime(TIME_OUT),
        pluck('payload'),
        mergeMap((username) => {
            if (!username) {
                return of(searchUserActions.setFound([]))
            }

            return users.search$(username).pipe(
                pluck('response'),
                map((user) =>
                    user.length
                        ? searchUserActions.setFound(user)
                        : searchUserActions.setFound([])
                )
            )
        }),
        catchError((err, caught) =>
            merge(
                caught,
                of(searchUserActions.setFound([])),
                of(systemActions.errorNotification(err.message))
            )
        )
    )
