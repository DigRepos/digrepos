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
  const exprArray: DraggableItem[] = [
    { idx: "star", expr: "Star" },
    { idx: "fork", expr: "Fork" },
    { idx: "watch", expr: "Watch" },
    { idx: "date", expr: "Date" }
  ]

  return (
    <DndProvider backend={HTML5Backend}>
      <SortSection>
        <PanelArea>
          {exprArray.map(v => (
            <Panel key={v.idx} item={v} />
          ))}
        </PanelArea>
      </SortSection>
    </DndProvider>
  )
}

export default SortablePanel
