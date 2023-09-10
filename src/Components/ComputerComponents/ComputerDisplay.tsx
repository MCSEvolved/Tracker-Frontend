import ComputerFuel from "./ComputerFuel";
import ComputerInfo from "./ComputerInfo";
import { useComputer } from "../../Hooks/useComputer";
import ComputerLocationDisplay from "./ComputerLocationDisplay";
import { Computer } from "../../Types/Computer";
import { useContext, useEffect } from "react";
import { connectionContext } from "../../Contexts/ConnectionContext";
import { useNavigate } from "react-router-dom";


type Props = {
    computerId: number
}

export default function ComputerDisplay({ computerId }: Props) {
    const [computer, computerLoading, setComputer] = useComputer(computerId);

    const handleNewComputer = (computer: Computer) => {
        if (computer.id !== computerId) return;
        setComputer(computer)
    }

    const navigate = useNavigate();

    const onClick = () => {
        navigate("/computers/id/" + computer.id, { replace: true })
    }

    const { connection } = useContext(connectionContext)

    useEffect(() => {
        if (!connection) return;

        connection.on("NewComputer", handleNewComputer);

        return () => {
            connection.off("NewComputer", handleNewComputer);
        }
    }, [connection])

    if (computerLoading) return;


    return (
        <div id="computer" className="w-80 h-32 mx-8 mb-12 rounded-lg bg-MCS-Blue flex hover:cursor-pointer" onClick={onClick}>
            <div className="w-28 h-32 flex justify-center items-center">
                <img className="w-24" src={"/Images/" + computer.device + ".png"} alt="Computer Icon" />
            </div>
            <div className="p-2 ">
                <ComputerInfo computer={computer}/>
                <ComputerLocationDisplay computerId={computer.id} />
                <ComputerFuel fuelLevel={computer.fuelLevel} fuelLimit={computer.fuelLimit} />
            </div>
        </div>
    )
}