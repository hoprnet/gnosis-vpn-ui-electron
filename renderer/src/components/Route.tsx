import { useState } from 'react';
import ManageRouteModal from './ManageRoute';
import { useStateStore } from '../stores/stateStore';
import { colors } from '../const/colors';

export const Route = () => {
  const [open, setOpen] = useState(false);
  const status = useStateStore(state => state.status);

  const exit = useStateStore(state => state.exit);
  const route = useStateStore(state => state.route);

  const handleManageRoute = () => {
    setOpen(true);
  };

  if (status === 'offline') return null;

  if (status === 'connected') {
    return (
      <div className="flex items-center justify-center h-full w-full pt-10 pb-5">
        <div className="relative flex flex-col items-center justify-between  w-full h-full">
          {/* Green vertical bar */}
          <div className="absolute top-1 bottom-0 w-[25px] bg-green-600 rounded-t-md mb-16"></div>

          {/* Exit */}
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
              {exit}
            </span>
          </div>

          {/* Middle Arrow
        <div className="z-10 text-white text-xl mb-16">↑↑</div> */}

          {/* Route Stops */}
          {route.map(hub => (
            <div
              className="grid grid-cols-[1fr_25px_1fr] items-center z-10 w-full gap-2"
              key={hub}
            >
              <span className="text-xs font-bold text-gray-400 justify-self-end text-right">
                RELAYER
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
            className="bg-gradient-to-b from-green-600 to-[#083D1C] text-white px-4 py-2 rounded-r-full rounded-l-full flex items-center gap-2 font-bold text-sm hover:cursor-pointer"
            type="button"
            onClick={handleManageRoute}
          >
            <img src="/route.svg" alt="route" />
            Manage route
          </button>
        </div>

        <ManageRouteModal open={open} setOpen={setOpen} />
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-full w-full pt-10 pb-5">
        <div className="relative flex flex-col items-center justify-between  w-full h-full">
          {/* vertical bar */}
          <div
            className={`absolute top-1 bottom-0 w-[25px] ${colors.loading.bg} rounded-t-md mb-0`}
          ></div>

          {/* Exit */}
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
            <span
              className={`font-bold ${colors.offline.text} text-lg justify-self-start h-5 text-left animate-pulse `}
            >
              <div className={`bg-gray-300 h-5 rounded-full w-[60px]`}></div>{' '}
            </span>
          </div>

          {/* Middle Arrow
        <div className="z-10 text-white text-xl mb-16">↑↑</div> */}

          {/* Route Stops */}
          {route.map(hub => (
            <div
              className="grid grid-cols-[1fr_25px_1fr] items-center z-10 w-full gap-2"
              key={hub}
            >
              <span className="text-xs font-bold text-gray-400 justify-self-end text-right">
                RELAYER
              </span>
              <img
                src="/hub.png"
                alt="hub"
                width={25}
                height={25}
                className="justify-self-center"
              />
              <span
                className={`font-bold text-lg justify-self-start h-5 text-left animate-pulse `}
              >
                <div className={`bg-gray-300 h-5 rounded-full w-[60px]`}></div>{' '}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex items-center justify-center h-full w-full pt-40 pb-0">
        <div className="relative flex flex-col items-center justify-between  w-full h-full">
          {/* vertical bar */}
          <div
            className={`absolute top-10 bottom-0 w-[25px] ${colors.error.bg} rounded-t-full mb-0`}
          ></div>

          <div className="items-center z-10 w-full gap-2">
            <img
              src="/error.svg"
              alt="error"
              width={22}
              height={22}
              className="justify-self-center mt-1"
            />
          </div>
        </div>
      </div>
    );
  }

  // if (status === 'quitting') {
  //   return (
  //     <div className="flex items-center justify-center h-full w-full pt-10 pb-0">
  //       <div className="relative flex flex-col items-center justify-between  w-full h-full">
  //         {/* vertical bar */}
  //         <div
  //           className={`absolute top-10 bottom-0 w-[25px] ${colors.quitting.bg} rounded-t-full mb-0 animate-pulse`}
  //         ></div>
  //       </div>
  //     </div>
  //   );
  // }
};
