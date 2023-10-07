import ComputerControlButton from "./ComputerControlButton"

type Props = {
    computerID: number
}

export default function ComputerControls({ computerID }: Props) {
    if (!computerID) return null;

    return (
        <div id="ComputerControls" className="mt-2 whitespace-nowrap flex justify-between space-x-3">
            <ComputerControlButton 
                computerID={computerID} 
                displayName="STOP" 
                commandName="STOP" 
                warnMessage="Are you sure you want to stop the turtle? 
                Without a script on startup, the turtle won't be accessible anymore."/>
            <ComputerControlButton 
                computerID={computerID}
                displayName="REBOOT" 
                commandName="REBOOT"
                warnMessage="Are you sure you want to reboot the turtle?
                Without a script on startup, the turtle won't be accessible anymore and will not reboot."/>
        </div>
    )
}