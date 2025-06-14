// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

console.log('Preload script loaded');

import { contextBridge, ipcRenderer } from 'electron';
import type { IpcRendererEvent } from 'electron';

type MessageHandler = (msg: string) => void;
type IpcMessageHandler = (event: IpcRendererEvent, msg: string) => void;

const listeners = new Set<IpcMessageHandler>();

contextBridge.exposeInMainWorld('electronAPI', {
  onMessage: (callback: MessageHandler) => {
    const handler = (_event: IpcRendererEvent, msg: string) => callback(msg);
    listeners.add(handler);
    ipcRenderer.on('message', handler);
  },
  sendMessage: (msg: string) => ipcRenderer.send('message', msg),
});
