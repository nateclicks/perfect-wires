import { getWire } from '../src';

describe('getWire', () => {
  it('works', () => {
    expect(getWire(400, 400, 500, 500)).toEqual(
      'M400,400 L400,450 a 50,50 90 0 0 50,50 L500,500'
    );
  });
});

describe('getWire', () => {
  it('works 0,0,0,0', () => {
    expect(getWire(0, 0, 0, 0)).toEqual('M0,0 L0,0 a 0,0 90 0 1 0,0 L0,0');
  });
});
