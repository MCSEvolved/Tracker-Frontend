import { useEffect, useRef } from "react"
import { LogFilters } from "../../Types/LogFilters"

type Props = {
    filterOption: string,
    filterName: string,
    logFiltersState: LogFilters,
    setLogFiltersState: React.Dispatch<React.SetStateAction<LogFilters>>
}

const checkIfEnabled = (filterOption: string, filterName: string, logFiltersState: LogFilters) => {
    if ((logFiltersState as any)[filterName].includes(filterOption)) {
        return true
    } else {
        return false
    }
}

export default function LogControlFilterItem({filterOption, filterName, logFiltersState, setLogFiltersState}: Props) {
    const filter = useRef<HTMLInputElement>(null)
    const onFilterChange = () => {
        if (!filter.current) return
        let newFilters = {} as any
        Object.assign(newFilters, logFiltersState)

        if (filter.current.checked) {
            newFilters[filterName].push(filterOption)
        } else {
            newFilters[filterName].splice(newFilters[filterName].indexOf(filterOption), 1)
        }
        
        setLogFiltersState(newFilters)
    }

    useEffect(() => {
        if (!filter.current) return
        filter.current.checked = checkIfEnabled(filterOption, filterName, logFiltersState)
        filter.current.onchange = onFilterChange;
    })

    return (
        <div className="mb-2 flex items-center" id="filter">
            <input ref={filter} type="checkbox" id={filterName + "|" + filterOption}
                className="mr-1 w-5 h-5" />
            <label htmlFor={filterName + "|" + filterOption}>{filterOption}</label>
        </div>
    )
}
