import LogControlCategory from "./LogControlCategory";
import { LogFilters } from "../../Types/LogFilters";
import LogControlExtraOptions from "./LogControlExtraOptions";
import SourceIDSearchBar from "../SourceIDSearch/SourceIDSearchBar";

type Props = {
    logFiltersState: LogFilters
    setLogFiltersState: React.Dispatch<React.SetStateAction<LogFilters>>
}

export default function LogTableControls({logFiltersState, setLogFiltersState}: Props) {
    return (
        <div id="logTableControls" 
            className="flex justify-center h-96 w-5/6 bg-MCS-grey rounded-3xl" >
            <LogControlCategory 
                logFiltersState={logFiltersState}
                setLogFiltersState={setLogFiltersState}
                filterOptions={["Error", "Warning", "Info", "Debug"]}
                filterName="types"
                filterDisplayName="Types" 
                filterDescription="The type of log message"
            />
            <LogControlCategory
                logFiltersState={logFiltersState}
                setLogFiltersState={setLogFiltersState}
                filterOptions={[ "Service", "System", "Computer", "Turtle", "Pocket" ]}
                filterName="sources"
                filterDisplayName="Sources"
                filterDescription="The source of the log message"
            />
            <LogControlExtraOptions 
                logFiltersState={logFiltersState}
                setLogFiltersState={setLogFiltersState}
            />
            <SourceIDSearchBar />
        </div>
    )
}