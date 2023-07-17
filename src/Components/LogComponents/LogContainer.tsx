import LogTable from "./LogTable";
import LogTableControls from "./LogTableControls";

export default function LogContainer() {
    
    return (
        <div id="logContainer">
            <LogTableControls />
            <LogTable />
        </div>
    )
}