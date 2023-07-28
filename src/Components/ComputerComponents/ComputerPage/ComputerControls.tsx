import ComputerControlButton from "./ComputerControlButton"

type Props = {
    computerID: number
}

export default function ComputerControls({ computerID }: Props) {
    return (
        <div id="ComputerControls" className="mt-2 whitespace-nowrap flex justify-between space-x-3">
            <ComputerControlButton computerID={computerID} displayName="STOP" commandName="STOP" />
            <ComputerControlButton computerID={computerID} displayName="REBOOT" commandName="REBOOT" />
        </div>
    )
}