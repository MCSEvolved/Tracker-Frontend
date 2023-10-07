import { Log } from "../../Types/Log"
import "../../Styles/LogTable.css"
import useLogs from "../../Hooks/useLogs";
import { checkIfLogMatchesFilters, mapLog } from "../../Utils/logUtils";
import { useEffect } from "react";
import { connectionContext } from "../../Contexts/ConnectionContext";
import { useContext } from "react";
import { LogFilters } from "../../Types/LogFilters";
import LogTableRows from "./LogTableRows";

type Props = {
    logFilters: LogFilters
}

export default function LogTable({logFilters}: Props) {

    // _ is a placeholder for the logs loading state which we don't need
    const [logs, _, setLogs] = useLogs(logFilters);

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

    return (
        <table id="logTable" className="w-full h-64 mx-8 mb-8 ">
            <thead className="sticky top-0 bg-MCS-DarkerBlue">
                <tr>
                    <th className="w-20 ">Type</th>
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