import * as React from "react"
import RepositoryList from "./RepositoryList"
import PageNavi from "./PageNavi"
import { RepositoryData } from "../interfaces"
import styled from "styled-components"
import { fetchRepositoryList } from "../api"

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

const Dashboard: React.FC<Props> = props => {
  const initState: RepositoryData[] = []
  const [repos, setRepos] = React.useState(initState)
  const [pagenation, setPagenation] = React.useState(initPagenation)

  const computeAllPageNum = (repoLength: number, perPage: number): number => {
    const split = repoLength / perPage
    const syou = repoLength % perPage
    if (syou > 0) {
      return split + 1
    }
    return split
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
  return (
    <DashboardOutline>
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
    </DashboardOutline>
  )
}

export default Dashboard
