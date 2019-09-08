import * as React from "react"
import RepositoryList from "./RepositoryList"
import { RepositoryData } from "../interfaces"
import styled from "styled-components"
import { fetchRepositoryList } from "../api"

type State = {
  repositories: RepositoryData[]
}

const DashboardOutline = styled.div`
  width: 90%;
  margin: 8px;
  padding: 8px;
  display: flex;
  font-family: 'Roboto', sans-serif;
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

const Right = styled.div`
  width: 15%;
  padding: 8px;
`

const Dashboard: React.FC<{}> = () => {
  const initState: State = { repositories: [] }
  const [repos, setRepos] = React.useState(initState)

  React.useEffect(() => {
    ;(async () => {
      const repos: RepositoryData[] = await fetchRepositoryList("/list")
      console.log(repos)
      setRepos({ repositories: repos })
    })()
  }, [])
  return (
    <DashboardOutline>
      <Left></Left>
      <Center>
        <RepositoryList repositoryDatas={repos.repositories} />
      </Center>
      <Right></Right>
    </DashboardOutline>
  )
}

export default Dashboard
