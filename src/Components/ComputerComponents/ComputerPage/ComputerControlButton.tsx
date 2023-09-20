import axios from "axios"
import { useContext } from "react"
import { AuthState } from "../../../Hooks/useAuth"
import { authContext } from "../../../Contexts/AuthContext"

type Props = {
    computerID: number
    displayName: string
    commandName: string
    warnMessage?: string
}

export default function ComputerControlButton({ computerID, displayName, commandName, warnUser, warnMessage}: Props) {

    const { pending, isSignedIn, user }: AuthState = useContext(authContext)

    const sendCommand = async () => {
        if (warnMessage != null && !window.confirm(warnMessage)) return;

        const PARAMS = new URLSearchParams({
            computerId: computerID.toString(),
            command: commandName
        })

        const URL = import.meta.env.VITE_SERVER_URL + "command/execute?" + PARAMS

        if (pending || !isSignedIn || !user) return;

        const TOKEN = await user.getIdToken()

        const CONFIG = {
            headers: {
                "Authorization": "Bearer " + TOKEN
            }
        }

        const result = await axios.post(URL, null, CONFIG)

        if (result.status !== 200) {
            console.error(result)
        }
    }

    return (
        <button
            onClick={sendCommand}
            className="w-full h-8 bg-MCS-LightBlue rounded-lg hover:border-2 border-MCS-Black"
        >{displayName}</button>
    )
}