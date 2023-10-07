import { useContext, useEffect, useState } from "react";
import useLogs from "../../../Hooks/useLogs";
import { Log, LogSource, LogType } from "../../../Types/Log";
import { LogFilters } from "../../../Types/LogFilters";
import { checkIfLogMatchesFilters, mapLog } from "../../../Utils/logUtils";
import { connectionContext } from "../../../Contexts/ConnectionContext";
import ComputerPageLogRows from "./ComputerPageLogRows";
import "../../../Styles/ComputerPageLogTable.css"

type Props = {
    computerID: number
}

export default function ComputerPageLogs({ computerID }: Props) {
    const initialLogFilters: LogFilters = {
        types: [LogType.Error, LogType.Warning, LogType.Info, LogType.Debug],
        sources: [LogSource.Service, LogSource.System, LogSource.Computer, LogSource.Turtle, LogSource.Pocket],
        startRange: null,
        endRange: null,
        sourceIds: [computerID.toString()],
        receiveLiveLogs: true
    }

    const [logFilters] = useState<LogFilters>(initialLogFilters);

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

    return (
        <div id="computerPageLogTableContainer" 
            className="bg-MCS-DarkBlue rounded-xl px-2 mx-8 w-full hue-rotate-0 overflow-auto"
            style={{height: "calc(100vh - 256px)"}}
            >
            <table id="computerPageLogTable" className="w-full table-fixed">
                <thead className="bg-MCS-DarkBlue sticky top-0">
                    <tr>
                        <th className="w-20">Type</th>
                        <th className="w-20">Time</th>
                        <th>Content</th>
                    </tr>
                </thead>
                <tbody>
                    <ComputerPageLogRows
                        logs={logs}
                    />
                </tbody>
            </table>
            {logsLoading && <div className="text-center">Loading...</div>}
        </div>
    )
}