import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogContainer from "./LogComponents/LogContainer";
import ComputerContainer from "./ComputerContainer";
import Home from "./Home";
import MainContentNavigation from "./MainContentNavigation";

export default function MainContent() {
    return (
        <BrowserRouter basename="/tracker">
            <div id="mainContent" className="mx-16 mt-4 h-full overflow-hidden bg-MCS-DarkerBlue text-MCS-White rounded-2xl">  
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