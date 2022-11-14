const PI = Math.PI;

interface Box {
  x: number;
  y: number;
  h: number;
  w: number;
}

/**
 * @param  {number} angle, in radians
 * @param  {number} segments number of segments to use. Default value is 8 (octant)
 */
export function getSector(angle: number, segments = 8): number {
  if (angle != PI) {
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
 * @param  {Box} b1
 * @param  {Box} b2
 */
export function getWirePath(b1: Box, b2: Box): string {
  let p1x = b1.x + b1.w;
  let p1y = b1.y + b1.h / 2;
  let p2x = b2.x + b2.w / 2;
  let p2y = b2.y + b2.h;

  const b1Top = { x: b1.x + b1.w / 2, y: b1.y };
  const b1Bottom = { x: b1.x + b1.w / 2, y: b1.y + b1.h };
  const b1Left = { x: b1.x, y: b1.y + b1.h / 2 };
  const b1Right = { x: b1.x + b1.w, y: b1.y + b1.h / 2 };

  const b2Top = { x: b2.x + b2.w / 2, y: b2.y };
  const b2Bottom = { x: b2.x + b2.w / 2, y: b2.y + b2.h };
  const b2Left = { x: b2.x, y: b2.y + b2.h / 2 };
  const b2Right = { x: b2.x + b2.w, y: b2.y + b2.h / 2 };

  const angle = getAngle(
    b1.x + b1.w / 2,
    b1.y + b1.h / 2,
    b2.x + b2.w / 2,
    b2.y + b2.h / 2
  );

  const sector = getSector(angle);

  switch (sector) {
    case 0:
      p1x = b1Left.x;
      p1y = b1Left.y;
      p2x = b2Bottom.x;
      p2y = b2Bottom.y;
      break;
    case 1:
      p1x = b1Top.x;
      p1y = b1Top.y;
      p2x = b2Right.x;
      p2y = b2Right.y;
      break;
    case 2:
      p1x = b1.x + b1.w / 2;
      p1y = b1.y;
      p2x = b2.x;
      p2y = b2.y + b2.h / 2;
      break;
    case 3:
      p1x = b1.x + b1.w;
      p1y = b1.y + b1.h / 2;
      p2x = b2.x + b2.w / 2;
      p2y = b2.y + b2.h;
      break;
    case 4:
      p1x = b1.x + b1.w;
      p1y = b1.y + b1.h / 2;
      p2x = b2.x + b2.w / 2;
      p2y = b2.y;
      break;
    case 5:
      p1x = b1Bottom.x;
      p1y = b1Bottom.y;
      p2x = b2Left.x;
      p2y = b2Left.y;
      break;
    case 6:
      p1x = b1Bottom.x;
      p1y = b1Bottom.y;
      p2x = b2Right.x;
      p2y = b2Right.y;
      break;
    case 7:
      p1x = b1Left.x;
      p1y = b1Left.y;
      p2x = b2Top.x;
      p2y = b2Top.y;
      break;
    default:
      console.log(angle);
      console.log(getSector(angle));
  }

  // let [sx, sy, ex, ey, r1, r2, d, bax, bay, eax, eay] = getWire(
  //   p1x,
  //   p1y,
  //   p2x,
  //   p2y
  // );
  const path = getWire(p1x, p1y, p2x, p2y);
  // const path = `M${sx},${sy} L${bax},${bay} a ${r1},${r2} 90 0 ${d} ${eax},${eay} L${ex},${ey}`;

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
  ey: number
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

  const angle = getAngle(sx, sy, ex, ey);
  const sector = getSector(angle);

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
