import { HubConnection, HubConnectionState } from "@microsoft/signalr";

export type ConnectionState = {
    connection: HubConnection | null;
    status: HubConnectionState;
}