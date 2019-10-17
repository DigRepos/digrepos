import * as React from "react"
import styled from "../../interfaces/styled-theme"
import Panel from "./Panel"
import { DndProvider } from "react-dnd-cjs"
import HTML5Backend from "react-dnd-html5-backend-cjs"
import { DraggableItem } from "../../interfaces"

const SortSection = styled.section`
  display: flex;
  justify-content: center;
`

const PanelArea = styled.div`
  margin: 48px 0px;
  width: 80%;
`

const SortablePanel: React.FC<{}> = () => {
  const initSortPanels: DraggableItem[] = [
    { idx: 0, key: "star", expr: "Star" },
    { idx: 1, key: "fork", expr: "Fork" },
    { idx: 2, key: "watch", expr: "Watch" },
    { idx: 3, key: "date", expr: "Date" }
  ]

  const [panels, setPanels] = React.useState(initSortPanels)

  const orderUpdate = React.useCallback(
    (dragIdx: number, hoverIdx: number) => {
      const dragPanel = panels[dragIdx]
      let tmp = panels.splice(dragIdx, 1)
      console.log('hogehoge!', tmp.splice(hoverIdx, 0, dragPanel))
      setPanels(tmp.splice(hoverIdx, 0, dragPanel))
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

export default SortablePanel
