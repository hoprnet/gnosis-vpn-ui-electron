export const SmartMode = () => {
  return (
    <div className="smart-mode rounded-2xl p-6 pb-0 w-full mb-4 flex flex-col text-center gap-2 items-center justify-center overflow-clip">
      <img src="/li_sparkles.svg" alt="sparkles icon" width={24} height={24} />
      <div className="text-2xl font-bold">Smart Mode</div>
      <div className="text-sm text-gray-500">
        Automatically optimize your connection based on what you're doing.
      </div>
      <div className="rounded-2xl bg-gray-200/80 p-6 w-full -mb-8 flex flex-col text-left gap-2">
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

        <div className="text-black text-2xl font-bold flex items-center gap-2 justify-between">
          Web3 Privacy
          <img
            src="/chevron-right.svg"
            alt="chevron right icon"
            width={24}
            height={24}
          />
        </div>
      </div>
    </div>
  );
};
