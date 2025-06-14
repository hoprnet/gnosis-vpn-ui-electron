import { useState, useEffect } from 'react';

type Line = { d: string };

const LinePaths = ({ y }: { y: number | null }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const halfWidth = width / 2;
  const gap = 40;
  const linesData = [
    { d: `M${halfWidth} ${(y || 0) * 2} V${height}` },

    { d: `M${halfWidth - gap} ${height * 0.25} V${height}` },
    { d: `M${halfWidth - gap} ${height * 0.25} H000` },

    { d: `M${halfWidth + gap} ${height * 0.7} V${height}` },
    { d: `M${halfWidth + gap} ${height * 0.7} H${width}` },
  ];
  console.log(linesData[0].d);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      strokeLinecap="square"
      style={{ position: 'absolute', top: 0, left: 0 }}
    >
      {linesData.map((line: Line, index: number) => (
        <path
          key={index}
          d={line.d}
          stroke="#fafafa"
          strokeWidth="25"
          fill="none"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
};

export default LinePaths;
