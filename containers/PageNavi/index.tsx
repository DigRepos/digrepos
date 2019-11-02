import React, { FC, useCallback } from "react"
import { Dispatch } from "redux"
import { useSelector, useDispatch } from "react-redux"
import { AppState } from "../store"
import { PageNaviState } from "../../interfaces"
import { updatePagenavi } from "./action"
import PageNavi from "../../components/PageNavi"

type Props = {
  repositoryNum: number
}

const DashboardContainer: FC<Props> = props => {
  const dispatch = useDispatch<Dispatch>()

  const selector = (state: AppState): PageNaviState => state.pageNaviReducer

  const pageNaviState = useSelector<AppState, PageNaviState>(selector)

  const storePageNaviState = useCallback(
    (data: PageNaviState) => {
      dispatch(updatePagenavi(data))
    },
    [dispatch]
  )

  const pageNaviProps = {
    pageNaviState: pageNaviState,
    storePageNavi: storePageNaviState,
    repositoryNum: props.repositoryNum
  }

  return <PageNavi {...pageNaviProps} />
}

export default DashboardContainer
