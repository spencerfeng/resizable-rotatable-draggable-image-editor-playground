import React, { useState } from 'react'
import ResizeHandle from './ResizeHandle'

import { Point } from '../interfaces'
import { ResizeHandlePosition } from '../enums'
import { RESIZE_HANDLE_POSITIONS } from '../constants'
import { centerToTl } from '../utils'

import './Frame.scss'

interface FrameProps {
  width: number
  height: number
  rotateAngle: number
  center: Point
}

interface FrameStyles {
  width: number
  height: number
  top: number
  left: number
  transform: string
}

const Frame = (props: FrameProps): JSX.Element => {
  const [attributes, setAttributes] = useState<FrameProps>({
    width: props.width,
    height: props.height,
    center: props.center,
    rotateAngle: props.rotateAngle
  })

  const getStyles = (attr: FrameProps): FrameStyles => {
    const tlPoint = centerToTl(attr.center, attr.width, attr.height)

    return {
      width: attr.width,
      height: attr.height,
      top: tlPoint.y,
      left: tlPoint.x,
      transform: `rotate(${attr.rotateAngle}rad)`
    }
  }

  const getResizeHandleCenter = (position: ResizeHandlePosition): Point => {
    switch (position) {
      case ResizeHandlePosition.TL:
        return {
          x: 0,
          y: 0
        }
      case ResizeHandlePosition.T:
        return {
          x: attributes.width / 2,
          y: 0
        }
      case ResizeHandlePosition.TR:
        return {
          x: attributes.width,
          y: 0
        }
      case ResizeHandlePosition.R:
        return {
          x: attributes.width,
          y: attributes.height / 2
        }
      case ResizeHandlePosition.BR:
        return {
          x: attributes.width,
          y: attributes.height
        }
      case ResizeHandlePosition.B:
        return {
          x: attributes.width / 2,
          y: attributes.height
        }
      case ResizeHandlePosition.BL:
        return {
          x: 0,
          y: attributes.height
        }
      case ResizeHandlePosition.L:
        return {
          x: 0,
          y: attributes.height / 2
        }
    }
  }

  const handleResize = (deltaL: number, deltaAngle: number, position: ResizeHandlePosition) => {
    if (position === ResizeHandlePosition.R) {
      const deltaWidth = Math.cos(deltaAngle + props.rotateAngle) * deltaL
      const newCenter = {
        x: attributes.center.x + (Math.cos(attributes.rotateAngle) * deltaWidth) / 2,
        y: attributes.center.y + (Math.sin(attributes.rotateAngle) * deltaWidth) / 2
      }
      setAttributes({
        ...attributes,
        width: attributes.width + deltaWidth,
        center: newCenter
      })
    } else if (position === ResizeHandlePosition.L) {
      const deltaWidth = -Math.cos(deltaAngle + props.rotateAngle) * deltaL
      const newCenter = {
        x: attributes.center.x - (Math.cos(attributes.rotateAngle) * deltaWidth) / 2,
        y: attributes.center.y - (Math.sin(attributes.rotateAngle) * deltaWidth) / 2
      }
      setAttributes({
        ...attributes,
        width: attributes.width + deltaWidth,
        center: newCenter
      })
    } else if (position === ResizeHandlePosition.B) {
      const deltaHeight = Math.cos(deltaAngle + attributes.rotateAngle + Math.PI / 2) * deltaL
      const newCenter = {
        x: attributes.center.x + (Math.cos(attributes.rotateAngle + Math.PI / 2) * deltaHeight) / 2,
        y: attributes.center.y + (Math.sin(attributes.rotateAngle + Math.PI / 2) * deltaHeight) / 2
      }

      setAttributes({
        ...attributes,
        height: attributes.height + deltaHeight,
        center: newCenter
      })
    } else if (position === ResizeHandlePosition.T) {
      const deltaHeight = -Math.cos(deltaAngle + attributes.rotateAngle + Math.PI / 2) * deltaL
      const newCenter = {
        x: attributes.center.x - (Math.cos(attributes.rotateAngle + Math.PI / 2) * deltaHeight) / 2,
        y: attributes.center.y - (Math.sin(attributes.rotateAngle + Math.PI / 2) * deltaHeight) / 2
      }

      setAttributes({
        ...attributes,
        height: attributes.height + deltaHeight,
        center: newCenter
      })
    }
  }

  const handleResizeStart = () => {
    console.log('handleResizeStart in Frame')
  }

  const handleResizeEnd = () => {
    console.log('handleResizeEnd in Frame')
  }

  return (
    <div className="frame-wrapper" style={getStyles(attributes)}>
      {RESIZE_HANDLE_POSITIONS.map((position) => (
        <ResizeHandle
          key={position}
          position={position}
          center={getResizeHandleCenter(position)}
          rotateAngle={props.rotateAngle}
          onResize={handleResize}
          onResizeStart={handleResizeStart}
          onResizeEnd={handleResizeEnd}
        />
      ))}
    </div>
  )
}

export default Frame
