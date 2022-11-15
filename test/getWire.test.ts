import { getWire } from '../src';

describe('getWire', () => {
  it('works', () => {
    expect(getWire(400, 400, 500, 500)).toEqual(
      'M400,400 L400,450 a 50,50 90 0 0 50,50 L500,500'
    );
  });
});
