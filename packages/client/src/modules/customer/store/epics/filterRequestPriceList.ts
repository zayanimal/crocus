import { requestActions } from "@customer/store/actions";
import { systemActions } from "@system/store/actions";
import { requestSelectors } from "@customer/store/selectors";
import { Epic } from "redux-observable";
import { of } from "rxjs";
import {
  catchError,
  debounceTime,
  filter,
  first,
  map,
  switchMap,
} from "rxjs/operators";
import { isActionOf } from "typesafe-actions";

export const filterRequestPriceList: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(requestActions.filterModels)),
    debounceTime(250),
    switchMap(({ payload }) =>
      state$.pipe(
        first(),
        map(requestSelectors.modelsData),
        map((models) =>
          models.filter(
            ({ model }) =>
              model.includes(payload.toUpperCase()) && payload !== ""
          )
        ),
        map(requestActions.setSelectedModels)
      )
    ),
    catchError((mes: string) => of(systemActions.errorNotification(mes)))
  );
