import { createContext } from "react";
import { ConnectionState } from "../Types/ConnectionState";
import { HubConnectionState } from "@microsoft/signalr";
import useConnection from "../Hooks/useConnection";

const INITIAL_CONNECTION_STATE: ConnectionState = {
    connection: null,
    status: HubConnectionState.Disconnected
}

const connectionContext = createContext<ConnectionState>(INITIAL_CONNECTION_STATE);

const ConnectionContextProvider = ({children}: {children: React.ReactNode}) => {
    const { connection, status }: ConnectionState = useConnection();
    return (
        <connectionContext.Provider value={{ connection, status } as ConnectionState}>
            {children}
        </connectionContext.Provider>
    )
};

export { connectionContext, ConnectionContextProvider };


