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
        <>
            <button
                onClick={() => { sendMessage(
                    JSON.stringify({
                        type: 'updateConfigFile',
                        payload: {
                            apiEndpoint: "http://demo-node-1-p2p.demo-nodes.prod.hoprnet.link:3001",
                            apiToken: "DAPPCON_GNOSISVPN_2025"
                        }
                    })
                )}}
            >
                Create Config
            </button>
            <button
                onClick={() => { sendMessage(
                    JSON.stringify({
                        type: 'startVPN',
                    })
                )}}
            >
                Start VPN
            </button>
            <button
                onClick={() => { sendMessage(
                    JSON.stringify({
                        type: 'stopVPN',
                    })
                )}}
            >
                Stop VPN
            </button>
        </>
    )
}

export default Button
