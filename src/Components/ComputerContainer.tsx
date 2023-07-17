import { useComputers } from "../Hooks/useComputers";
import ComputerDisplay from "./ComputerDisplay";
export default function ComputerContainer() {

    const [computers, computersLoading] = useComputers();

    if (computersLoading) return <p>Loading computers...</p>
    
    return (
        <div id="computerContainer" className="flex flex-wrap justify-center">
            {computers.map(computer => (
                <ComputerDisplay {...computer} />
            ))}
        </div>
    )
}