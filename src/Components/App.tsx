import MainContent from "./MainContent";
import { AuthContextProvider } from "../Contexts/AuthContext";
import { ConnectionContextProvider } from "../Contexts/ConnectionContext";

export default function App() {
    return (
        <AuthContextProvider>
            <ConnectionContextProvider>
                <MainContent />
            </ConnectionContextProvider>
        </AuthContextProvider>
    )
}