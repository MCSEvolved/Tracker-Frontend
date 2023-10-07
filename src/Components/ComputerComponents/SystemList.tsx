import useSystems from "../../Hooks/useSystems";
import SystemDisplayCard from "./SystemDisplayCard";

export default function SystemList() {
    const [systems, systemsLoading] = useSystems();

    console.log(systemsLoading)
    if (systemsLoading) return null;
    console.log(systemsLoading);
    if (systems.length === 0) return (
        <div className="text-center flex justify-center mt-14 flex-col">
            <h1 className="text-3xl font-bold">Could not find any systems</h1>
            <h2 className="text-sm mt-2">While you wait, maybe you could set up a christmas tree!</h2>
        </div>
    )

    return (
        <div id="systemList" 
            className="flex flex-wrap justify-center basis-96 overflow-y-scroll"
            style={{height:"70vh"}}>
            {systems.map(system => (
                <SystemDisplayCard key={system.id} {...system} />
            ))}
        </div>
    )
}