import { useContext, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { authContext } from "../Contexts/AuthContext";
import { AuthState } from "./useAuth";
import { ConnectionState } from "../Types/ConnectionState";

export default function useConnection() {

    const {pending, isSignedIn, user} : AuthState = useContext(authContext);
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [status, setConnectionStatus] = useState<signalR.HubConnectionState>(signalR.HubConnectionState.Disconnected);


    useEffect(() => {
        (async () => {
            if (pending || !isSignedIn || !user || connection) return;

            const token = await user.getIdToken();

            const url = "https://api.mcsynergy.nl/tracker/ws/client";
            
            const c = new signalR.HubConnectionBuilder()
                .withUrl(url, {
                    accessTokenFactory: () => token
                })
                .configureLogging(signalR.LogLevel.Error)
                .withAutomaticReconnect()
                .build();
                
            setConnection(c);
        })();
    }, [pending, isSignedIn, user]);

    useEffect(() => {
        if (!connection) return;

        connection.onreconnecting(() => {
            setConnectionStatus(signalR.HubConnectionState.Reconnecting);
        });

        connection.onreconnected(() => {
            setConnectionStatus(signalR.HubConnectionState.Connected);
        });

        connection.onclose(() => {
            setConnectionStatus(signalR.HubConnectionState.Disconnected);
        });

        setConnectionStatus(signalR.HubConnectionState.Connecting);
        connection.start()
            .then(() => {
                setConnectionStatus(signalR.HubConnectionState.Connected);
            })
            .catch(err => {
                console.error(err);
            });

        return () => {
            connection.stop();
        }
    }, [connection]);

    return { connection: connection, status: status} as ConnectionState;
}