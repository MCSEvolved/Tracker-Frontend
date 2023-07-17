import { Computer } from "../../Types/Computer";
import ComputerSearchResultText from "./ComputerSearchResultText";

export default function ComputerSearchResult(computer: Computer) {
    return (
        <div id="computerDisplay" className="h-16 w-80 mt-2 p-2 text-sm bg-MCS-DarkBlue flex" >
            <div className="mr-2">
                <img src="https://placehold.co/50x50?text=icon"></img>
            </div>
            <ComputerSearchResultText label={computer.label} id={computer.id} deviceType={computer.device} />
        </div>
    )
}