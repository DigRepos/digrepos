import { UPDATE_PAGENAVI } from "../actionTypes"
import { Action } from "../types"
import { PageNaviState } from "../../interfaces"

export function updatePagenavi(data: PageNaviState): Action {
  return {
    type: UPDATE_PAGENAVI,
    payload: data
  }
}
