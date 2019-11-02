import React, { FC, useCallback } from "react"
import { Dispatch } from "redux"
import { useSelector, useDispatch } from "react-redux"
import { AppState } from "../store"
import { RepositoryData, PageNaviState } from "../../interfaces"
import { updateRepositories } from "./action"
import { updatePagenavi } from "../PageNavi/action"
import Dashboard from "../../components/Dashboard"

const DashboardContainer: FC<{}> = () => {
  const dispatch = useDispatch<Dispatch>()

  const repositorySelector = (state: AppState): RepositoryData[] =>
    state.dashboardReposReducer
  const repositories = useSelector<AppState, RepositoryData[]>(
    repositorySelector
  )

  const pageNaviSelector = (state: AppState): PageNaviState =>
    state.pageNaviReducer
  const pageNavi = useSelector<AppState, PageNaviState>(pageNaviSelector)
  const storeRepositories = useCallback(
    (data: RepositoryData[]) => {
      dispatch(updateRepositories(data))
    },
    [dispatch]
  )
  const storePageNavi = useCallback(
    (pageNavi: PageNaviState) => {
      dispatch(updatePagenavi(pageNavi))
    },
    [dispatch]
  )

  const props = { repositories, storeRepositories, pageNavi, storePageNavi }

  return <Dashboard {...props} />
}

export default DashboardContainer
