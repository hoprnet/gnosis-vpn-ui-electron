import { useState, useRef, useEffect } from 'react';

import LinePaths from './components/LinesPaths';
import { StartButton } from './components/Button/Button';
import { Status } from './components/Status';
import { Route } from './components/Route';
import { useStateStore } from './stores/stateStore';
import ManageRouteModal from './components/ManageRoute';

function App() {
  const statusRef = useRef<HTMLDivElement | null>(null);
  const [statusY, setStatusY] = useState<number | null>(null);

  const status = useStateStore(state => state.status);
  const msgHandler = useStateStore(state => state.msgHandler);

  useEffect(() => {
    window.electronAPI.onMessage(msgHandler);
    console.log('onMessage event handler loaded');

    return () => {
      window.electronAPI.offMessage(msgHandler);
      console.log('onMessage event handler unloaded');
    };
  }, [msgHandler]);

  useEffect(() => {
    if (statusRef.current) {
      setStatusY(statusRef.current.getBoundingClientRect().y);
    }
  }, []);

  console.log('status: ', status);

  return (
    <>
      <div className="flex flex-col items-center h-screen bg-gray-100 relative w-full">
        <div className="absolute inset-0 w-full h-full z-0">
          <LinePaths y={statusY} />
        </div>
        <div className="flex flex-col items-center relative z-10 w-full h-full">
          <Status ref={statusRef} />
          {/* {status === 'connected' && <Route stops={['Germany', 'Spain']} />}
          <StartButton /> */}
          <ManageRouteModal open={true} setOpen={() => {}} />;
        </div>
      </div>
    </>
  );
}

export default App;
