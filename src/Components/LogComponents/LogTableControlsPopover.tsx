import { Popover } from "@headlessui/react";
import LogTableControls from "./LogTableControls";
import { LogFilters } from "../../Types/LogFilters";

type Props = {
    logFiltersState: LogFilters
    setLogFiltersState: React.Dispatch<React.SetStateAction<LogFilters>>
}

export default function LogTableControlsPopover({logFiltersState, setLogFiltersState}: Props) {
    return (
        <Popover className="relative mb-2">
            <Popover.Button className="bg-MCS-Blue w-28 h-8 rounded-md ml-8">Settings</Popover.Button>

            <Popover.Panel className="absolute mt-1 flex justify-center w-full">
                <LogTableControls logFiltersState={logFiltersState} setLogFiltersState={setLogFiltersState}></LogTableControls>
            </Popover.Panel>
        </Popover>    

    )
}