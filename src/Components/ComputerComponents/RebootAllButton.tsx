import { useContext, useEffect, useRef, useState } from "react";
import { AuthState } from "../../Hooks/useAuth";
import { authContext } from "../../Contexts/AuthContext";
import { Tooltip } from "react-tooltip";
import { sendCommand } from "../../Services/CommandService";

type Props = {
    computerIDs: number[]
}

export default function RebootAllButton({ computerIDs }: Props) {
    const [ disabled, setDisabled ] = useState(false);
    const { pending, isSignedIn, user, isMCSPlayer }: AuthState = useContext(authContext);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!pending && (!isSignedIn || !user || !isMCSPlayer)) {
            setDisabled(true);
        }
    // DISABLE REBOOT ALL BUTTON FOR NOW
        setDisabled(true);
    }, [pending, isSignedIn, user, isMCSPlayer]);

    if (disabled && buttonRef.current) {
        buttonRef.current.style.backgroundColor = "gray"
        buttonRef.current.style.color = "black"
    }

    const handleClick = async () => {
        if (!window.confirm("Are you sure you want to reboot all turtles?"
            + " Turtles will need a good init script on startup to handle something like this.")) {
            return;
        }
        const result = await sendCommand("REBOOT", computerIDs, { pending, isSignedIn, user, isMCSPlayer })
        if (!result.success) {
            alert(result.message)
        }
    }

    return (
        <>
            <button
                className="bg-MCS-Red text-white rounded-md px-4 py-2 mt-2 absolute right-56 top-44"
                disabled={disabled}
                onClick={handleClick}
                ref={buttonRef}
                data-tooltip-content={disabled ? "This feature is disabled, because you're not an MCS player" 
                : "This will reboot every turtle in this system"}
                data-tooltip-id="rebootAllTooltip"
            >
                ↻ Reboot Turtles
            </button>
            <Tooltip id="rebootAllTooltip" />
        </>
    )
}