import { useContext, useEffect, useRef } from "react";
import { ConnectionState } from "../../Types/ConnectionState";
import { connectionContext } from "../../Contexts/ConnectionContext";
import { HubConnectionState } from "@microsoft/signalr";

export default function ConnectionStateButton() {
    const { connection, status, setStatus }: ConnectionState = useContext(connectionContext);

    const button = useRef<HTMLButtonElement>(null);

    const onClick = () => {
        if (!connection) return;

        switch (connection.state) {
            case HubConnectionState.Connected:
                connection.stop();
                break;
            case HubConnectionState.Disconnected:
                setStatus(HubConnectionState.Connecting)
                connection.start().then(() => {
                    setStatus(HubConnectionState.Connected);
                }).catch((error) => {
                    console.error(error);
                });
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        if (!button.current || !connection) return;

        switch (connection.state) {
            case HubConnectionState.Connected:
                button.current.disabled = false;
                button.current.style.backgroundColor = "Red";
                button.current.textContent = "Disconnect";
                break;
            case HubConnectionState.Connecting:
                button.current.disabled = true;
                break;
            case HubConnectionState.Disconnected:
                button.current.disabled = false;
                button.current.style.backgroundColor = "Green";
                button.current.textContent = "Connect";
                break;
            case HubConnectionState.Disconnecting:
                button.current.disabled = true;
                break;
            default:
                break;
        }

    }, [connection, status])
        

    return (
        <button 
            id="connectionStateButton" 
            ref={button} 
            className="w-28 h-8 rounded-md"
            onClick={onClick}
        />
    )
}