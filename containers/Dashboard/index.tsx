import * as React from "react"
import { Dispatch } from "redux"
import { useSelector, useDispatch } from "react-redux"
import { AppState } from "../store"
import { RepositoryData } from "../../interfaces"
import { updateRepositories } from "./action"
import Dashboard from "../../components/Dashboard"

const DashboardContainer: React.FC<{}> = () => {
  const dispatch = useDispatch<Dispatch>()

  const selector = (state: AppState): RepositoryData[] =>
    state.dashboardReposReducer

  const repositories = useSelector<AppState, RepositoryData[]>(selector)

  const storeRepositories = React.useCallback(
    (data: RepositoryData[]) => {
      dispatch(updateRepositories(data))
    },
    [dispatch]
  )

  const props = { repositories, storeRepositories }

  return <Dashboard {...props} />
}

export default DashboardContainer
