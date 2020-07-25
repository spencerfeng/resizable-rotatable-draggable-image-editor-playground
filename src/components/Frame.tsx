import React from 'react'
import ResizeHandle from './ResizeHandle'

import { Center } from '../interfaces'
import { ResizeHandlePosition } from '../enums'
import { RESIZE_HANDLE_POSITIONS } from '../constants'

import './Frame.scss'

interface FrameProps {
  width: number
  height: number
  rotateAngle: number
  center: Center
}

const Frame = (props: FrameProps): JSX.Element => {
  const inlineStyles = {
    width: props.width,
    height: props.height,
    top: props.center.y - props.height / 2,
    left: props.center.x - props.width / 2,
    transform: `rotate(${props.rotateAngle}deg)`,
    webkitTransform: `rotate(${props.rotateAngle}deg)`,
    mozTransform: `rotate(${props.rotateAngle}deg)`,
    msTransform: `rotate(${props.rotateAngle}deg)`,
    oTransform: `rotate(${props.rotateAngle}deg)`
  }

  const getResizeHandleCenter = (position: ResizeHandlePosition): Center => {
    switch (position) {
      case ResizeHandlePosition.TL:
        return {
          x: 0,
          y: 0
        }
      case ResizeHandlePosition.T:
        return {
          x: props.width / 2,
          y: 0
        }
      case ResizeHandlePosition.TR:
        return {
          x: props.width,
          y: 0
        }
      case ResizeHandlePosition.R:
        return {
          x: props.width,
          y: props.height / 2
        }
      case ResizeHandlePosition.BR:
        return {
          x: props.width,
          y: props.height
        }
      case ResizeHandlePosition.B:
        return {
          x: props.width / 2,
          y: props.height
        }
      case ResizeHandlePosition.BL:
        return {
          x: 0,
          y: props.height
        }
      case ResizeHandlePosition.L:
        return {
          x: 0,
          y: props.height / 2
        }
    }
  }

  return (
    <div className="frame-wrapper" style={inlineStyles}>
      {RESIZE_HANDLE_POSITIONS.map((position) => (
        <ResizeHandle
          key={position}
          position={position}
          center={getResizeHandleCenter(position)}
          rotateAngle={props.rotateAngle}
        />
      ))}
    </div>
  )
}

export default Frame
