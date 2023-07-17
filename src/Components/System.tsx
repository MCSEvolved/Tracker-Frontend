import { useParams } from "react-router-dom";
import useSystems from "../Hooks/useSystems";
import { useComputers } from "../Hooks/useComputers";

export default function System() {
    const params = useParams();
    if (!params.systemId) return <div>Invalid system ID</div>

    const [systems, systemLoading] = useSystems(params.systemId);
    const [computers, computersLoading] = useComputers();

    if (systemLoading || computersLoading) return <div>Loading...</div>

    if (!systems[0]) return <div>Invalid system ID</div>

    const system = systems[0];

    return (
        <div>
            <h1>{system.displayName}</h1>
            <h2>Computers</h2>
            <ul>
                {computers.map(computer => {
                    return (
                        <li key={computer.id}>
                            {computer.label}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}