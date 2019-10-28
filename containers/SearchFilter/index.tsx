import React, { FC, useCallback } from "react"
import { Dispatch } from "redux"
import { useSelector, useDispatch } from "react-redux"
import { AppState } from "../store"
import { SearchFilterModel, RepositoryData } from "../../interfaces"
import { setFilter } from "./action"
import { updateRepositories } from "../Dashboard/action"
import SearchFilter from "../../components/SearchFilter"

type Props = {
  updateDashboardState: (repos: RepositoryData[]) => void
}

const SearchFilterContainer: FC<Props> = props => {
  const selector = (state: AppState): SearchFilterModel =>
    state.setFilterReducer
  const searchFilter = useSelector<AppState, SearchFilterModel>(selector)

  const dispatch = useDispatch<Dispatch>()
  const storeSearchFilter = React.useCallback(
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
      updateSearchFilter={storeSearchFilter}
      updateRepositoryDatas={storeRepositoryDatas}
      updateDashboardState={props.updateDashboardState}
    />
  )
}

export default SearchFilterContainer
