import React from 'react'

import { Center } from '../interfaces'
import { ResizeHandlePosition } from '../enums'

import './ResizeHandle.scss'

interface ResizeHandleProps {
  center: Center
  rotateAngle: number
  position: ResizeHandlePosition
}

const ResizeHandle = (props: ResizeHandleProps): JSX.Element => {
  const inlineStyles = {
    top: `${props.center.y - 5}px`,
    left: `${props.center.x - 5}px`
  }

  return <div style={inlineStyles} className={`${props.position} resize-handle-wrapper`}></div>
}

export default ResizeHandle
