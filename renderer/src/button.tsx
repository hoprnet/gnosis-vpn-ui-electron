import { useEffect } from "react";

function Button() {

    const handler = (msg: string) => {
      console.log('Received from main:', msg);
    };

    window.electronAPI.onMessage(handler);

    return (
        <button
            onClick={() => { window.electronAPI.sendMessage('Hello!'); }}
        >
            TEST IPC
        </button>
    )
}

export default Button
