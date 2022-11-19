import { getBoxToBoxWire, Box } from 'perfect-wires';
import React from 'react';
import SectorBackground from './SectorBackground';

export default function BoxExample() {
  const fillColor = 'rgb(39, 51, 64)';
  const outlineColor = '#fff';
  const dotColor = '#F700FF';
  const radius = 6;
  const strokeWidth = radius;

  const ref = React.useRef<HTMLElement>(null);
  const [transparent, setTransparent] = React.useState({
    isTransparent: false,
    color: fillColor,
  });
  const [b1] = React.useState({
    x: 300,
    y: 350,
    h: 100,
    w: 200,
    name: 'Parent',
  } as Box);
  const [b2, setB2] = React.useState({
    x: 550,
    y: 500,
    h: 100,
    w: 150,
    name: 'Box A',
  } as Box);

  function updateTransparency() {
    console.log(transparent);
    if (transparent.isTransparent) {
      setTransparent({ isTransparent: false, color: fillColor });
    } else {
      setTransparent({ isTransparent: true, color: 'none' });
    }
  }

  const path = getBoxToBoxWire(b1, b2, { deadZone: 2 });

  return (
    <section ref={ref}>
      <svg
        viewBox="0 0 800 800"
        style={{
          width: 800,
          height: 800,
          border: `.375rem solid ${outlineColor}`,
          borderRadius: '1rem',
          boxSizing: 'border-box',
        }}
        onClick={e => {
          const { pageX, pageY } = e;
          setB2(b => ({
            ...b,
            x: pageX - b.w / 2 - (ref.current?.offsetLeft || 0),
            y: pageY - b.h / 2 - (ref.current?.offsetTop || 0),
          }));
        }}
        onMouseMove={e => {
          if (e.buttons !== 1) return;
          const { pageX, pageY } = e;
          setB2(b => ({
            ...b,
            x: pageX - b.w / 2 - (ref.current?.offsetLeft || 0),
            y: pageY - b.h / 2 - (ref.current?.offsetTop || 0),
          }));
        }}
        stroke={outlineColor}
        fill={transparent.color}
        strokeWidth={strokeWidth}
      >
        <SectorBackground></SectorBackground>
        <path name="wire" d={path} stroke="white" fill="none" />
        <rect
          name="b1"
          x={b1.x}
          y={b1.y}
          width={b1.w}
          height={b1.h}
          rx={radius}
        />
        <circle
          name="b1-center-point"
          cx={b1.x + b1.w / 2}
          cy={b1.y + b1.h / 2}
          r={radius}
          fill={dotColor}
          strokeWidth={3}
        />
        <rect
          name="b2"
          x={b2.x}
          y={b2.y}
          width={b2.w}
          height={b2.h}
          rx={radius}
        />
        <circle
          name="b2-center-point"
          cx={b2.x + b2.w / 2}
          cy={b2.y + b2.h / 2}
          r={radius}
          fill={dotColor}
          strokeWidth={3}
        />
      </svg>
      <div style={{ display: 'grid' }}>
        <label>
          <input
            type="checkbox"
            checked={transparent.isTransparent}
            onChange={updateTransparency}
          />
          <span className="checkmark"></span>
          Transparent
        </label>
      </div>
    </section>
  );
}
