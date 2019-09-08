import { createStore, combineReducers } from 'redux'
import { dashboardReposReducer } from './Dashboard/reducer'

export const rootReducer = combineReducers({ dashboardReposReducer })

export type AppState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)