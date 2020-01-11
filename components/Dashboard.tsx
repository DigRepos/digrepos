import React, { FC, useState, useEffect } from "react"
import { useQuery } from "@apollo/react-hooks"
import { SEARCH_REPOSITORY } from "../shared/gql-query"
import RepositoryList from "./RepositoryList"
import PageNavi from "./PageNavi"
import {
  RepositoryData,
  ModalStyle,
  ModalOverlayStyle,
  PageNaviState
} from "../interfaces"
import styled from "../interfaces/styled-theme"
import { fetchRepositoryList } from "../api"
import Modal from "./Modal"
import SearchFilter from "../containers/SearchFilter"
import TabNavigation from "./TabNavigation"
import SortablePanel from "../containers/Sort"
import { PER_PAGE_NUM } from "../shared/constants"

const DashboardOutline = styled.div`
  width: 90%;
  margin: 8px;
  padding: 8px;
  display: flex;
  font-family: "Roboto", sans-serif;
  font-weight: light;
`
const Left = styled.aside`
  width: 20%;
  padding: 8px;
`

const Center = styled.section`
  width: 65%;
  padding: 8px;
`
const PageNaviWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 12px 8px;
`

const Right = styled.aside`
  width: 15%;
  padding: 8px;
`

const SearchFloatingButton = styled.button`
  position: fixed;
  top: 18%;
  left: 10%;
  width: 88px;
  height: 48px;
  padding: 8px;
  border-radius: 12px;
  border-style: none;
  background-color: #212121;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  outline: none;
  :hover {
    background-color: #616161;
  }
`

const ButtonLabel = styled.p`
  color: #ffffff;
`

type Props = {
  repositories: RepositoryData[]
  storeRepositories: (data: RepositoryData[]) => void
}

const initialModalSetting: {
  isShow: boolean
  modalStyle: ModalStyle
  overlayStyle: ModalOverlayStyle
} = {
  isShow: false,
  modalStyle: {
    height: "100vh",
    width: "240px",
    backgroundColorHex: "474749"
  },
  overlayStyle: {
    colorHex: "EEEEEE"
  }
}

// PageNavi初期値
const initialPageNavi: PageNaviState = {
  currentPageNo: 1,
  allPageNum: 5
}

const Dashboard: FC<Props> = props => {

  const [repos, setRepos] = useState(props.repositories)
  const [pageNavi, setPageNavi] = useState(initialPageNavi)
  const [modalState, setModalState] = useState(initialModalSetting)

  // TODO 初回設定のクエリを取得する。
  const defaultQueryGen = (): string => {
    return "GitHub+Octocat+in:readme+user:defunkt"
  }

  // コンポーネント生成時にクエリ実行する
  const { loading, error, data } = useQuery(SEARCH_REPOSITORY, { 
    variables: { query: defaultQueryGen() }
  })

  if (!loading) {
    console.log("fetch done!", data)
  }
  

  // 全ページ数計算
  function computeAllPageNum(repoLength: number, perPage: number): number {
    console.log("[computeAllPageNum] repoLength", repoLength)
    const split = Math.floor(repoLength / perPage)
    const syou = repoLength % perPage
    if (syou > 0) {
      return split + 1
    }
    return split
  }

  // 指定のページ番号に更新する
  const setNowPage = (now: number): void => {
    setPageNavi(
      Object.assign({}, pageNavi, {
        currentPageNo: now
      })
    )
  }

  const initUpdatePageNavi = (reposLength: number): void => {
    setPageNavi({
      currentPageNo: 1,
      allPageNum: computeAllPageNum(reposLength, PER_PAGE_NUM)
    })
  }

  // 初期表示時に、リポジトリ情報を取得する
  useEffect(() => {
    ;(async () => {
      const repos: RepositoryData[] = await fetchRepositoryList("/list")
      console.log(repos)
      props.storeRepositories(repos)
      setRepos(repos)
      setPageNavi(
        Object.assign({}, pageNavi, {
          currentPageNo: 1,
          allPageNum: computeAllPageNum(repos.length, PER_PAGE_NUM)
        })
      )
    })()
  }, [])

  // 指定のページング範囲のリポジトリ一覧を返す
  const paging = (
    repos: RepositoryData[],
    p: PageNaviState
  ): RepositoryData[] => {
    const startIdx = (p.currentPageNo - 1) * PER_PAGE_NUM
    const endMaxIdx = p.currentPageNo * PER_PAGE_NUM
    return repos.filter(
      (repo: RepositoryData, idx: number) =>
        idx >= startIdx + 1 && idx <= endMaxIdx
    )
  }

  const openModal = () => {
    setModalState(Object.assign({}, modalState, { isShow: true }))
  }

  const closeModal = () => {
    setModalState(Object.assign({}, modalState, { isShow: false }))
  }

  const searchFilterButtonClickedHandler = () => {
    openModal()
  }

  return (
    <DashboardOutline>
      <SearchFloatingButton onClick={e => searchFilterButtonClickedHandler()}>
        <ButtonLabel>Search Filter</ButtonLabel>
      </SearchFloatingButton>
      <Left></Left>
      <Center>
        <RepositoryList repositoryDatas={paging(repos, pageNavi)} />
        <PageNaviWrapper>
          <PageNavi pageNavi={pageNavi} setNowPage={setNowPage} />
        </PageNaviWrapper>
      </Center>
      <Right></Right>
      <Modal {...modalState} onClose={closeModal}>
        <TabNavigation
          elms={[
            {
              key: "filter",
              element: (
                <SearchFilter
                  updateDashboardState={(repos: RepositoryData[]) =>
                    setRepos(repos)
                  }
                  initUpdatePageNavi={initUpdatePageNavi}
                />
              )
            },
            {
              key: "sort",
              element: <SortablePanel />
            }
          ]}
        />
      </Modal>
    </DashboardOutline>
  )
}

export default Dashboard
