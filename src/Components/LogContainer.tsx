import LogTable from "./LogTable";
import LogTableControls from "./LogTableControls";

type Props = {
    connection: signalR.HubConnection | null
}

export default function LogContainer({ connection }: Props) {
    
    return (
        <div id="logContainer">
            <LogTableControls />
            <LogTable connection={connection}/>
        </div>
    )
}