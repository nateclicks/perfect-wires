import { Box } from './Box';
const PI = Math.PI;

/**
 * @param  {number} angle, in radians
 * @param  {number} segments number of segments to use. Default value is 8 (octant)
 */
export function getSector(angle: number, segments = 8): number {
  if (angle !== PI) {
    return Math.floor(segments * (0.5 + ((angle / (PI * 2)) % segments)));
  }
  return segments - 1;
}

/**
 * Get an angle (radians) between two points.
 * @param x0 The x-axis coordinate of the first point.
 * @param y0 The y-axis coordinate of the first point.
 * @param x1 The x-axis coordinate of the second point.
 * @param y1 The y-axis coordinate of the second point.
 */
export function getAngle(
  x0: number,
  y0: number,
  x1: number,
  y1: number
): number {
  return Math.atan2(y1 - y0, x1 - x0);
}

/**
 * @param  {Box} sBox - The box to start the wire from
 * @param  {Box} eBox - The box to end the wire at
 */
export function getBoxToBoxWire(sBox: Box, eBox: Box): string {
  let p1x = 0;
  let p1y = 0;
  let p2x = 0;
  let p2y = 0;

  sBox.cx = sBox.x + sBox.w / 2;
  sBox.cy = sBox.y + sBox.h / 2;
  eBox.cx = eBox.x + eBox.w / 2;
  eBox.cy = eBox.y + eBox.h / 2;

  const sBoxTop = { x: sBox.cx, y: sBox.y };
  const sBoxBottom = { x: sBox.cx, y: sBox.y + sBox.h };
  const sBoxLeft = { x: sBox.x, y: sBox.cy };
  const sBoxRight = { x: sBox.x + sBox.w, y: sBox.cy };

  const eBoxTop = { x: eBox.cx, y: eBox.y };
  const eBoxBottom = { x: eBox.cx, y: eBox.y + eBox.h };
  const eBoxLeft = { x: eBox.x, y: eBox.cy };
  const eBoxRight = { x: eBox.x + eBox.w, y: eBox.cy };

  // get the angle between the center points of each box
  const angle = getAngle(sBox.cx, sBox.cy, eBox.cx, eBox.cy);

  const sector = getSector(angle);

  switch (sector) {
    case 0:
      p1x = sBoxLeft.x;
      p1y = sBoxLeft.y;
      p2x = eBoxBottom.x;
      p2y = eBoxBottom.y;
      break;
    case 1:
      p1x = sBoxTop.x;
      p1y = sBoxTop.y;
      p2x = eBoxRight.x;
      p2y = eBoxRight.y;
      break;
    case 2:
      p1x = sBox.x + sBox.w / 2;
      p1y = sBox.y;
      p2x = eBox.x;
      p2y = eBox.y + eBox.h / 2;
      break;
    case 3:
      p1x = sBox.x + sBox.w;
      p1y = sBox.y + sBox.h / 2;
      p2x = eBox.x + eBox.w / 2;
      p2y = eBox.y + eBox.h;
      break;
    case 4:
      p1x = sBox.x + sBox.w;
      p1y = sBox.y + sBox.h / 2;
      p2x = eBox.x + eBox.w / 2;
      p2y = eBox.y;
      break;
    case 5:
      p1x = sBoxBottom.x;
      p1y = sBoxBottom.y;
      p2x = eBoxLeft.x;
      p2y = eBoxLeft.y;
      break;
    case 6:
      p1x = sBoxBottom.x;
      p1y = sBoxBottom.y;
      p2x = eBoxRight.x;
      p2y = eBoxRight.y;
      break;
    case 7:
      p1x = sBoxLeft.x;
      p1y = sBoxLeft.y;
      p2x = eBoxTop.x;
      p2y = eBoxTop.y;
      break;
    default:
      console.log(angle);
      console.log(getSector(angle));
  }

  const path = getWire(p1x, p1y, p2x, p2y, sector);

  return path;
}

/**
 * @param  {number} sx - X-coordinate of the starting point.
 * @param  {number} sy - Y-coordinate of the starting point.
 * @param  {number} ex - X-coordinate of the end point.
 * @param  {number} ey - Y-coordinate of the end point.
 * @returns {string} - path data for creating an svg path
 */
export function getWire(
  sx: number,
  sy: number,
  ex: number,
  ey: number,
  sector: number = getSector(getAngle(sx, sy, ex, ey))
): string {
  const dx = Math.abs(ex - sx);
  const dy = Math.abs(ey - sy);
  let r1: number;

  let bax = ex;
  let bay = ey;
  let d = 0;

  if (dx <= dy) {
    r1 = dx / 2;
  } else {
    r1 = dy / 2;
  }

  let r2: number = r1;
  let eax = r1;
  let eay = r1;

  switch (sector) {
    case 0:
      bax = ex + r1;
      bay = sy;
      eax = -r1;
      eay = -r1;
      d = 1;
      break;
    case 1:
      bax = sx;
      bay = ey + r1;
      eax = -r1;
      eay = -r1;
      d = 0;
      break;
    case 2:
      bax = sx;
      bay = ey + r1;
      eax = r1;
      eay = -r1;
      d = 1;
      break;
    case 3:
      bax = ex - r1;
      bay = sy;
      eax = r1;
      eay = -r1;
      d = 0;
      break;
    case 4:
      bax = ex - r1;
      bay = sy;
      eax = r1;
      eay = r1;
      d = 1;
      break;
    case 5:
      bax = sx;
      bay = ey - r1;
      eax = r1;
      eay = r1;
      d = 0;
      break;
    case 6:
      bax = sx;
      bay = ey - r1;
      eax = -r1;
      eay = r1;
      d = 1;
      break;
    case 7:
      bax = ex + r1;
      bay = sy;
      eax = -r1;
      eay = r1;
      d = 0;
      break;
    default:
      console.log('default');
      bax = ex + r1;
      bay = sy;
      eax = -r1;
      eay = -r1;
      d = 1;
  }
  const path = `M${sx},${sy} L${bax},${bay} a ${r1},${r2} 90 0 ${d} ${eax},${eay} L${ex},${ey}`;
  return path;
}

/**
 * Returns the the quadrant (1, 2, 3, 4) the end point is
 * using the starting point as the origin of a grid.
 *
 * @param  {number} sx - X-coord of first point
 * @param  {number} sy - Y-coord of first point
 * @param  {number} ex - X-coord of second point
 * @param  {number} ex - Y-coord of second point
 * @returns {number} the quadrant
 * @example
 * quadrant(50, 50, 40, 40) - returns 1
 * ------------------
 * |   1    |   2   |
 * ---------+--------
 * |   3    |   4   |
 * ------------------
 */
// function quadrant(sx: number, sy: number, ex: number, ey: number): number {
//   if (ex > sx && ey > sy) return 4;
//   else if (ex < sx && ey > sy) return 3;
//   else if (ex < sx && ey < sy) return 1;
//   else if (ex > sx && ey < sy) return 2;
//   else if (ex == 0 && ey > sy) return 3;
//   else if (ex == 0 && ey < sy) return 1;
//   else if (ey == 0 && ex < sx) return 1;
//   else if (ey == 0 && ex > sx) return 3;
//   else return 1;
// }
