import { Tooltip } from "react-tooltip";
import { Computer } from "../../Types/Computer";
import { RefObject, useEffect, useRef } from "react";

type Props = {
    computer: Computer
}

export default function computerInfo({ computer }: Props) {
    const labelElement = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (isMoreThanFiveSecondsAgo(computer.lastUpdate) || computer.status === "Error") {
            setLabelColor(labelElement, "red");
        }
        else if (computer.status === "Need Player" || 
            computer.status === "Manually Terminated" ||
            computer.status === "Stopped" ||
            computer.status === "Rebooting" ) {
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
        <div id="computerInfo">
            <p
                ref={labelElement}
                className="overflow-ellipsis overflow-hidden whitespace-nowrap"
                data-tooltip-id="computerStateTooltip"
                data-tooltip-content={getComputerStateTooltipContent()}
            >{computer.label}</p>

            <p 
                className="text-sm"
            >{"Status: " + computer.status}</p>

            <p 
                className="text-sm"
                data-tooltip-id="lastUpdateTooltip"
                data-tooltip-content={(new Date(computer.lastUpdate)).toLocaleString("en-GB")}
            >{"Last update: " + (new Date(computer.lastUpdate)).toLocaleTimeString("it-IT")}</p>
            <Tooltip id="computerStateTooltip" />
            <Tooltip id="lastUpdateTooltip" />
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