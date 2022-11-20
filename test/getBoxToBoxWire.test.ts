import { getBoxToBoxWire, Box } from '../src';

describe('getBoxToBoxWire', () => {
  const box1: Box = {
    x: 300,
    y: 350,
    h: 100,
    w: 200,
    name: 'Parent',
  };
  const box2: Box = {
    x: 550,
    y: 500,
    h: 100,
    w: 150,
    name: 'Box A',
  };
  it('works', () => {
    expect(getBoxToBoxWire(box1, box2, { deadZone: 5 })).toEqual(
      'M500,400 L575,400 a 50,50 90 0 1 50,50 L625,500'
    );
  });
});
