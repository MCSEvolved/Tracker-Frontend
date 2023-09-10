import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogContainer from "./LogComponents/LogContainer";
import ComputerContainer from "./ComputerComponents/ComputerContainer";
import Home from "./Home";
import MainContentNavigation from "./MainContentNavigation";
import ConnectionDisplay from "./Extra/ConnectionDisplay";

export default function MainContent() {
    return (
        <BrowserRouter basename="/tracker">
            <div id="mainContent" className="mx-4 mt-4 flex-grow bg-MCS-DarkerBlue text-MCS-White rounded-2xl">
                <ConnectionDisplay />
                <MainContentNavigation />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/logs/*" element={<LogContainer/>} />
                    <Route path="/computers/*" element={<ComputerContainer />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}