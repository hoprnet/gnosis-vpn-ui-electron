import { useState, useEffect } from 'react';
import { useStateStore } from '../stores/stateStore';

type Line = {
  d: string;
  stroke?: string;
  strokeLinecap?: 'square' | 'butt' | 'round' | 'inherit' | undefined;
};

const LinePaths = ({ y }: { y: number | null }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const status = useStateStore(state => state.status);

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
  const lines = {
    offline: [
      {
        d: `M${halfWidth} ${(y || 0) * 2} V${height}`,
        stroke: '#fafafa',
      },

      {
        d: `M${halfWidth - gap} ${height * 0.25} V${height}`,
        stroke: '#fafafa',
      },
      {
        d: `M${halfWidth - gap} ${height * 0.25} H000`,
        stroke: '#fafafa',
      },

      {
        d: `M${halfWidth + gap} ${height * 0.7} V${height}`,
        stroke: '#fafafa',
      },
      {
        d: `M${halfWidth + gap} ${height * 0.7} H${width}`,
        stroke: '#fafafa',
      },
    ],
    connected: [
      {
        d: `M${halfWidth - gap} ${height} V${height * 0.82}`,
        stroke: '#fafafa94',
      },
      {
        d: `M${halfWidth - gap} ${height * 0.82} H000`,
        stroke: '#fafafa94',
      },
      {
        d: `M${halfWidth + gap} ${height * 0.78} V${height}`,
        stroke: '#fafafa94',
      },
      {
        d: `M${halfWidth + gap} ${height * 0.78} H${width}`,
        stroke: '#fafafa94',
      },
      {
        d: `M${halfWidth} ${height * 0.8} V${height}`,
        stroke: '#00a63e',
        strokeLinecap: 'square' as const,
      },
    ],
    loading: [
      {
        d: `M${halfWidth} ${height * 0.5} V${height}`,
        stroke: '#155dfc',
        strokeLinecap: 'square' as const,
      },
    ],
    error: [
      {
        d: `M${halfWidth} ${height * 0.85} V${height}`,
        stroke: '#7b3306',
        strokeLinecap: 'square' as const,
      },
    ],
    quitting: [
      {
        d: `M${halfWidth} ${height * 0.3} V${height}`,
        stroke: '#fafafa',
      },

      {
        d: `M${halfWidth - gap} ${height * 0.25} V${height}`,
        stroke: '#fafafa',
      },
      {
        d: `M${halfWidth - gap} ${height * 0.25} H000`,
        stroke: '#fafafa',
      },

      {
        d: `M${halfWidth + gap} ${height * 0.7} V${height}`,
        stroke: '#fafafa',
      },
      {
        d: `M${halfWidth + gap} ${height * 0.7} H${width}`,
        stroke: '#fafafa',
      },
    ],

    // [
    // {
    //   d: `M${halfWidth} ${height * 0.3} V${height}`,
    //   stroke: '#737373',
    //   strokeLinecap: 'square' as const,
    // },
    // ],
  };

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      strokeLinecap="square"
      style={{ position: 'absolute', top: 0, left: 0 }}
    >
      {(lines[status as keyof typeof lines] || []).map(
        (line: Line, index: number) => (
          <path
            key={index}
            d={line.d}
            stroke={line.stroke}
            strokeWidth="25"
            strokeLinecap={line.strokeLinecap || 'round'}
          />
        )
      )}
    </svg>
  );
};

export default LinePaths;
