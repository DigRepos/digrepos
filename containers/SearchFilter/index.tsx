import * as React from "react"
import { Dispatch } from "redux"
import { useSelector, useDispatch } from "react-redux"
import { AppState } from "../store"
import { SearchFilterModel, RepositoryData } from "../../interfaces"
import { setFilter } from "./action"
import { updateRepositories } from '../Dashboard/action'
import SearchFilter from "../../components/SearchFilter"

const SearchFilterContainer: React.FC<{}> = () => {
    
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
  const storeRepositoryDatas = React.useCallback((repos: RepositoryData[]) => {
    dispatch(updateRepositories(repos))
  }, [dispatch])
  return (
    <SearchFilter model={searchFilter} updateSearchFilter={storeSearchFilter} updateRepositoryDatas={storeRepositoryDatas} />
  )
}

export default SearchFilterContainer
