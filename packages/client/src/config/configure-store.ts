import { applyMiddleware, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'
import { processType } from '@interaktiv/utils'
import { rootEpic, rootReducer } from '@config/roots'
import { dependencies } from '@config/container'

const epicMiddleware = createEpicMiddleware({ dependencies })

export const configureStore = () => {
    const store = createStore(
        rootReducer,
        processType('development')
            ? composeWithDevTools({})(applyMiddleware(epicMiddleware))
            : applyMiddleware(epicMiddleware)
    )

    epicMiddleware.run(rootEpic)

    return store
}
