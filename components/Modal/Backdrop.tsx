import * as React from "react"
import styled from "../../interfaces/styled-theme"

type Props = {
  colorHex: string
  clickHandler: () => void
}

const Overlay = styled.div<{ colorHex: string }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: ${props => "#" + props.colorHex};
  opacity: 0.6;
  z-index: 200;
`

const Backdrop: React.FC<Props> = props => {
  return <Overlay colorHex={props.colorHex} onClick={e => props.clickHandler()} />
}

export default Backdrop
