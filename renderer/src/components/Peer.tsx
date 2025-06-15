import { useStateStore } from '../stores/stateStore';

export const Peer = ({
  type,
  peer
}: {
  type: 'exit' | 'hub' | 'peer';
  peer: string;
}) => {
  const addToRoute = useStateStore(state => state.addToRoute);
  const removeFromRoute = useStateStore(state => state.removeFromRoute);

  const colors = {
    exit: 'text-green-600',
    hub: 'text-green-800',
    peer: 'text-neutral-400',
  };
  return (
    <div className="flex flex-row items-center gap-2 py-2 w-full">
      <img src="/grip.svg" alt="grip" />
      {type === 'exit' && <img src="/exit-green.svg" alt="exit" />}
      {type === 'hub' && <img src="/hub.svg" alt="hub" />}
      {type === 'peer' && <img src="/peer.svg" alt="peer" />}
      <div className={`flex flex-col ${colors[type]} flex-1`}>
        <span className="text-xs uppercase">{type === 'hub' ? 'RELAYER' : type}</span>
        <span className="text-sm font-bold">{peer}</span>
      </div>
      {type === 'hub' && (
        <img
          src="/circle-checked.svg"
          alt="checked"
          className="hover:cursor-pointer"
          onClick={()=> removeFromRoute(peer)}
        />
      )}
      {type === 'peer' && (
        <img
          src="/circle-unchecked.svg"
          alt="checked"
          className="hover:cursor-pointer"
          onClick={()=> addToRoute(peer)}
        />
      )}
    </div>
  );
};
