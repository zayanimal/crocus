import { of, merge } from 'rxjs';
import {
    filter,
    first,
    map,
    mergeMap,
    switchMap,
    catchError,
} from 'rxjs/operators';
import { Epic } from '@config/interfaces';
import { isActionOf } from 'typesafe-actions';
import { systemActions } from '@system/store/actions';
import { userControlActions } from '@admin/store/actions';
import { userControlSelectors } from '@admin/store/selectors';
import { UserFormEntity, ContactsEntity } from '@admin/entities';

/**
 * Получить данные пользователя для редактирования
 * @param action$
 * @param _
 * @param param юзер сервис
 */
export const getUser: Epic = (action$, _, { users }) => action$.pipe(
    filter(isActionOf(userControlActions.getUser.request)),
    mergeMap(({ payload }) => users.find$(payload)),
    map(({ response }) => userControlActions.getUser.success(response)),
    catchError((err) => of(systemActions.errorNotification(err.response.message))),
);

export const editUser: Epic = (action$, state$, { validation, users }) => action$.pipe(
    filter(isActionOf(userControlActions.editUser.request)),
    mergeMap(({ payload }) => state$.pipe(
        first(),
        map((state) => ({
            ...userControlSelectors.newUser(state),
            contacts: ContactsEntity.of(
                userControlSelectors.newContacts(state)
            )
        })),
        mergeMap((payld) => validation.check$(UserFormEntity.of(payld))),
        mergeMap((user) => users.update$(payload, user)),
    )),
    switchMap(() => merge(
        of(userControlActions.setValidationErrors({})),
        of(systemActions.successNotification('Пользователь изменён'))
    )),
    catchError((err, caught) => merge(
        caught,
        of(userControlActions.setValidationErrors(err)),
    )),
);