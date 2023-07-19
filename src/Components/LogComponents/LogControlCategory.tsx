import { Tooltip } from "react-tooltip";
import { LogFilters } from "../../Types/LogFilters";
import LogControlFilterItem from "./LogControlFilterItem";

type Props = {
    logFiltersState: LogFilters,
    setLogFiltersState: React.Dispatch<React.SetStateAction<LogFilters>>,
    filterOptions: string[],
    filterName: string,
    filterDisplayName: string,
    filterDescription: string
}

export default function LogControlCategory(
    {logFiltersState, setLogFiltersState, filterOptions, filterName, filterDisplayName, filterDescription}: Props) {

    return (
        <div id="logControlCategory" className="m-8">
            <h2
                className="mb-2 text-lg font-bold"
                data-tooltip-id={"category|" + filterName}
                data-tooltip-content={filterDescription}
            >{filterDisplayName}</h2>
            <Tooltip id={"category|" + filterName}/>
            {filterOptions.map(filterOption => {
                return (
                    <LogControlFilterItem
                        key={"Filter|" + filterName + "|" + filterOption}
                        setLogFiltersState={setLogFiltersState}
                        logFiltersState={logFiltersState}
                        filterName={filterName}
                        filterOption={filterOption}
                    />
                )
            })}
        </div>
    )
}