import { Observable } from 'rxjs'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { Action } from 'redux'
import { Dependencies } from '@config/container'
import { RootStateTypes } from '@config/roots'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Epic<Input extends Action = any, Output extends Input = Input> {
    (
        action$: ActionsObservable<Input>,
        state$: StateObservable<RootStateTypes>,
        dependencies: Dependencies
    ): Observable<Output>
}
