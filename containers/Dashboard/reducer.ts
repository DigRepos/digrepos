import { UPDATE_REPOSITORIES } from "./actionType"
import { RepositoryData } from "../../interfaces"

const initialState: RepositoryData[] = []

export function dashboardReposReducer(
  state: RepositoryData[] = initialState,
  action: { type: string; payload: RepositoryData[] }
) {
  switch (action.type) {
    case UPDATE_REPOSITORIES:
      return action.payload
    default:
      return state
  }
}
