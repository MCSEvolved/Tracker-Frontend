import { useParams } from "react-router-dom";
import { useComputers } from "../Hooks/useComputers";
import useSystem from "../Hooks/useSystem";
import ComputerDisplay from "./ComputerDisplay";

export default function System() {
    const params = useParams();
    if (!params.systemId) return <div>Invalid system ID</div>

    const [system, systemLoading] = useSystem(params.systemId);
    const [computers, computersLoading] = useComputers(params.systemId);

    if (systemLoading) return <div>Loading system...</div>
    if (computersLoading) return <div>Loading computers...</div>

    if (!system) return <div>Code 404: System not found</div>

    return (
        <div id="system">
            <h1>{system.displayName}</h1>
            <h2>Computers</h2>
            <div className="">
                {computers.map(computer => 
                    <ComputerDisplay key={computer.id} computerId={computer.id} />
                )}
            </div>
        </div>
    )
}