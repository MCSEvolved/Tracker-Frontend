import { useNavigate } from "react-router-dom";
import { Computer } from "../../Types/Computer";
import ComputerSearchResultText from "./ComputerSearchResultText";

type Props = {
    computer: Computer;
    setHideResults: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ComputerSearchResult({ computer, setHideResults }: Props) {
    const navigate = useNavigate();

    const handleSearchResultClick = () => {
        setHideResults(true);
        navigate("/computers/id/" + computer.id, { replace: true })
    }

    return (
        <div id="computerDisplay" 
            className="h-16 w-80 mt-2 p-2 text-sm bg-MCS-DarkBlue relative flex
            hover:cursor-pointer hover:bg-MCS-Blue " 
            onClick={handleSearchResultClick}>
            <div className="mr-2">
                <img src="https://placehold.co/50x50?text=icon"></img>
            </div>
            <ComputerSearchResultText label={computer.label} id={computer.id} deviceType={computer.device} />
        </div>
    )
}