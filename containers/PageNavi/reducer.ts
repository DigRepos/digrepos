import { PageNaviState } from "../../interfaces"
import { UPDATE_PAGENAVI } from "../actionTypes"

const initialPageNavi: PageNaviState = {
  currentPageNo: 1,
  allPageNum: 10
}

export function pageNaviReducer(
  state: PageNaviState = initialPageNavi,
  action: { type: string; payload: PageNaviState }
) {
  switch (action.type) {
    case UPDATE_PAGENAVI:
      return action.payload
    default:
      return state
  }
}
