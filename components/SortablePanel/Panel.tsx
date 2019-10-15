import * as React from "react"
import styled from "../../interfaces/styled-theme"
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd-cjs"
import ItemType from "./ItemType"
import { DraggableItem } from '../../interfaces'

const StyledPanel = styled.div`
  padding: 8px;
  margin: 12px 0px;
  text-align: center;
  border-style: solid;
  border-width: 0.8px;
  border-radius: 3px;
  color: #0ee5c7;
  border-color: #0ee5c7;
  cursor: grab;
  :active {
    cursor: grabbing;
    opacity: 0.5;
  }
`

type Props = {
  item: DraggableItem
}

const Panel: React.FC<Props> = props => {
    const ref = React.useRef<HTMLDivElement>(null)
    const [, drop] = useDrop({
        accept: ItemType.PANEL,
        // hover(item: DraggableItem, monitor: DropTargetMonitor) {
        //     if (!ref.current) {
        //         return
        //     }
        //     const dragIndex = item.idx    
        // }
    })
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemType.PANEL },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  })

  return <StyledPanel ref={ref}>{props.item.expr}</StyledPanel>
}

export default Panel
