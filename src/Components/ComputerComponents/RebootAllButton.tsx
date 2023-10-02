import { useContext, useRef } from "react";
import { AuthState } from "../../Hooks/useAuth";
import { authContext } from "../../Contexts/AuthContext";
import { Tooltip } from "react-tooltip";

export default function RebootAllButton() {
    let disabled = false;
    const { pending, isSignedIn, user, isMCSPlayer }: AuthState = useContext(authContext);
    const buttonRef = useRef<HTMLButtonElement>(null);

    if (!pending && (!isSignedIn || !user || !isMCSPlayer)) {
        disabled = true;
    }

    if (disabled && buttonRef.current) {
        buttonRef.current.style.backgroundColor = "gray"
        buttonRef.current.style.color = "black"
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

const handleClick = () => {
    if (!window.confirm("Are you sure you want to reboot all turtles?"
        + " Turtles will need a good init script on startup to handle something like this.")) return;
}