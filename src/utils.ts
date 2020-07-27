import { Point } from './interfaces'

export const getDiagonalL = (x: number, y: number): number => Math.sqrt(x * x + y * y)

export const degToRadian = (deg: number): number => (deg * Math.PI) / 180

export const centerToTl = (center: Point, width: number, height: number): Point => ({
  x: center.x - width / 2,
  y: center.y - height / 2
})
