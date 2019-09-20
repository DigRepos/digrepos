import * as React from "react"
import Frame from "./Frame"
import Backdrop from "./Backdrop"
import { ModalStyle, ModalOverlayStyle } from "../../interfaces"
import styled, { keyframes } from '../../interfaces/styled-theme'

type Props = {
  isShow: boolean
  onClose: () => void
  modalStyle: ModalStyle
  overlayStyle: ModalOverlayStyle
}

const modalFadeIn = keyframes`
  from {
    left: -30%;
  }
  to {
    left: 0%;
  }
`

const modalFadeOut = keyframes`
  from {
    left: 0%;
  }
  to {
    left: -30%;
  }
`

const OverlayFadeIn = keyframes`
  from {
    opacity: 0;
    visibility: hidden;
  }
  to {
    opacity: 0.7;
    visibility: visible;
  }
`

const OverlayFadeOut = keyframes`
  from {
    opacity: 0.7;
    visibility: visible;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
`


const Modal: React.FC<Props> = props => {

  const ModalFrame = props.isShow ? styled(Frame)`
    visibility: visible;
    left: 0%;
    animation: ${modalFadeIn} 0.3s linear;
  ` : styled(Frame)`
    visibility: hidden;
    left: -30%;
    animation: ${modalFadeOut} 0.3s linear;
  `

  const ModalOverlay = props.isShow ? styled(Backdrop)`
    visibility: visible;
    animation: ${OverlayFadeIn} 0.3s linear;
  ` : styled(Backdrop)`
    visibility: hidden;
    animation: ${OverlayFadeOut} 0.3s linear;
  `

  return props.isShow ? (
    <>
      <ModalFrame {...props.modalStyle}>{props.children}</ModalFrame>
      <ModalOverlay {...props.overlayStyle} clickHandler={props.onClose} />
    </>
  ) : (
    <></>
  )
}

export default Modal
