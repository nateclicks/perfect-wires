import React from 'react';
import { getWirePath } from 'perfect-wires';

export default function BoxExample() {
  const ref = React.useRef<HTMLElement>(null);
  const [b1, setB1] = React.useState({ x: 300, y: 350, h: 100, w: 200 });
  const [b2, setB2] = React.useState({ x: 500, y: 500, h: 100, w: 150 });
  const [b3, setB3] = React.useState({ x: 150, y: 200, h: 100, w: 150 });
  const [b4, setB4] = React.useState({ x: 500, y: 200, h: 100, w: 150 });
  const [b5, setB5] = React.useState({ x: 150, y: 500, h: 100, w: 150 });
  const dotColor = '#F700FF';

  const path = getWirePath(b1, b2);
  // const pathB3 = getWirePath(b1, b3);
  // const pathB4 = getWirePath(b1, b4);
  // const pathB5 = getWirePath(b1, b5);

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
        <path name="wire" d={path} strokeWidth={5} fill="none" />
        {/* <path name="wire-b3" d={pathB3} strokeWidth={5} fill="none" />
        <path name="wire-b4" d={pathB4} strokeWidth={5} fill="none" />
        <path name="wire-b5" d={pathB5} strokeWidth={5} fill="none" /> */}
        <rect
          name="b1"
          x={b1.x}
          y={b1.y}
          width={b1.w}
          height={b1.h}
          fill="#FFF"
          rx={8}
        />
        <circle
          name="start-point"
          cx={b1.x + b1.w / 2}
          cy={b1.y + b1.h / 2}
          r={5}
          fill={dotColor}
          strokeWidth={3}
        />
        <rect
          name="b2"
          x={b2.x}
          y={b2.y}
          width={b2.w}
          height={b2.h}
          fill="#FFF"
          rx={8}
        />
        <circle
          name="end-point"
          cx={b2.x + b2.w / 2}
          cy={b2.y + b2.h / 2}
          r={5}
          fill={dotColor}
          strokeWidth={3}
        />
        {/* <rect
          name="b3"
          x={b3.x}
          y={b3.y}
          width={b3.w}
          height={b3.h}
          fill="#FFF"
          rx={8}
        />
        <circle
          name="end-point"
          cx={b3.x + b3.w / 2}
          cy={b3.y + b3.h / 2}
          r={5}
          fill={dotColor}
          strokeWidth={3}
        />
        <rect
          name="b4"
          x={b4.x}
          y={b4.y}
          width={b4.w}
          height={b4.h}
          fill="#FFF"
          rx={8}
        />
        <circle
          name="end-point"
          cx={b4.x + b4.w / 2}
          cy={b4.y + b4.h / 2}
          r={5}
          fill={dotColor}
          strokeWidth={3}
        />
        <rect
          name="b5"
          x={b5.x}
          y={b5.y}
          width={b5.w}
          height={b5.h}
          fill="#FFF"
          rx={8}
        />
        <circle
          name="end-point"
          cx={b5.x + b5.w / 2}
          cy={b5.y + b5.h / 2}
          r={5}
          fill={dotColor}
          strokeWidth={3}
        /> */}
      </svg>
    </section>
  );
}
