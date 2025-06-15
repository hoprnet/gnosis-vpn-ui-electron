import { useState } from 'react';
import { Radio } from './svg/Radio';

const SmartModeModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const handleBack = () => {
    setOpen(false);
  };

  const [choosenMode, setChoosenMode] = useState<number>(0);

  if (!open) return null;

  console.log('smart mode', choosenMode);

  return (
    <div className="fixed inset-0 bg-gray-100 p-6 flex flex-col z-50">
      <button
        className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 hover:bg-gray-200 transition hover:cursor-pointer"
        onClick={handleBack}
        aria-label="Back"
      >
        <img src="/chevron-left.svg" alt="Back" className="w-6 h-6" />
      </button>

      <div className="bg-white rounded-3xl p-6 flex-1">
        <div className="flex text-gray-400 text-xs">Optimizing for</div>

        {choosenMode === 0 && (
          <>
            <div
              onClick={() => setChoosenMode(1)}
              className="text-xl font-bold flex flex-col w-full items-center gap-2 justify-between mt-4 rounded-2xl bg-gray-200/80 p-6 text-left border-1 border-neutral-200 hover:cursor-pointer"
            >
              <div className="flex flex-row w-full text-sm text-green-800">
                <Radio />
                Active
              </div>

              <div className="flex flex-row w-full justify-between">
                Web3 Privacy
                <img
                  src="/chevron-right.svg"
                  alt="chevron right icon"
                  width={24}
                  height={24}
                  className="transform rotate-90"
                />
              </div>
            </div>

            <div
              onClick={() => setChoosenMode(2)}
              className="text-xl font-bold flex flex-col w-full items-center gap-2 justify-between mt-4 rounded-2xl bg-gray-200/80 p-6 text-left border-1 border-neutral-200 hover:cursor-pointer"
            >
              <div className="flex flex-row w-full text-sm text-neutral-500">
                <Radio />
                Inactive
              </div>

              <div className="flex flex-row w-full justify-between">
                Streaming
                <img
                  src="/chevron-right.svg"
                  alt="chevron right icon"
                  width={24}
                  height={24}
                  className="transform rotate-90"
                />
              </div>
            </div>
          </>
        )}

        {choosenMode === 1 && (
          <>
            <div
              onClick={() => setChoosenMode(0)}
              className="flex flex-row w-full justify-between text-2xl font-bold mt-4"
            >
              Web3 Privacy
              <img
                src="/chevron-right.svg"
                alt="chevron right icon"
                width={24}
                height={24}
                className="transform rotate-90"
              />
            </div>

            <div className="flex flex-col w-full gap-2">
              <div className="text-xl font-bold flex flex-col w-full items-center gap-2 justify-between mt-4 rounded-2xl bg-gray-100/80 p-6 text-left border-1 border-neutral-200 hover:cursor-pointer">
                <div className="flex flex-row w-full text-sm text-green-800">
                  <Radio />
                  Active
                </div>

                <div className="flex flex-row w-full justify-between">
                  Terminal wallet
                </div>
              </div>

              <div className="text-xl font-bold flex flex-col w-full items-center gap-2 justify-between mt-4 rounded-2xl bg-gray-100/80 p-6 text-left border-1 border-neutral-200 hover:cursor-pointer">
                <div className="flex flex-row w-full text-sm text-green-800">
                  <Radio />
                  Active
                </div>

                <div className="flex flex-row w-full justify-between">
                  Brave browser
                </div>
              </div>

              <div className="text-xl font-bold flex flex-col w-full items-center gap-2 justify-between mt-4 rounded-2xl bg-gray-100/80 p-6 text-left border-1 border-neutral-200 hover:cursor-pointer">
                <div className="flex flex-row w-full text-sm text-neutral-500">
                  <Radio />
                  Inactive
                </div>

                <div className="flex flex-row w-full justify-between">
                  Tornado cash
                </div>
              </div>
            </div>
          </>
        )}

        {choosenMode === 2 && (
          <>
            <div
              onClick={() => setChoosenMode(0)}
              className="flex flex-row w-full justify-between text-2xl font-bold mt-4"
            >
              Streaming
              <img
                src="/chevron-right.svg"
                alt="chevron right icon"
                width={24}
                height={24}
                className="transform rotate-90"
              />
            </div>

            <div className="flex flex-col w-full gap-2">
              <div className="text-xl font-bold flex flex-col w-full items-center gap-2 justify-between mt-4 rounded-2xl bg-gray-100/80 p-6 text-left border-1 border-neutral-200 hover:cursor-pointer">
                <div className="flex flex-row w-full text-sm text-neutral-500">
                  <Radio />
                  Inactive
                </div>

                <div className="flex flex-row w-full justify-between">
                  Netflix
                </div>
                <div className="text-xs font-bold flex flex-col w-full gap-2 justify-between mt-4 rounded-2xl bg-white p-6 text-left border-1 border-neutral-200">
                  You were watching in India
                  <div className="flex flex-row w-full font-normal text-green-600">
                    <img
                      src="/arrow-up-right.svg"
                      alt="chevron right icon"
                      width={16}
                      height={16}
                    />
                    Change country
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SmartModeModal;
