import { useState } from 'react';
import { Status } from './components/Status';

function App() {
  const [running, setRunning] = useState(false);
  const handleClick = () => {
    setRunning(running => !running);
  };

  return (
    <>
      <div className="flex flex-col items-center h-screen">
        <h1 className="text-3xl font-bold text-red-900">Gnosis VPN</h1>
        <Status running={running} />
        <button
          className="bg-black text-blue-400 p-2 rounded-none hover:cursor-pointer"
          onClick={handleClick}
        >
          {running ? 'Stop' : 'Start'}
        </button>
      </div>
    </>
  );
}

export default App;
