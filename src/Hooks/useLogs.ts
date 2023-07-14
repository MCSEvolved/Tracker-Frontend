import { useEffect, useState } from "react";
import { AuthState, useAuth } from "./useAuth";
import axios from "axios";
import { mapLogs } from "../Utils/logUtils";
import { Log } from "../Types/Log";

export default function useLogs() {

    const { pending, isSignedIn, user }: AuthState = useAuth();

    const [logs, setLogs] = useState<Log[]>([]);
    const [logsLoading, setLogsLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            if (pending || !isSignedIn || !user) return;

            const token = await user.getIdToken();

            const config = {
                headers: { "Authorization": "Bearer " + token }
            }

            const url = import.meta.env.VITE_SERVER_URL + "message/get?" + new URLSearchParams(
                {
                    "page": "1",
                    "pageSize": "100"
                }
            ); 

            axios.get(url, config)
                .then(res => {
                    setLogs(mapLogs(res.data));
                    setLogsLoading(false);
                })
                .catch(err => {
                    console.error(err);
                })
        })();
    }, [pending, isSignedIn, user])

    return [ logs, logsLoading ] as [ Log[], boolean];
}