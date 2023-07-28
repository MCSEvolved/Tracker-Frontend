import { Computer } from "../../Types/Computer";
import ComputerSearchResult from "./ComputerSearchResult";

type Props = {
    computers: Computer[] | null;
    setHideResults: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ComputerSearchResults({ computers, setHideResults }: Props) {
    if (!computers) return;

    if (computers.length === 0) return <p>No computers found.</p>


    return (
        <div id="computerSearchList" 
            className="flex flex-col mt-8 bg-MCS-LightBlue w-96 items-center rounded-xl z-20 absolute overflow-auto"
            style={{height: "calc(100vh - 256px)"}}>
            {computers.map(computer => (
                <ComputerSearchResult key={computer.id} computer={computer} setHideResults={setHideResults} />
            ))}
        </div>
    )
}
