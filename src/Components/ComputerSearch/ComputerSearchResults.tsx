import { Computer } from "../../Types/Computer";
import ComputerSearchResult from "./ComputerSearchResult";

type Props = {
    computers: Computer[] | null;
}

export default function ComputerSearchResults({ computers }: Props) {
    if (!computers) return;

    if (computers.length === 0) return <p>No computers found.</p>


    return (
        <div id="computerSearchList" className="flex flex-col">
            {computers.map(computer => (
                <ComputerSearchResult key={computer.id} {...computer} />
            ))}
        </div>
    )
}
