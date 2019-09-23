import { SearchFilterModel } from "../../interfaces"
import { UPDATE_SEARCHFILTER } from "../actionTypes"

const initialFilter: SearchFilterModel = {
  keywords: [],
  star: {
    low: "",
    high: ""
  },
  language: "",
  license: ""
}

export function setFilterReducer(
  state: SearchFilterModel = initialFilter,
  action: { type: string; payload: SearchFilterModel }
) {
  switch (action.type) {
    case UPDATE_SEARCHFILTER:
      return action.payload
    default:
      return state
  }
}
