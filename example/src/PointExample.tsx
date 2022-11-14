import React from 'react';
import { getWire } from 'perfect-wires';

export default function PointExample() {
  const ref = React.useRef<HTMLElement>(null);
  const [p1, setP1] = React.useState({ x: 400, y: 400 });
  const [p2, setP2] = React.useState({ x: 500, y: 500 });

  const dotColor = '#F700FF';
  const outlineColor = '#fff';

  const path = getWire(p1.x, p1.y, p2.x, p2.y);

  return (
    <section ref={ref}>
      <svg
        viewBox="0 0 800 800"
        style={{
          width: 800,
          height: 800,
          border: `.375rem solid ${outlineColor}`,
          borderRadius: '1rem',
        }}
        onClick={e => {
          const { pageX, pageY } = e;
          setP2(b => ({
            ...b,
            x: pageX - (ref.current?.offsetLeft || 0),
            y: pageY - (ref.current?.offsetTop || 0),
          }));
        }}
        onMouseMove={e => {
          if (e.buttons !== 1) return;
          const { pageX, pageY } = e;
          setP2(b => ({
            ...b,
            x: pageX - (ref.current?.offsetLeft || 0),
            y: pageY - (ref.current?.offsetTop || 0),
          }));
        }}
        stroke={outlineColor}
        fill={dotColor}
        strokeWidth={3}
      >
        <path name="wire" d={path} strokeWidth={5} fill="none" />
        <circle name="start-circle" cx={p1.x} cy={p1.y} r={5} />
        <circle name="end-circle" cx={p2.x} cy={p2.y} r={5} />
      </svg>
    </section>
  );
}
