import React, { FC, useCallback } from "react"
import { Dispatch } from "redux"
import { useSelector, useDispatch } from "react-redux"
import { AppState } from "../store"
import { RepositoryData } from "../../interfaces"
import { updateRepositories } from "./action"
import Dashboard from "../../components/Dashboard"

const DashboardContainer: FC<{}> = () => {
  const dispatch = useDispatch<Dispatch>()

  const repositorySelector = (state: AppState): RepositoryData[] =>
    state.dashboardReposReducer
  const repositories = useSelector<AppState, RepositoryData[]>(
    repositorySelector
  )

  const storeRepositories = useCallback(
    (data: RepositoryData[]) => {
      dispatch(updateRepositories(data))
    },
    [dispatch]
  )

  const props = { repositories, storeRepositories }

  return <Dashboard {...props} />
}

export default DashboardContainer
