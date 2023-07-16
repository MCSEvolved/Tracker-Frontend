import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogContainer from "./LogContainer";
import ComputerContainer from "./ComputerContainer";
import Home from "./Home";
import MainContentNavigation from "./MainContentNavigation";

type Props = {
    connection: signalR.HubConnection | null
}

export default function MainContent({connection}: Props) {

    return (
        <BrowserRouter basename="/tracker">
            <div id="mainContent" className="mx-16 mt-4 bg-MCS-DarkerBlue text-MCS-White rounded-2xl">  
                <MainContentNavigation />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/logs" element={<LogContainer connection={connection}/>} />
                    <Route path="/computers" element={<ComputerContainer />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}