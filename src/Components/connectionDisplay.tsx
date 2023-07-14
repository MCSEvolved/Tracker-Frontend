import { HubConnectionState } from "@microsoft/signalr";

type Props = {
    connectionState: HubConnectionState
}

export default function ConnectionDisplay({ connectionState }: Props) {

    return (
        <div>
            <p>Connection: {connectionState}</p>
        </div>
    )   
}