import useSystems from "../Hooks/useSystems";
import SystemDisplayCard from "./SystemDisplayCard";

export default function SystemList() {
    const [systems, systemsLoading] = useSystems();

    if (systemsLoading) return <p>Loading systems...</p>

    return (
        <div id="systemList" className="flex flex-wrap justify-center basis-96">
            {systems.map(system => (
                <SystemDisplayCard key={system.id} {...system} />
            ))}
        </div>
    )
}