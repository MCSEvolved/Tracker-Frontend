import LogContainer from "./LogContainer";
import ConnectionDisplay from "./connectionDisplay";
import { useAuth } from "../Hooks/useAuth";
import useConnection from "../Hooks/useConnection";

export default function App() {
    const { pending, isSignedIn, user } = useAuth();

    const [ connection, connectionState ] = useConnection();

    if (pending) return;

    if (!isSignedIn || !user) {
        return (
            <div>
                <p>This app is not available for you. Please sign in.</p>
            </div>
        )
    }
    
    return (
        <>
            <ConnectionDisplay connectionState={connectionState} />
            <LogContainer connection={connection} />
        </>
    )
}