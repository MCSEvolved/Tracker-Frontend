import { Route, Routes } from "react-router-dom";
import ComputerSearch from "./ComputerSearch/ComputerSearch";
import SystemList from "./SystemList";
import System from "./System";

export default function ComputerContainer() {
    return (
        <div id="computerContainer">
            <ComputerSearch />
            <Routes>
                <Route path="/" element={<SystemList />} />
                <Route path="/system/:systemId" element={<System />} />
            </Routes>
        </div>
    )
}