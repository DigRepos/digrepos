import React, { FC, useCallback } from "react"
import { Dispatch } from "redux"
import { useSelector, useDispatch } from "react-redux"
import { AppState } from "../store"
import { SearchFilterModel, RepositoryData, SortType } from "../../interfaces"
import { setFilter } from "./action"
import { updateRepositories } from "../Dashboard/action"
import SearchFilter from "../../components/SearchFilter"

type Props = {
  updateDashboardState: (repos: RepositoryData[]) => void
  initUpdatePageNavi: (repoLength: number) => void
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
  return (
    <SearchFilter
      model={searchFilter}
      sortOrder={sortOrder}
      updateSearchFilter={storeSearchFilter}
      updateRepositoryDatas={storeRepositoryDatas}
      updateDashboardState={props.updateDashboardState}
      initUpdatePageNavi={props.initUpdatePageNavi}
    />
  )
}

export default SearchFilterContainer
