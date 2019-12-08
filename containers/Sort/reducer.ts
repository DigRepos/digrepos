import { UPDATE_SORT_ORDER } from "../actionTypes"
import { SortType } from "../../interfaces"

const initialState: SortType[] = ["Star", "Fork", "Watch", "Date"]

export function sortReducer(
  state: SortType[] = initialState,
  action: { type: string; payload: SortType[] }
): SortType[] {
  switch (action.type) {
    case UPDATE_SORT_ORDER:
      return action.payload
    default:
      return state
  }
}
