import { useContext, useEffect } from "react";
import { connectionContext } from "../../../Contexts/ConnectionContext";
import { useComputer } from "../../../Hooks/useComputer";
import { Computer } from "../../../Types/Computer";
import ComputerCompleteInfo from "./ComputerCompleteInfo";
import ComputerControls from "./ComputerControls";

type Props = {
    computerId: number
}

export default function ComputerPageRightPanel({ computerId }: Props) {
    const [computer, computerLoading, setComputer] = useComputer(computerId);

    const handleNewComputer = (computer: Computer) => {
        if (computer.id !== computerId) return;
        setComputer(computer)
    }

    const { connection } = useContext(connectionContext)

    useEffect(() => {
        if (!connection) return;

        connection.on("NewComputer", handleNewComputer);

        return () => {
            connection.off("NewComputer", handleNewComputer);
        }
    }, [connection])

    if (computerLoading) return null;
    if (!computer) return <div className="my-5 text-center">Code 404: Computer not found</div>

    return (
        <div id="computerPageRightPanel" className="mr-8" style={{width: "512px"}}>
            <ComputerCompleteInfo computer={computer} />
            <ComputerControls computerID={computer.id} />
        </div>
    )
}