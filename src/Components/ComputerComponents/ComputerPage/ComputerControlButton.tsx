import { useContext, useEffect, useRef, useState } from "react"
import { AuthState } from "../../../Hooks/useAuth"
import { authContext } from "../../../Contexts/AuthContext"
import { Tooltip } from "react-tooltip"
import { sendCommand } from "../../../Services/CommandSendingService"

type Props = {
    computerID: number
    displayName: string
    commandName: string
    warnMessage?: string
}

export default function ComputerControlButton({ computerID, displayName, commandName, warnMessage}: Props) {

    const { pending, isSignedIn, user, isMCSPlayer }: AuthState = useContext(authContext)

    const [disabled, setDisabled] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!pending && (!isSignedIn || !user || !isMCSPlayer)) {
            setDisabled(true);
        }
    }, [pending, isSignedIn, user, isMCSPlayer]);

    if (disabled && buttonRef.current) {
        buttonRef.current.style.backgroundColor = "gray"
        buttonRef.current.style.color = "black"
    }

    const handleClick = async () => {
        if (warnMessage && !window.confirm(warnMessage)) {
            return;
        }
        const result = await sendCommand(commandName, [computerID], {pending, isSignedIn, user, isMCSPlayer})
        if (!result.success) {
            alert(result.message)
        }
    }

    return (
        <>
            <button
                disabled={disabled}
                ref={buttonRef}
                data-tooltip-id={commandName + "ButtonTooltip"}
                data-tooltip-content={disabled ? "This feature is disabled, because you're not an MCS player" : 
                " This will perform a " + commandName}
                onClick={handleClick}
                className={"w-full h-8 bg-MCS-LightBlue rounded-lg border-MCS-Black " + (disabled ? "" : "hover:border-2")}
            >{displayName}</button>
            <Tooltip id={commandName + "ButtonTooltip"}
            place="left"/>
        </>
    )
}