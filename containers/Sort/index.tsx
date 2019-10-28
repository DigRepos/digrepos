import React, { FC, useCallback } from "react"
import { Dispatch } from "redux"
import { useSelector, useDispatch } from "react-redux"
import { AppState } from "../store"
import { updateSortOrder } from "./action"
import { SortType } from "../../interfaces"
import SortPanel from "../../components/SortablePanel"

const SortablePanel: FC<{}> = () => {
  const selector = (state: AppState): SortType[] => state.sortReducer
  const sortOrder = useSelector<AppState, SortType[]>(selector)

  const dispatch = useDispatch<Dispatch>()
  const storeSortOrder = useCallback(
    (data: SortType[]) => {
      dispatch(updateSortOrder(data))
    },
    [dispatch]
  )

  return <SortPanel sortOrder={sortOrder} storeSortOrder={storeSortOrder} />
}

export default SortablePanel
