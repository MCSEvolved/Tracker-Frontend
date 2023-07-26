import { Tooltip } from "react-tooltip"
import "../../Styles/ComputerFuel.css"

type Props = {
    fuelLevel: number,
    fuelLimit: number
}

export default function ComputerFuel({ fuelLevel, fuelLimit }: Props) {

    if (fuelLevel == -1 || fuelLimit == -1) return null;

    return (
        <>
            <div
                className="h-4 w-28 my-1 fuelmeter"
                data-tooltip-id="fuelTooltip"
                data-tooltip-content={fuelLevel + "/" + fuelLimit}
            ></div>
            <Tooltip id="fuelTooltip" />
        </>
    )
}