export {};

declare global {
  interface Window {
    electronAPI: {
      sendMessage: (msg: string) => void;
      onMessage: (callback: (msg: string) => void) => void;
    };
  }
}