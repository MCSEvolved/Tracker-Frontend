import { useEffect, useState } from "react";
import { AuthState } from "./useAuth";
import axios from "axios";
import { mapLogs } from "../Utils/logUtils";
import { Log } from "../Types/Log";
import { authContext } from "../Contexts/AuthContext";
import { useContext } from "react";
import { LogFilters } from "../Types/LogFilters";

export default function useLogs(logFilters: LogFilters) {
    const { pending, isSignedIn, user }: AuthState = useContext(authContext);

    const [logs, setLogs] = useState<Log[]>([]);
    const [logsLoading, setLogsLoading] = useState<boolean>(true);

    const url = createURL(logFilters);
    useEffect(() => {
        (async () => {
            if (pending || !isSignedIn || !user) return;


            const token = await user.getIdToken();

            const config = {
                headers: { "Authorization": "Bearer " + token }
            }

            axios.get(url, config)
                .then(res => {
                    setLogs(mapLogs(res.data));
                    setLogsLoading(false);
                })
                .catch(err => {
                    setLogsLoading(false);
                    console.error(err);
                })
        })();
    }, [pending, isSignedIn, user, logFilters])

    return [ logs, logsLoading, setLogs ] as [ Log[], boolean, React.Dispatch<React.SetStateAction<Log[]>>];
}

const createURL = (logFilters: LogFilters) => {
    const urlSearchParams = new URLSearchParams();
    if (logFilters.types.length > 0) {
        for (const type of logFilters.types) {
            urlSearchParams.append("types", type);
        }
    }

    if (logFilters.sources.length > 0) {
        for (const source of logFilters.sources) {
            urlSearchParams.append("sources", source);
        }
    }

    if (logFilters.startRange) {
        urlSearchParams.append("beginRange", logFilters.startRange.getTime().toString());
    }

    if (logFilters.endRange) {
        urlSearchParams.append("endRange", logFilters.endRange.getTime().toString());
    }

    if (logFilters.sourceIds.length > 0) {
        for (const sourceId of logFilters.sourceIds) {
            urlSearchParams.append("sourceIds", sourceId);
        }
    }

    urlSearchParams.append("page", "1");
    urlSearchParams.append("pageSize", "100");

    const url = import.meta.env.VITE_SERVER_URL + "message/get?" + urlSearchParams;

    return url;
}