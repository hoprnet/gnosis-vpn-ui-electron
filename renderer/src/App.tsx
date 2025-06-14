import { useState, useRef, useEffect } from 'react';

import LinePaths from './components/LinesPaths';
import { StartButton } from './components/StartButton';
import { Status } from './components/Status';

function App() {
  const [running, setRunning] = useState(false);
  const statusRef = useRef<HTMLDivElement | null>(null);
  const [statusY, setStatusY] = useState<number | null>(null);

  useEffect(() => {
    if (statusRef.current) {
      setStatusY(statusRef.current.getBoundingClientRect().y);
    }
  }, [running]); // Add other dependencies if Status can move

  useEffect(() => {
    if (statusY !== null) {
      console.log('Status Y position:', statusY);
    }
  }, [statusY]);

  return (
    <>
      <div className="flex flex-col items-center h-screen bg-gray-100 relative w-full">
        <div className="absolute inset-0 w-full h-full z-0">
          <LinePaths y={statusY} />
        </div>
        <div className="flex flex-col items-center relative z-10 w-full h-full">
          <Status ref={statusRef} running={running} />
          <StartButton running={running} setRunning={setRunning} />
        </div>
      </div>
    </>
  );
}

export default App;
