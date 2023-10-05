import { RefObject, useEffect, useRef } from "react";
import useSystem from "../../../Hooks/useSystem";
import { Computer, DeviceType } from "../../../Types/Computer";
import ComputerFuel from "../ComputerFuel";
import ComputerLocationDisplay from "../ComputerLocationDisplay";
import { Tooltip } from "react-tooltip";

type Props = {
    computer: Computer
}

export default function ComputerCompleteInfo({ computer }: Props) {
    const systemRef = useRef<HTMLParagraphElement>(null);

    const [system, systemLoading] =  useSystem(computer.systemId)

    useEffect(() => {
        if (!systemRef.current) return;
        if (computer.systemId == 0) {
            systemRef.current.textContent = "System: None";
            return;
        }
        if (systemLoading) {
            systemRef.current.textContent = "System: Loading...";
            return;
        }
        if (!system) {
            systemRef.current.textContent = "System: Not found";
            return;
        }
        systemRef.current.textContent = "System: " + system.displayName;
    }, [system, systemLoading])

    const labelElement = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (isMoreThanFiveSecondsAgo(computer.lastUpdate) || computer.status === "Error") {
            setLabelColor(labelElement, "red");
        }
        else if (computer.status === "Need Player" ||
            computer.status === "Manually Terminated" ||
            computer.status === "Stopped" ||
            computer.status === "Rebooting") {
            setLabelColor(labelElement, "orange");
        }
        else {
            setLabelColor(labelElement, "white");
        }

        // If component is not rerenderd in 5 seconds, set label color to red
        const timeOut = setTimeout(() => {
            if (!labelElement.current) return;
            setLabelColor(labelElement, "red");
        }, 5000)

        return () => {
            clearTimeout(timeOut);
        }
    }, [computer])

    const getComputerStateTooltipContent = () => {
        if (computer.status === "Error") return "Computer is in error state";
        if (isMoreThanFiveSecondsAgo(computer.lastUpdate)) return "Last heartbeat was more than 5 seconds ago";
        if (computer.status === "Need Player") return "Computer is waiting for player assistance";
        if (computer.status === "Manually Terminated") return "Computer was manually terminated";
        if (computer.status === "Stopped") return "Computer was stopped by tracker command";
        if (computer.status === "Rebooting") return "Computer is rebooting";
        return "Computer is online";
    }

    return (
        <div id="computerCompleteInfo">
            <h1 className="font-bold text-2xl text-center mb-2"
                ref={labelElement}
                data-tooltip-id="computerStateTooltip"
                data-tooltip-content={getComputerStateTooltipContent()}
            >{computer.label}</h1>
            <p>{"Status: " + computer.status}</p>
            {/* @ts-ignore because ts enums are weird */}
            <p>{"Type: " + DeviceType[computer.device]}</p>
            <p>{"Last update: " + (new Date(computer.lastUpdate)).toLocaleString("en-GB")}</p>
            <p ref={systemRef}>System: Loading...</p>
            <p>{"Has modem: " + computer.hasModem}</p>
            <p>{"Computer ID: " + computer.id}</p>
            {computer.fuelLevel && computer.fuelLimit ? <p>{ "Fuel: " + computer.fuelLevel + "/" + computer.fuelLimit}</p> : null}
            <ComputerFuel fuelLevel={computer.fuelLevel} fuelLimit={computer.fuelLimit} />
            <ComputerLocationDisplay computerId={computer.id} />
            <Tooltip id="computerStateTooltip" />
        </div>
    )
}

const setLabelColor = (labelElement: RefObject<HTMLParagraphElement>, color: string) => {
    if (!labelElement.current) return;

    labelElement.current.style.color = color;
}

const isMoreThanFiveSecondsAgo = (lastUpdate: number) => {
    const difference = (new Date()).getTime() - lastUpdate;
    return difference > 5000;
}