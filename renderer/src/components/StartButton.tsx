import { useState } from 'react';

export const StartButton = () => {
  const [running, setRunning] = useState(false);

  const handleClick = () => {
    setRunning(running => !running);
  };
  return (
    <div className="flex flex-col items-center bg-white rounded-3xl p-6 min-w-xs mt-auto mb-10">
      <button
        className="bg-black text-white p-2 hover:cursor-pointer w-full rounded-3xl"
        onClick={handleClick}
      >
        {running ? 'Stop' : 'Start'}
      </button>
    </div>
  );
};
