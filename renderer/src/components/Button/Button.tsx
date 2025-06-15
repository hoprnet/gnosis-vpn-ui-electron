import { Mode } from './Mode';
import { useStateStore } from '../../stores/stateStore';
import type { ConnectionState } from '../../types/types';
import { Error } from './Error';
import { SmartMode } from './SmartMode';

const getText = (status: ConnectionState) => {
  switch (status) {
    case 'offline':
      return 'Start';
    case 'connected':
      return 'Stop';
    case 'loading':
      return 'Cancel';
    case 'error':
      return 'Refresh';
  }
};

export const StartButton = () => {
  const status = useStateStore(state => state.status);
  const startVPN = useStateStore(state => state.startVPN);
  const stopVPN = useStateStore(state => state.stopVPN);
  const setLoading = useStateStore(state => state.setLoading);
  const setOffline = useStateStore(state => state.setOffline);

  const handleClick = () => {
    switch (status) {
      case 'offline':
        setLoading();
        startVPN();
        break;
      case 'connected':
        setLoading();
        stopVPN();
        break;
      case 'error':
        setLoading();
        startVPN();
        break;
      case 'loading':
        stopVPN();
        setOffline();
        break;
    }
  };

  return (
    <div className="flex flex-col items-center bg-gradient rounded-3xl p-6 min-w-xs mt-auto mb-10">
      {status === 'offline' && <SmartMode />}
      {(status === 'connected' || status === 'loading') && <Mode />}
      {status === 'error' && <Error />}
      <button
        className="button-gradient text-white p-2 font-bold hover:cursor-pointer w-full rounded-3xl"
        onClick={handleClick}
      >
        {getText(status)}
      </button>
    </div>
  );
};
