import { useParams } from "react-router-dom";
import ComputerPageLogs from "./ComputerPageLogs";
import ComputerPageRightPanel from "./ComputerPageRightPanel";

export default function ComputerPage() {
    const params = useParams();
    if (!params.computerId || Number(!params.computerId)) return <div>Invalid computer ID</div>

    const computerID = Number(params.computerId);

    return (
        <div key={computerID} id="computerPage" className="flex justify-between mt-4">
            <ComputerPageLogs computerID={computerID} />
            <ComputerPageRightPanel computerId={computerID} />
        </div>
    )
}