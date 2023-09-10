import { useParams } from "react-router-dom";
import { useComputers } from "../../Hooks/useComputers";
import useSystem from "../../Hooks/useSystem";
import ComputerDisplay from "./ComputerDisplay";
import SystemTitle from "./SystemTitle";

export default function System() {
    const params = useParams();
    if (!params.systemId) return <div>Invalid system ID</div>

    const [system, systemLoading] = useSystem(params.systemId);
    const [computers, computersLoading] = useComputers(params.systemId);

    if (systemLoading) return <div>Loading system...</div>
    if (computersLoading) return <div>Loading computers...</div>

    if (!system) return <div>Code 404: System not found</div>

    //Computers with "manager" in their display name should be displayed first
    computers.sort((a, b) => {
        if (a.label.toLowerCase().includes("manager") && !b.label.toLowerCase().includes("manager")) return -1;
        if (!a.label.toLowerCase().includes("manager") && b.label.toLowerCase().includes("manager")) return 1;
        return 0;
    })
    
    return (
        <div id="system">
            <SystemTitle systemName = {system.displayName} />
            <div className="flex flex-wrap justify-center basis-0 mt-6">
                {computers.map(computer => 
                    <ComputerDisplay key={computer.id} computerId={computer.id} />
                )}
            </div>
        </div>
    )
}