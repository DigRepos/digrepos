import * as React from "react"
import RepositoryList from "./RepositoryList"
import PageNavi from "./PageNavi"
import {
  RepositoryData,
  ModalStyle,
  ModalOverlayStyle,
  SearchFilterModel
} from "../interfaces"
import styled from "../interfaces/styled-theme"
import { fetchRepositoryList } from "../api"
import Modal from "./Modal"
import SearchFilter from "./SearchFilter"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons"

const DashboardOutline = styled.div`
  width: 90%;
  margin: 8px;
  padding: 8px;
  display: flex;
  font-family: "Roboto", sans-serif;
  font-weight: light;
`
const Left = styled.div`
  width: 20%;
  padding: 8px;
`

const Center = styled.div`
  width: 65%;
  padding: 8px;
`
const PageNaviWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 12px 8px;
`

const Right = styled.div`
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

type Pagenation = {
  pageNo: number
  perPage: number
}

const initPagenation = {
  pageNo: 1,
  perPage: 10,
  allPageNum: 0
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

const initialSearchFilterModel: SearchFilterModel = {
  keyword: [],
  star: {
    low: "",
    high: ""
  },
  language: "",
  license: ""
}

const Dashboard: React.FC<Props> = props => {
  const initState: RepositoryData[] = []
  const [repos, setRepos] = React.useState(initState)
  const [pagenation, setPagenation] = React.useState(initPagenation)
  const [modalState, setModalState] = React.useState(initialModalSetting)
  const [searchFilterModel, setSearchFilterModel] = React.useState(
    initialSearchFilterModel
  )

  const computeAllPageNum = (repoLength: number, perPage: number): number => {
    const split = repoLength / perPage
    const syou = repoLength % perPage
    if (syou > 0) {
      return split + 1
    }
    return split
  }

  const updateSearchFilter = (current: SearchFilterModel) => {
    setSearchFilterModel(Object.assign({}, current))
  }

  const setNowPage = (now: number): void => {
    setPagenation(
      Object.assign({}, pagenation, {
        pageNo: now
      })
    )
  }

  React.useEffect(() => {
    ;(async () => {
      const repos: RepositoryData[] = await fetchRepositoryList("/list")
      console.log(repos)
      props.storeRepositories(repos)
      setRepos(repos)
      setPagenation(
        Object.assign({}, pagenation, {
          allPageNum: computeAllPageNum(repos.length, pagenation.perPage)
        })
      )
    })()
  }, [])

  const paging = (repos: RepositoryData[], p: Pagenation): RepositoryData[] => {
    const highLimit = (p.pageNo + 1) * p.perPage
    const lowLimit = p.pageNo * p.perPage
    if (repos.length > lowLimit && repos.length < highLimit) {
      // 最後の余り要素のみ表示
      return repos.filter((data: RepositoryData, i: number) => i > lowLimit - 1)
    } else if (repos.length > highLimit) {
      return repos.filter(
        (data: RepositoryData, i: number) =>
          i >= lowLimit - 1 && i <= highLimit - 1
      )
    } else if (repos.length < highLimit) {
      const lastPage = repos.length / p.perPage
      const lastPageFirstIdx = lastPage * p.perPage - 1
      return repos.filter(
        (data: RepositoryData, i: number) => i >= lastPageFirstIdx
      )
    } else {
      // 先頭要素のみ取り出す
      return repos.slice(0, p.perPage - 1)
    }
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
        <RepositoryList repositoryDatas={paging(repos, pagenation)} />
        <PageNaviWrapper>
          <PageNavi
            pageNum={pagenation.allPageNum}
            nowPage={1}
            setNowPage={setNowPage}
          />
        </PageNaviWrapper>
      </Center>
      <Right></Right>
      <Modal {...modalState} onClose={closeModal}>
        <SearchFilter
          model={searchFilterModel}
          updateSearchFilter={updateSearchFilter}
        />
      </Modal>
    </DashboardOutline>
  )
}

export default Dashboard
