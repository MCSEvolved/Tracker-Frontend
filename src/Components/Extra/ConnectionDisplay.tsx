import { HubConnectionState } from "@microsoft/signalr";
import { useRef, useContext} from "react";
import { Tooltip } from "react-tooltip";
import { connectionContext } from "../../Contexts/ConnectionContext";
import { ConnectionState } from "../../Types/ConnectionState";

export default function ConnectionDisplay() {

    const { status }: ConnectionState = useContext(connectionContext);

    const getConnectionColor = (connectionState: HubConnectionState) => {
        switch (connectionState) {
            case HubConnectionState.Connected:
                return "green";
            case HubConnectionState.Connecting:
                return "orange";
            case HubConnectionState.Disconnected:
                return "red";
            case HubConnectionState.Disconnecting:
                return "orange";
            default:
                return "black";
        }
    }

    const getConnectionStateTooltipContent = (connectionState: HubConnectionState) => {
        switch (connectionState) {
            case HubConnectionState.Connected:
                return "Connected to tracker server";
            case HubConnectionState.Connecting:
                return "Connecting to tracker server";
            case HubConnectionState.Disconnected:
                return "Disconnected from tracker server";
            case HubConnectionState.Disconnecting:
                return "Disconnecting from tracker server";
            default:
                return "Unknown connection state";
        }
    }


    const connectionColor = getConnectionColor(status);
    const connectionStateElementRef = useRef<HTMLDivElement>(null);
    if (connectionStateElementRef.current) {
        connectionStateElementRef.current.style.backgroundColor = connectionColor;
    }

    return (
        <>
            <div 
                ref={connectionStateElementRef} 
                className="w-4 h-4 rounded-full absolute ml-8 mt-7"
                data-tooltip-id="connectionStateTooltip"
                data-tooltip-content={getConnectionStateTooltipContent(status)}
            />
            <Tooltip id="connectionStateTooltip" />
        </>
    )
}
