export default function SectorBackground() {
  const opacity = `.3`;
  return (
    <>
      <defs>
        <clipPath id="circle-clip">
          <circle name="c1" cx="400" cy="400" r="400" fill="none" />
        </clipPath>
      </defs>
      <g
        strokeWidth={1}
        fill="none"
        opacity={opacity}
        clipPath="url(#circle-clip)"
      >
        <path name="hLine" d="M 0,400 l 800,0" />
        <path name="vLine" d="M 400,0 l 0,800" />
        <path name="nwToSE" d="M 0,0 L 800,800" />
        <path name="swToNE" d="M 0,800 L 800,0" />
      </g>
      <circle
        name="c1"
        cx="400"
        cy="400"
        r="399"
        strokeWidth={2}
        fill="none"
        opacity={opacity}
      />
    </>
  );
}
