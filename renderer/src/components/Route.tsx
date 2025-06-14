export const Route = ({ stops }: { stops: string[] }) => {
  const handleManageRoute = () => {
    console.log('manage route');
  };

  return (
    <div className="flex items-center justify-center h-full w-full pt-10 pb-5">
      <div className="relative flex flex-col items-center justify-between  w-full h-full">
        {/* Green vertical bar */}
        <div className="absolute top-1 bottom-0 w-[25px] bg-green-600 rounded-t-md mb-16"></div>

        {/* Exit Stop (First Item) */}
        <div className="grid grid-cols-[1fr_25px_1fr] items-center z-10 w-full gap-2">
          <span className="text-xs font-bold text-gray-400 justify-self-end text-right">
            EXIT
          </span>
          <img
            src="/exit.png"
            alt="exit"
            width={25}
            height={25}
            className="justify-self-center mt-1"
          />
          <span className="font-bold text-green-700 text-lg justify-self-start text-left">
            {stops[0]}
          </span>
        </div>

        {/* Middle Arrow
        <div className="z-10 text-white text-xl mb-16">↑↑</div> */}

        {/* Hub Stops */}
        {stops.slice(1).map(hub => (
          <div
            className="grid grid-cols-[1fr_25px_1fr] items-center z-10 w-full gap-2"
            key={hub}
          >
            <span className="text-xs font-bold text-gray-400 justify-self-end text-right">
              HUB
            </span>
            <img
              src="/hub.png"
              alt="hub"
              width={25}
              height={25}
              className="justify-self-center"
            />
            <span className="font-bold text-green-700 text-lg justify-self-start text-left">
              {hub}
            </span>
          </div>
        ))}

        <button
          className="bg-green-600 text-white px-4 py-2 rounded-r-full rounded-l-full flex items-center gap-2 font-bold text-sm hover:cursor-pointer"
          type="button"
          onClick={handleManageRoute}
        >
          <img src="/route.svg" alt="route" />
          Manage route
        </button>
      </div>
    </div>
  );
};
