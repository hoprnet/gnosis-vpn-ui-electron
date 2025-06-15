import { useStateStore } from '../stores/stateStore';
import { Peer } from './Peer';

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

  const route = useStateStore(state => state.route);
  const peers = useStateStore(state => state.peers);
  const exit = useStateStore(state => state.exit);

  if (!open) return null;

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
        <h2 className="text-2xl font-bold mb-2">Manage route</h2>
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
        <div className="text-2xl font-bold flex flex-col w-full items-center gap-2 justify-between mt-4 rounded-2xl bg-gray-200/80 p-6 text-left border-1 border-neutral-200">
          <div className="flex flex-row w-full text-sm text-green-800">
            <img
              src="/radio.svg"
              alt="radio icon"
              width={18}
              height={18}
              className="mr-2 text-green-800"
            />
            Active
          </div>

          <div className="flex flex-row w-full justify-between">
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
    </div>
  );
};

export default SmartModeModal;
