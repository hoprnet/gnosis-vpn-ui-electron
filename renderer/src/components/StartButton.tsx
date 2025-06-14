export const StartButton = ({
  running,
  setRunning,
}: {
  running: boolean;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleClick = () => {
    setRunning((running: boolean) => !running);
  };
  return (
    <div className="flex flex-col items-center bg-white rounded-3xl p-6 min-w-xs mt-auto mb-10">
      <button
        className="bg-black text-white p-2 font-bold hover:cursor-pointer w-full rounded-3xl"
        onClick={handleClick}
      >
        {running ? 'Stop' : 'Start'}
      </button>
    </div>
  );
};
