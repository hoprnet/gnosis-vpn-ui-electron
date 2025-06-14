import { Mode } from './Mode';

export const StartButton = ({
  running,
  setRunning,
}: {
  running: boolean;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  function sendMessage(msg: string) {
    window.electronAPI.sendMessage(msg);
    console.log('sendMessage: ', msg);
  }

  const handleClick = () => {
    // if (!running) {
    //   sendMessage(
    //     JSON.stringify({
    //       type: 'startVPN',
    //     })
    //   );
    // } else {
    //   sendMessage(
    //     JSON.stringify({
    //       type: 'stopVPN',
    //     })
    //   );
    // }
    setRunning((running: boolean) => !running);
  };

  return (
    <div className="flex flex-col items-center bg-white rounded-3xl p-6 min-w-xs mt-auto mb-10">
      {running && <Mode />}
      <button
        className="bg-black text-white p-2 font-bold hover:cursor-pointer w-full rounded-3xl"
        onClick={handleClick}
      >
        {running ? 'Stop' : 'Start'}
      </button>
    </div>
  );
};
