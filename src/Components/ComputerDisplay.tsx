import ComputerFuel from "./ComputerFuel";
import ComputerInfo from "./ComputerInfo";
import { useComputer } from "../Hooks/useComputer";
import ComputerLocationDisplay from "./ComputerLocationDisplay";
import { Computer } from "../Types/Computer";
import { useContext, useEffect } from "react";
import { connectionContext } from "../Contexts/ConnectionContext";


type Props = {
    computerId: number
}

export default function ComputerDisplay({ computerId }: Props) {

    const [computer, computerLoading, setComputer] = useComputer(computerId);

    const handleNewComputer = (computer: Computer) => {
        if (computer.id !== computerId) return;
        setComputer(computer)
    }

    const { connection } = useContext(connectionContext)

    useEffect(() => {
        if (!connection) return;

        connection.on("NewLocation", handleNewComputer);

        return () => {
            connection.off("NewLocation", handleNewComputer);
        }
    }, [connection])

    if (computerLoading) return <div>Loading...</div>

    return (
        <div id="computer" className=" w-80 h-32 m-10  bg-MCS-LightBlue flex justify-between">
            <div className="p-6">
                <img src="https://placehold.co/75x75?text=icon" alt="Computer Icon" />
            </div>
            <div className="bg-MCS-WhiteBlue p-2">
                <ComputerInfo computer={computer}/>
                <ComputerLocationDisplay computerId={computer.id} />
                <ComputerFuel />
            </div>
        </div>
    )
}