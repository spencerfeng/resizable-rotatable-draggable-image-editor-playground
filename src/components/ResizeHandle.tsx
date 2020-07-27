import React from 'react'

import { Point } from '../interfaces'
import { ResizeHandlePosition } from '../enums'
import { getDiagonalL } from '../utils'

import './ResizeHandle.scss'

interface ResizeHandleProps {
  center: Point
  rotateAngle: number
  position: ResizeHandlePosition
  onResizeStart: () => void
  onResizeEnd: () => void
  onResize: (deltaL: number, deltaAngle: number, position: ResizeHandlePosition) => void
}

const ResizeHandle = (props: ResizeHandleProps): JSX.Element => {
  const styles = {
    top: `${props.center.y - 5}px`,
    left: `${props.center.x - 5}px`
  }

  const startResize = (e: React.MouseEvent) => {
    const cursorStartingPoint = {
      x: e.clientX,
      y: e.clientY
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!cursorStartingPoint) return

      const deltaX = e.clientX - cursorStartingPoint.x
      const deltaY = cursorStartingPoint.y - e.clientY
      const deltaL = getDiagonalL(deltaX, deltaY)
      const deltaAngle = Math.atan2(deltaY, deltaX)

      props.onResize(deltaL, deltaAngle, props.position)
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)

      props.onResizeEnd()
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  return <div style={styles} className={`${props.position} resize-handle-wrapper`} onMouseDown={startResize}></div>
}

export default ResizeHandle
