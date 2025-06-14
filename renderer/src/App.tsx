import { useState, useRef, useEffect } from 'react';

import LinePaths from './components/LinesPaths';
import { StartButton } from './components/StartButton';
import { Status } from './components/Status';
import { Route } from './components/Route';

function App() {
  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const statusRef = useRef<HTMLDivElement | null>(null);
  const [statusY, setStatusY] = useState<number | null>(null);

  function sendMessage(msg: string) {
    window.electronAPI.sendMessage(msg);
    console.log('sendMessage: ', msg);
  }

  useEffect(() => {
    const handler = (msg: string) => {
      console.log(typeof msg);
      const _msg = JSON.parse(msg);
      console.log('Received from main:', msg);
      console.log('loading: ', loading);
      console.log('running: ', running);
      if (_msg.error) {
        setStatus('error');
        setRunning(false);
      } else {
        setStatus('online');

        if (!running && loading) {
          setRunning(true);
          setLoading(false);
        }
      }
    };

    window.electronAPI.onMessage(handler);
    console.log('onMessage event handler loaded');

    return () => {
      window.electronAPI.offMessage(handler);
      console.log('onMessage event handler unloaded');
    };
  }, []);

  useEffect(() => {
    if (statusRef.current) {
      setStatusY(statusRef.current.getBoundingClientRect().y);
    }
  }, [running]);

  useEffect(() => {
    const interval = setInterval(() => {
      sendMessage(
        JSON.stringify({
          type: 'status',
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center h-screen bg-gray-100 relative w-full">
        <div className="absolute inset-0 w-full h-full z-0">
          <LinePaths y={statusY} running={running} />
        </div>
        <div className="flex flex-col items-center relative z-10 w-full h-full">
          <Status ref={statusRef} running={running} status={status} />
          {running && <Route stops={['Germany', 'Spain']} />}
          <StartButton
            running={running}
            setRunning={setRunning}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
      </div>
    </>
  );
}

export default App;
