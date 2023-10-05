import { Route, Routes, useParams } from "react-router-dom";
import ComputerSearch from "../ComputerSearch/ComputerSearch";
import SystemList from "../ComputerComponents/SystemList"
import System from "../ComputerComponents/System";
import ComputerPage from "./ComputerPage/ComputerPage";

export default function ComputerContainer() {
    const params = useParams()

    return (
        <div id="computerContainer" className="">
            <ComputerSearch />
            <Routes>
                {/* Route /tracker/computers/ */}
                <Route path="/*" element={<SystemList />} />
                <Route path="/id/:computerId" element={<ComputerPage key={params.computerId}/> } />
                <Route path="/system/:systemId" element={<System />} />
            </Routes>
        </div>
    )
}