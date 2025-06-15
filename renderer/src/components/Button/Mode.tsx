import { useStateStore } from '../../stores/stateStore';

export const Mode = () => {
  const status = useStateStore(state => state.status);

  return (
    <div className="rounded-2xl bg-gray-100 p-6 w-full mb-4 flex flex-col text-left gap-2 border-1 border-neutral-200">
      <div className="flex text-gray-400 text-xs">
        <img
          src="/li_sparkles.svg"
          alt="sparkles icon"
          width={16}
          height={17}
          className="mr-2"
        />
        Optimizing for
      </div>
      {status === 'loading' ? (
        <div className="animate-pulse flex items-center gap-2 justify-between">
          <div className="bg-gray-300 h-8 w-full rounded"></div>
        </div>
      ) : (
        <div className="text-black text-2xl font-bold flex items-center gap-2 justify-between">
          Web3 Privacy
          <button className="hover:cursor-pointer">
            <img
              src="/chevron-right.svg"
              alt="chevron right icon"
              width={24}
              height={24}
            />
          </button>
        </div>
      )}
    </div>
  );
};
