export interface Box {
  x: number;
  y: number;
  h: number;
  w: number;
  name?: string;
  parent?: Box;
  cx?: number;
  cy?: number;
}
