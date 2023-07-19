import { LogFilters } from "../../Types/LogFilters"
import LogControlExtraOption from "./LogControlExtraOption"

type Props = {
    logFiltersState: LogFilters
    setLogFiltersState: React.Dispatch<React.SetStateAction<LogFilters>>
}

export default function LogControlExtraOptions({logFiltersState, setLogFiltersState}: Props) {
    return (
        <div id="extraOptions" className="m-8">
            <h2 className="mb-2 text-lg font-bold">Extra Options</h2>
            <LogControlExtraOption
                logFiltersState={logFiltersState}
                setLogFiltersState={setLogFiltersState}
                optionName="receiveLiveLogs"
                optionDisplayName="Receive Live Logs"
                optionDescription="Receive logs as they are created (over ws connection)"
            />
        </div>
    )
}