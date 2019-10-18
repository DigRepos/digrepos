import * as React from "react"
import styled from "../../interfaces/styled-theme"
import {
  useDrag,
  useDrop,
  DropTargetMonitor
} from "react-dnd-cjs"
import { XYCoord } from "dnd-core"
import ItemType from "./ItemType"
import { DraggableItem } from "../../interfaces"

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
  update: (dragIdx: number, hoverIdx: number) => void
}

const Panel: React.FC<Props> = props => {
  const ref = React.useRef<HTMLDivElement>(null)
  const [, drop] = useDrop<DraggableItem & { type: string }, any, any>({
    accept: ItemType.PANEL,
    hover(item: DraggableItem, monitor: DropTargetMonitor): void {
      if (!ref.current) {
        return
      }
      const dragIndex = item.idx
      const hoverIndex = props.item.idx

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect()

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset()

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      
      props.update(dragIndex, hoverIndex)
      item.idx = hoverIndex
    }
  })
  const [, drag] = useDrag({
    item: {
      type: ItemType.PANEL,
      idx: props.item.idx,
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  drag(drop(ref))

  return <StyledPanel ref={ref}>{props.item.expr}</StyledPanel>
}

export default Panel
