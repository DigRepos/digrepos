import React, { FC, useCallback } from "react"
import { Dispatch } from "redux"
import { useSelector, useDispatch } from "react-redux"
import { AppState } from "../store"
import {
  SearchFilterModel,
  RepositoryData,
  SortType,
  PageNaviState
} from "../../interfaces"
import { setFilter } from "./action"
import { updateRepositories } from "../Dashboard/action"
import SearchFilter from "../../components/SearchFilter"
import { updatePagenavi } from "../PageNavi/action"

type Props = {
  updateDashboardState: (repos: RepositoryData[]) => void
}

const SearchFilterContainer: FC<Props> = props => {
  const searchFilterSelector = (state: AppState): SearchFilterModel =>
    state.setFilterReducer
  const searchFilter = useSelector<AppState, SearchFilterModel>(
    searchFilterSelector
  )

  const sortOrderSelector = (state: AppState): SortType[] => state.sortReducer
  const sortOrder = useSelector<AppState, SortType[]>(sortOrderSelector)

  const dispatch = useDispatch<Dispatch>()
  const storeSearchFilter = useCallback(
    (data: SearchFilterModel) => {
      dispatch(setFilter(data))
    },
    [dispatch]
  )
  const storeRepositoryDatas = useCallback(
    (repos: RepositoryData[]) => {
      dispatch(updateRepositories(repos))
    },
    [dispatch]
  )
  const storePageNavi = useCallback(
    (pageNavi: PageNaviState) => {
      dispatch(updatePagenavi(pageNavi))
    },
    [dispatch]
  )
  return (
    <SearchFilter
      model={searchFilter}
      sortOrder={sortOrder}
      updateSearchFilter={storeSearchFilter}
      updateRepositoryDatas={storeRepositoryDatas}
      updateDashboardState={props.updateDashboardState}
      storePageNavi={storePageNavi}
    />
  )
}

export default SearchFilterContainer
