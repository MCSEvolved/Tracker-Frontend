import axios from "axios";
import { AuthState } from "../Hooks/useAuth";

export async function sendCommand(command: string, computerIDs: number[], authState: AuthState) {
    const PARAMS = new URLSearchParams({
        command: command
    })
    
    for (const computerID of computerIDs) {
        PARAMS.append("computerIDs", computerID.toString())
    }

    const URL = import.meta.env.VITE_SERVER_URL + "command/execute?" + PARAMS

    if (authState.pending || !authState.isSignedIn || !authState.isMCSPlayer || !authState.user) {
        return { success: false, message: "Try again when you are ready. Are you not signed in?" };
    };
    const TOKEN = await authState.user.getIdToken()

    const CONFIG = {
        headers: {
            "Authorization": "Bearer " + TOKEN
        }
    }

    const result = await axios.post(URL, null, CONFIG)

    if (result.status !== 200) { 
        console.error(result);
        return { 
            success: false, message: "An error occurred while sending the command. (Status: " + result.status + ")" 
        };
    }
    return { success: true, message: "Command sent successfully."}
}

