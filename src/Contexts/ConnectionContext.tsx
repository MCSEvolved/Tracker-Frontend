import React, { createContext } from "react";
import { ConnectionState } from "../Types/ConnectionState";
import { HubConnectionState } from "@microsoft/signalr";
import useConnection from "../Hooks/useConnection";

const INITIAL_CONNECTION_STATE: ConnectionState = {
    connection: null,
    status: HubConnectionState.Disconnected,
    setStatus: () => {}
}

export const connectionContext = createContext<ConnectionState>(INITIAL_CONNECTION_STATE);

export const ConnectionContextProvider = ({children}: {children: React.ReactNode}) => {
    const { connection, status, setStatus }: ConnectionState = useConnection();
    return (
        <connectionContext.Provider value={{ connection, status, setStatus } as ConnectionState}>
            {children}
        </connectionContext.Provider>
    )
};

