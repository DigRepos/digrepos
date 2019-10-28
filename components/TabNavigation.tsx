import React, { FC, useState } from "react"
import { TabKey } from "../interfaces"
import styled from "../interfaces/styled-theme"

type ElmMap = { key: string; element: JSX.Element }
type Props = {
  elms: ElmMap[]
}

type State = {
  selectedTabKey: TabKey
  elms: ElmMap[]
}

const Ul = styled.ul`
  list-style: none;
  margin: 0px;
  padding: 0px;
  display: flex;
  justify-content: center;
`
const Li = styled.li`
  padding: 16px 28px;
  margin: 0px 0px;
  width: 100%;
  font-size: 1.3em;
  font-weight: bold;
  color: #9e9e9e;
  cursor: pointer;
  text-align: center;
  background-color: #757575;
`

const SelectedLi = styled(Li)`
  background-color: #474749;
`

const Contents = styled.div``

const TabNavigation: FC<Props> = props => {
  const initialSelectedKey: State = {
    selectedTabKey: "filter",
    elms: props.elms
  }
  const [state, setState] = useState(initialSelectedKey)
  const switchContents = () => {
    const c: ElmMap = state.elms.filter(v => v.key === state.selectedTabKey)[0]
    return c.element
  }
  const tabClickedHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    const key: State = Object.assign({}, state, {
      selectedTabKey: e.currentTarget.getAttribute("data-tabkey") as TabKey
    })
    setState(key)
  }
  const makeTab = () => {
    const tabs = [
      { key: "filter", expr: "Filter" },
      { key: "sort", expr: "Sort" }
    ]
    return tabs.map(v => {
      if (state.selectedTabKey === v.key) {
        return (
          <SelectedLi
            key={v.key}
            data-tabkey={v.key}
            onClick={tabClickedHandler}
          >
            {v.expr}
          </SelectedLi>
        )
      } else {
        return (
          <Li key={v.key} data-tabkey={v.key} onClick={tabClickedHandler}>
            {v.expr}
          </Li>
        )
      }
    })
  }
  return (
    <>
      <Ul>{makeTab()}</Ul>
      <Contents>{switchContents()}</Contents>
    </>
  )
}

export default TabNavigation
