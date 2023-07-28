import { RefObject, useEffect, useRef } from "react";
import { Tooltip } from "react-tooltip"

type Props = {
    fuelLevel: number,
    fuelLimit: number
}

export default function ComputerFuel({fuelLevel, fuelLimit }: Props) {

    if (fuelLevel == -1 || fuelLimit == -1) return null;

    const fuelMeterCapacity = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        setFuelMeterCapacity(fuelLevel, fuelLimit, fuelMeterCapacity);
    }, [fuelLevel, fuelLimit, fuelMeterCapacity])

    return (
        <>
            <div
                id="fuelMeter"
                className="h-4 w-40 my-1 bg-MCS-grey"
                data-tooltip-id="fuelTooltip"
                data-tooltip-content={fuelLevel + "/" + fuelLimit}
            >
                <div ref={fuelMeterCapacity} id="fuelMeterCapacity" className="h-4 bg-MCS-LightBlue">

                </div>
            </div>  
            <Tooltip id="fuelTooltip" />
        </>
    )
}

const setFuelMeterCapacity = (fuelLevel: number, fuelLimit: number, fuelMeterCapacity: RefObject<HTMLDivElement>) => {
    if (!fuelMeterCapacity.current) return;
    fuelMeterCapacity.current.style.width = (fuelLevel / fuelLimit * 100) + "%";
    fuelMeterCapacity.current.style.backgroundColor = "rgb(" + (255 - (fuelLevel / fuelLimit * 255)) + ", " + (fuelLevel / fuelLimit * 255) + ", 0)";
}