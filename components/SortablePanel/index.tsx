import React, { FC, useState, useCallback } from "react"
import styled from "../../interfaces/styled-theme"
import Panel from "./Panel"
import { DndProvider } from "react-dnd-cjs"
import HTML5Backend from "react-dnd-html5-backend-cjs"
import { DraggableItem, SortType } from "../../interfaces"

const SortSection = styled.section`
  display: flex;
  justify-content: center;
`

const PanelArea = styled.div`
  margin: 48px 0px;
  width: 80%;
`

type Props = {
  sortOrder: SortType[]
  storeSortOrder: (data: SortType[]) => void
}

const SortablePanel: FC<Props> = props => {
  const initSortPanels: DraggableItem[] = props.sortOrder.map((v, i) => ({
    idx: i + 1,
    key: v.toLowerCase(),
    expr: v
  }))
  const [panels, setPanels] = useState(initSortPanels)

  const correspondingArrayIndex = (
    panels: DraggableItem[],
    idx: number
  ): number => {
    for (let i = 0, len = panels.length; i < len; i++) {
      if (panels[i].idx === idx) {
        return i
      }
    }
    return 0
  }

  const orderUpdate = useCallback(
    (dragIdx: number, hoverIdx: number) => {
      const fromIdx = correspondingArrayIndex(panels, dragIdx)
      const toIdx = correspondingArrayIndex(panels, hoverIdx)
      const dragPanel: DraggableItem = panels[fromIdx]
      let tmpPanels: DraggableItem[] = panels
      tmpPanels.splice(fromIdx, 1)
      tmpPanels.splice(toIdx, 0, dragPanel)
      const newPanels = ([] as DraggableItem[]).concat(tmpPanels)
      setPanels(newPanels)
      props.storeSortOrder(newPanels.map(v => v.expr))
    },
    [panels]
  )

  return (
    <DndProvider backend={HTML5Backend}>
      <SortSection>
        <PanelArea>
          {panels.map(v => (
            <Panel key={v.key} item={v} update={orderUpdate} />
          ))}
        </PanelArea>
      </SortSection>
    </DndProvider>
  )
}

export default React.memo(SortablePanel)
