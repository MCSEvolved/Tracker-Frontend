import { useState } from "react";
import { LogFilters } from "../../Types/LogFilters";
import LogTable from "./LogTable";
import { LogSource, LogType } from "../../Types/Log";
import LogTableControlsPopover from "./LogTableControlsPopover";

const INITIAL_LOG_FILTERS: LogFilters = {
    types: [LogType.Error, LogType.Warning, LogType.Info],
    sources: [LogSource.Service, LogSource.System, LogSource.Computer, LogSource.Turtle, LogSource.Pocket],
    startRange: null,
    endRange: null,
    sourceIds: [],
    receiveLiveLogs: true
};

export default function LogContainer() {

    const [logFilters, setLogFilters] = useState<LogFilters>(INITIAL_LOG_FILTERS);

    return (
        <div id="logContainer" className="flex flex-col" >

            <LogTableControlsPopover 
                logFiltersState={logFilters} 
                setLogFiltersState={setLogFilters}
            />
            <div className="flex text-MCS-WhiteBlue overflow-hidden">
                <LogTable logFilters={logFilters} />
            </div>
        </div>
    )
}