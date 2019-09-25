import { createStore, combineReducers, applyMiddleware } from "redux"
import { dashboardReposReducer } from "./Dashboard/reducer"
import { setFilterReducer } from "./SearchFilter/reducer"
import { composeWithDevTools } from "redux-devtools-extension"

export const rootReducer = combineReducers({
  dashboardReposReducer,
  setFilterReducer
})

export type AppState = ReturnType<typeof rootReducer>

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware())
)
