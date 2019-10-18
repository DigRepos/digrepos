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
    { idx: 1, key: "star", expr: "Star" },
    { idx: 2, key: "fork", expr: "Fork" },
    { idx: 3, key: "watch", expr: "Watch" },
    { idx: 4, key: "date", expr: "Date" }
  ]

  const [panels, setPanels] = React.useState(initSortPanels)

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

  const orderUpdate = React.useCallback(
    (dragIdx: number, hoverIdx: number) => {
      const fromIdx = correspondingArrayIndex(panels, dragIdx)
      const toIdx = correspondingArrayIndex(panels, hoverIdx)
      const dragPanel: DraggableItem = panels[fromIdx]
      let tmpPanels: DraggableItem[] = panels
      tmpPanels.splice(fromIdx, 1)
      tmpPanels.splice(toIdx, 0, dragPanel)
      setPanels(([] as DraggableItem[]).concat(tmpPanels))
      console.log(panels)
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
