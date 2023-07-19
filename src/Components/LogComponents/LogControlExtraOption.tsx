import { useEffect, useRef } from "react"
import { LogFilters } from "../../Types/LogFilters"
import { Tooltip } from "react-tooltip"

type Props = {
    logFiltersState: LogFilters
    setLogFiltersState: React.Dispatch<React.SetStateAction<LogFilters>>
    optionName: string
    optionDisplayName: string
    optionDescription: string
}

export default function LogControlExtraOption(
    {logFiltersState, setLogFiltersState, optionName, optionDescription, optionDisplayName}: Props
    ) {
    
    const extraOptionElement = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!extraOptionElement.current) return;
        extraOptionElement.current.checked = (logFiltersState as any)[optionName];

        extraOptionElement.current.onchange = () => {
            if (!extraOptionElement.current) return;
            let newLogFiltersState = {} as any;
            Object.assign(newLogFiltersState, logFiltersState);

            newLogFiltersState[optionName] = extraOptionElement.current.checked;
            setLogFiltersState(newLogFiltersState);
        }
    }, [logFiltersState, setLogFiltersState, optionName])


    return (
        <div id={optionName + "Option"}>
            <input ref={extraOptionElement} type="checkbox" id={optionName}/>
            <label 
                htmlFor={optionName}
                data-tooltip-id={optionName + "|tooltip"}
                data-tooltip-content={optionDescription}
            >{optionDisplayName}</label>
            <Tooltip id={optionName + "|tooltip"}/>
        </div>
    )
}