import { useStateStore } from '../stores/stateStore';
import { Peer } from './Peer';

const ManageRouteModal = ({
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
        <p className="text-gray-500 mb-6">
          Customize your route by selecting which countries your traffic passes
          through.
        </p>

        <Peer type="exit" peer={exit}/>

        {/* Description Note */}
        <p className="text-sm text-gray-400 mt-6">
          Your{' '}RELAYER
          <span className="text-green-700 inline-flex items-center gap-2 align-middle text-xs">
            <img src="/exit-small.svg" alt="exit" className="align-middle" />{' '}
            EXIT
          </span>{' '}
          country is where websites see you connecting from.{' '}
          <span className="text-green-700 inline-flex items-center gap-2 align-middle text-xs">
            <img src="/hub-small.svg" alt="hub" className="align-middle" /> RELAYER
          </span>{' '}
          countries add privacy layers.
        </p>

        {route.map(hub => (
          <Peer type="hub" peer={hub} key={hub} />
        ))}
        {peers.map(peer => {
          if (route.includes(peer)) return null;
          return <Peer type="peer" peer={peer} key={peer} />;
        })}
      </div>
    </div>
  );
};

export default ManageRouteModal;
