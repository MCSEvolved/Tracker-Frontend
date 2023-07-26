import { Tooltip } from "react-tooltip";
import { Computer } from "../../Types/Computer";
import { useRef } from "react";

type Props = {
    computer: Computer
}

export default function computerInfo({ computer }: Props) {
    const labelElement = useRef<HTMLParagraphElement>(null);

    if (isLastUpdateMoreThanTwoSecondsAgo(computer.lastUpdate) && labelElement.current) {
        labelElement.current.style.color = "red";
    }

    return (
        <div id="computerInfo">
            <p
                ref={labelElement}
                className="overflow-ellipsis overflow-hidden whitespace-nowrap"
            >{computer.label}</p>

            <p 
                className="text-sm"
            >{"Status: " + computer.status}</p>

            <p 
                className="text-sm"
                data-tooltip-id="lastUpdateTooltip"
                data-tooltip-content={(new Date(computer.lastUpdate)).toLocaleString("en-GB")}
            >{"Last update: " + (new Date(computer.lastUpdate)).toLocaleTimeString("it-IT")}</p>
            <Tooltip id="lastUpdateTooltip" />
        </div>
    )
}

const isLastUpdateMoreThanTwoSecondsAgo = (lastUpdate: number) => {
    const difference = (new Date()).getTime() - lastUpdate;
    return difference > 2000;
}