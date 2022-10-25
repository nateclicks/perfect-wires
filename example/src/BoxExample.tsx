import React from 'react';
import { getWirePath } from 'perfect-wires';

export default function BoxExample() {
  const ref = React.useRef<HTMLElement>(null);
  const [b1, setB1] = React.useState({ x: 100, y: 100, h: 186, w: 300 });
  const [b2, setB2] = React.useState({ x: 400, y: 400, h: 186, w: 300 });
  const dotColor = '#F700FF';

  const path = getWirePath(b1, b2);

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
        stroke="#000"
        fill="#000"
        strokeWidth={5}
      >
        <rect
          name="b1"
          x={b1.x}
          y={b1.y}
          width={b1.w}
          height={b1.h}
          fill="none"
          rx={8}
        />
        <rect
          name="b2"
          x={b2.x}
          y={b2.y}
          width={b2.w}
          height={b2.h}
          fill="none"
          rx={8}
        />
        <path name="wire" d={path} strokeWidth={5} fill="none" />
        <circle
          name="start-point"
          cx={b1.x + b1.w / 2}
          cy={b1.y + b1.h / 2}
          r={5}
          fill={dotColor}
          strokeWidth={3}
        />
        <circle
          name="end-point"
          cx={b2.x + b2.w / 2}
          cy={b2.y + b2.h / 2}
          r={5}
          fill={dotColor}
          strokeWidth={3}
        />
      </svg>
    </section>
  );
}
