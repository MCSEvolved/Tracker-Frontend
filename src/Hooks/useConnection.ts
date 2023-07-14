import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { useAuth } from "./useAuth";

export default function useConnection() {
    const { pending, isSignedIn, user } = useAuth();
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [connectionState, setConnectionState] = useState<signalR.HubConnectionState>(signalR.HubConnectionState.Disconnected);


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
            setConnectionState(signalR.HubConnectionState.Reconnecting);
        });

        connection.onreconnected(() => {
            setConnectionState(signalR.HubConnectionState.Connected);
        });

        connection.onclose(() => {
            setConnectionState(signalR.HubConnectionState.Disconnected);
        });

        console.log("Connecting to websocket");

        connection.start()
            .then(() => {
                setConnectionState(signalR.HubConnectionState.Connected);
            })
            .catch(err => {
                console.error(err);
            });

        return () => {
            connection.stop();
        }
    }, [connection]);

    return [connection, connectionState] as [signalR.HubConnection | null, signalR.HubConnectionState];
}