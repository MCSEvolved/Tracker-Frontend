import { HubConnection, HubConnectionState } from "@microsoft/signalr";

export type ConnectionState = {
    connection: HubConnection | null;
    status: HubConnectionState;
    setStatus: React.Dispatch<React.SetStateAction<HubConnectionState>>;
}