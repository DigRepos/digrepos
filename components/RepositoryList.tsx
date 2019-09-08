import * as React from "react"
import { RepositoryData } from "../interfaces"
import styled from "styled-components"
import Panel from "./Panel/Panel"

type Props = {
  repositoryDatas: RepositoryData[]
}

const PanelWrapper = styled.div`
  margin: 32px 8px;
`

const RepositoryList: React.FC<Props> = props => {
  return (
    <>
      {props.repositoryDatas.length > 0 ? (
        props.repositoryDatas.map((repo: RepositoryData, i: number) => {
          return (
            <PanelWrapper key={repo.id}>
              <Panel key={repo.id} {...repo} />
            </PanelWrapper>
          )
        })
      ) : (
        <>No Data</>
      )}
    </>
  )
}

export default RepositoryList
