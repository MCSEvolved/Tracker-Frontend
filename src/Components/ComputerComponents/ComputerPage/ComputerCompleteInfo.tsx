import { useEffect, useRef } from "react";
import useSystem from "../../../Hooks/useSystem";
import { Computer, DeviceType } from "../../../Types/Computer";
import ComputerFuel from "../ComputerFuel";
import ComputerLocationDisplay from "../ComputerLocationDisplay";

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


        


    return (
        <div id="computerCompleteInfo">
            <h1 className="font-bold text-2xl text-center mb-2">{computer.label}</h1>
            <p>{"Status: " + computer.status}</p>
            {/* @ts-ignore because ts enums are weird */}
            <p>{"Type: " + DeviceType[computer.device]}</p>
            <p>{"Last update: " + (new Date(computer.lastUpdate)).toLocaleString("en-GB")}</p>
            <p ref={systemRef}>System: Loading...</p>
            <p>{"Has modem: " + computer.hasModem}</p>
            <p>{"Computer ID: " + computer.id}</p>
            <p>{"Fuel: " + computer.fuelLevel + "/" + computer.fuelLimit}</p>
            <ComputerFuel fuelLevel={computer.fuelLevel} fuelLimit={computer.fuelLimit} />
            <ComputerLocationDisplay computerId={computer.id} />
        </div>
    )
}