import { SortType } from "../../interfaces"
import { UPDATE_SORT_ORDER } from "../actionTypes"
import { Action } from "../types"

export function updateSortOrder(data: SortType[]): Action {
  return {
    type: UPDATE_SORT_ORDER,
    payload: data
  }
}
