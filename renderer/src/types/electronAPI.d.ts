declare global {
  interface Window {
    electronAPI: {
      sendMessage: (msg: string) => void;
      onMessage: (handler: (msg: string) => void) => void;
      offMessage: (handler: (msg: string) => void) => void;
    };
  }
}
