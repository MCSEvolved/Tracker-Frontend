import { useParams } from "react-router-dom";
import { useComputers } from "../../Hooks/useComputers";
import useSystem from "../../Hooks/useSystem";
import SystemTitle from "./SystemTitle";
import RebootAllButton from "./RebootAllButton";
import ComputerList from "./ComputerList";

export default function System() {
    const params = useParams();
    if (!params.systemId) return <div>Invalid system ID</div>

    const [system, systemLoading] = useSystem(params.systemId);
    const [computers, computersLoading] = useComputers(params.systemId);

    if (systemLoading) return null

    if (!system) return (
        <div className="text-center flex justify-center mt-14 flex-col">
            <h1 className="text-3xl font-bold">{"System " + params.systemId + " could not be found."}</h1>
            <h2 className="text-sm mt-2">Maybe try something else?</h2>
        </div>
    )

    //Computers with "manager" in their display name should be displayed first
    computers.sort((a, b) => {
        if (a.label.toLowerCase().includes("manager") && !b.label.toLowerCase().includes("manager")) return -1;
        if (!a.label.toLowerCase().includes("manager") && b.label.toLowerCase().includes("manager")) return 1;
        return 0;
    })

    const computerIDs = computers.map(computer => computer.id);
    
    return (
        <div id="system">
            <SystemTitle systemName = {system.displayName} />
            <RebootAllButton computerIDs={computerIDs} />
            {computersLoading ? null : <ComputerList computers={computers} />}
        </div>
    )
}