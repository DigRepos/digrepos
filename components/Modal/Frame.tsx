import * as React from "react"
import styled from '../../interfaces/styled-theme'

type Props = {
  height: string
  width: string
  backgroundColorHex: string
}

const ModalFrame = styled.div<{
  height: string
  width: string
  backgroundColorHex: string
}>`
  position: fixed;
  top: 0;
  left: 0;
  height: ${props => props.height};
  width: ${props => props.width};
  background-color: ${props => "#" + props.backgroundColorHex};
  z-index: 300;
`

const Frame: React.FC<Props> = props => {
  return <ModalFrame {...props}>{props.children}</ModalFrame>
}

export default Frame
