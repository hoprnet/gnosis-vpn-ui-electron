import React, { useEffect } from 'react';

function Button() {
    useEffect(() => {
        const handler = (msg: string) => {
            console.log('Received from main:', msg);
        };

        window.electronAPI.onMessage(handler);
        console.log("onMessage event handler loaded");

        return () => {
            window.electronAPI.offMessage(handler);
            console.log("onMessage event handler unloaded");
        };
    }, []);

    function sendMessage(msg: string){
        window.electronAPI.sendMessage(msg);
        console.log("sendMessage: ", msg);
    }

    return (
        <button
            onClick={() => { sendMessage('Hello!') }}
        >
            TEST IPC
        </button>
    )
}

export default Button
