import React from 'react';
import { getWire } from 'perfect-wires';

export default function PointExample() {
  const ref = React.useRef<HTMLElement>(null);
  const [p1, setP1] = React.useState({ x: 400, y: 400 });
  const [p2, setP2] = React.useState({ x: 500, y: 500 });
  const dotColor = '#F700FF';

  const [sx, sy, ex, ey, r1, r2, d, bax, bay, eax, eay] = getWire(
    p1.x,
    p1.y,
    p2.x,
    p2.y
  );

  return (
    <section ref={ref}>
      <svg
        viewBox="0 0 800 800"
        style={{
          width: 800,
          height: 800,
          border: '.375rem solid #000',
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
        stroke="#000"
        fill={dotColor}
        strokeWidth={3}
      >
        <circle name="start-circle" cx={sx} cy={sy} r={5} />
        <path
          name="wire"
          d={`M${sx},${sy} L${bax},${bay} a ${r1},${r2} 90 0 ${d} ${eax},${eay} L${ex},${ey}`}
          strokeWidth={5}
          fill="none"
        />
        <circle
          name="start-point"
          cx={p1.x}
          cy={p1.y}
          r={3}
          fill={dotColor}
          strokeWidth={0}
        />
        <circle
          name="end-point"
          cx={p2.x}
          cy={p2.y}
          r={3}
          fill={dotColor}
          strokeWidth={0}
        />
        <circle name="end-circle" cx={ex} cy={ey} r={5} />
      </svg>
    </section>
  );
}
