import { create } from 'zustand';
import type { ConnectionState } from '../types/types';

interface StateStore {
  status: ConnectionState;
  exit: string;
  peers: string[];
  route: string[];
  setOffline: () => void;
  setLoading: () => void;
  setError: () => void;
  setConnected: () => void;
  updateConfigFile: (apiEndpoint: string, apiToken: string) => Promise<void>;
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
    } catch (e) {
      console.error('Failed to parse message:', msg, e);
    }
    console.log('msgHandler: ', msg);
  },
}));
