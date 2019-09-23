import { createStore, combineReducers } from 'redux'
import { dashboardReposReducer } from './Dashboard/reducer'
import { setFilterReducer } from './SearchFilter/reducer'

export const rootReducer = combineReducers({ dashboardReposReducer, setFilterReducer })

export type AppState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)