import React from 'react';
import { getWirePath } from 'perfect-wires';

export default function CircleExample() {
  const ref = React.useRef<HTMLElement>(null);
  const [c1, setC1] = React.useState({ x: 300, y: 300, h: 100, w: 100 });
  const [c2, setC2] = React.useState({ x: 500, y: 500, h: 100, w: 100 });
  const dotColor = '#F700FF';

  const path = getWirePath(c1, c2);

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
          setC2(c => ({
            ...c,
            x: pageX - c.w / 2 - (ref.current?.offsetLeft || 0),
            y: pageY - c.h / 2 - (ref.current?.offsetTop || 0),
          }));
        }}
        onMouseMove={e => {
          if (e.buttons !== 1) return;
          const { pageX, pageY } = e;
          setC2(c => ({
            ...c,
            x: pageX - c.w / 2 - (ref.current?.offsetLeft || 0),
            y: pageY - c.h / 2 - (ref.current?.offsetTop || 0),
          }));
        }}
        stroke="#000"
        fill="#000"
        strokeWidth={5}
      >
        <path name="wire" d={path} strokeWidth={5} fill="none" />
        <circle
          name="c1"
          cx={c1.x + c1.w / 2}
          cy={c1.y + c1.h / 2}
          r={c1.w}
          fill="#FFF"
          rx={8}
        />
        <circle
          name="c2"
          cx={c2.x + c2.w / 2}
          cy={c2.y + c2.h / 2}
          r={c2.w}
          fill="#FFF"
          rx={8}
        />
        <circle
          name="start-point"
          cx={c1.x + c1.w / 2}
          cy={c1.y + c1.h / 2}
          r={5}
          fill={dotColor}
          strokeWidth={3}
        />
        <circle
          name="end-point"
          cx={c2.x + c2.w / 2}
          cy={c2.y + c2.h / 2}
          r={5}
          fill={dotColor}
          strokeWidth={3}
        />
      </svg>
    </section>
  );
}
