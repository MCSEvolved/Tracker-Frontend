import { Link } from "react-router-dom";

export default function MainContentNavigation() {
    return (
        <div id="mainContentNavigation" className="flex justify-center py-6">
            <Link to={"/logs"} className="bg-MCS-Blue w-52 h-10 mx-12 text-center rounded-lg flex items-center justify-center">Logs</Link>
            <Link to={"/computers"} className="bg-MCS-Blue w-52 h-10 mx-12 text-center rounded-lg flex items-center justify-center">Computers</Link>
        </div>
    )
}