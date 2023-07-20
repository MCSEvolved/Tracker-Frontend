import { Log } from "../../Types/Log"
import "../../Styles/LogTable.css"
import useLogs from "../../Hooks/useLogs";
import { mapLog } from "../../Utils/logUtils";
import { useEffect } from "react";
import { connectionContext } from "../../Contexts/ConnectionContext";
import { useContext } from "react";
import { LogFilters } from "../../Types/LogFilters";
import LogTableRows from "./LogTableRows";

type Props = {
    logFilters: LogFilters
}

const checkIfLogMatchesFilters = (log: Log, logFilters: LogFilters) => {
    if (!logFilters.types.includes(log.type)) return false;
    if (!logFilters.sources.includes(log.source)) return false;
    if (logFilters.sourceIds.length > 0 && !logFilters.sourceIds.includes(log.sourceId)) return false;
    return true;
}

export default function LogTable({logFilters}: Props) {

    const [logs, logsLoading, setLogs] = useLogs(logFilters);

    const handleNewLog = (data: any) => {
        const log: Log = mapLog(data);

        if (!checkIfLogMatchesFilters(log, logFilters)) return;

        setLogs((prevLogs) => {
            const newLogs = [...prevLogs];
            newLogs.unshift(log);
            return newLogs;
        })
    }

    const { connection } = useContext(connectionContext);
    
    useEffect(() => {
        if (!connection || !logFilters.receiveLiveLogs) return;

        connection.on("NewMessage", handleNewLog);

        return () => {
            connection.off("NewMessage");
        }
    }, [connection])

    if (logsLoading) return <p>Loading logs...</p>

    return (
        <table id="logTable" className="w-full mx-8 mb-8 table-fixed">
            <thead>
                <tr>
                    <th className="w-20">Type</th>
                    <th className="w-20">Time</th>
                    <th className="w-40">Sender</th>
                    <th>Content</th>
                </tr>
            </thead>
            <tbody>
                <LogTableRows 
                    logs={logs}
                />
            </tbody>
        </table>
    )
}