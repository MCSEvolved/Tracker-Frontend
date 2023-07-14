import LogTable from "./LogTable";
import LogTableControls from "./LogTableControls";
import "../Styles/LogContainer.css"

type Props = {
    connection: signalR.HubConnection | null
}

export default function LogContainer({ connection }: Props) {
    
    return (
        <div id="logContainer" className="test">
            <LogTableControls />
            <LogTable connection={connection}/>
        </div>
    )
}