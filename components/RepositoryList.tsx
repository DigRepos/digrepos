import React, { FC } from "react"
import { RepositoryData } from "../interfaces"
import styled from "../interfaces/styled-theme"
import Panel from "./Panel"

type Props = {
  repositoryDatas: RepositoryData[]
}

const PanelWrapper = styled.section`
  margin: 32px 8px;
`

const RepositoryList: FC<Props> = props => {
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
