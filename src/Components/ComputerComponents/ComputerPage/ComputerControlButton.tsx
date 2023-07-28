import axios from "axios"
import { useContext } from "react"
import { AuthState } from "../../../Hooks/useAuth"
import { authContext } from "../../../Contexts/AuthContext"

type Props = {
    computerID: number
    displayName: string
    commandName: string
}

export default function ComputerControlButton({ computerID, displayName, commandName }: Props) {

    const { pending, isSignedIn, user }: AuthState = useContext(authContext)

    const sendCommand = async () => {

        console.log("Sending command")

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

        console.log("waiting...")

        const result = await axios.post(URL, null, CONFIG)

        console.log("done waiting")
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