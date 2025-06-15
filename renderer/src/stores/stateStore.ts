import { create } from 'zustand';
import type { ApiConfig, ConnectionState } from '../types/types';

interface StateStore {
  status: ConnectionState;
  exit: string;
  peers: string[];
  route: string[];
  apiConfig: ApiConfig;
  apiConfigSet: boolean;
  setOffline: () => void;
  setLoading: () => void;
  setError: () => void;
  setConnected: () => void;
  updateConfigFile: (apiEndpoint: string, apiToken: string) => Promise<void>;
  setApiConfig: (apiEndpoint: string, apiToken: string) => void;
  startVPN: () => Promise<void>;
  stopVPN: () => Promise<void>;
  getStatus: () => Promise<void>;
  msgHandler: (msg: string) => void;
}

function sendMessage(msg: string) {
  window.electronAPI.sendMessage(msg);
  console.log('sendMessage: ', msg);
}

export const useStateStore = create<StateStore>(set => ({
  status: 'offline',
  peers: ['Germany', 'Spain', 'Unites States', 'India'],
  route: ['Spain'],
  exit: 'Germany',
  apiConfig: {
    apiEndpoint: 'http://210.10.140.8:3001',
    apiToken: 'DAPPCON_GNOSISVPN_2025',
  },
  apiConfigSet: false,
  setOffline: () => set({ status: 'offline' }),
  setLoading: () => set({ status: 'loading' }),
  setError: () => set({ status: 'error' }),
  setConnected: () => set({ status: 'connected' }),
  updateConfigFile: async (apiEndpoint: string, apiToken: string) => {
    sendMessage(
      JSON.stringify({
        type: 'updateConfigFile',
        payload: {
          apiEndpoint,
          apiToken,
        },
      })
    );
  },
  setApiConfig: (apiEndpoint: string, apiToken: string) => {
    set({ apiConfig: { apiEndpoint, apiToken } });
  },
  startVPN: async () => {
    sendMessage(
      JSON.stringify({
        type: 'startVPN',
      })
    );
  },
  stopVPN: async () => {
    sendMessage(
      JSON.stringify({
        type: 'stopVPN',
      })
    );
  },
  getStatus: async () => {
    sendMessage(
      JSON.stringify({
        type: 'status',
      })
    );
  },
  msgHandler: (msg: string) => {
    try {
      const data = JSON.parse(msg);
      if (data.error) {
        set({ status: 'error' });
      }
      if (data.type === 'startVPNResponse' && data.payload === 'Success') {
        set({ status: 'connected' });
      }
      if (data.type === 'stopVPNResponse' && data.payload === 'Success') {
        set({ status: 'offline' });
      }
      if (
        data.type === 'updateConfigFileResponse' &&
        data.payload === 'Success'
      ) {
        set({ apiConfigSet: true });
      }
    } catch (e) {
      console.error('Failed to parse message:', msg, e);
    }
    console.log('msgHandler: ', msg);
  },
}));
