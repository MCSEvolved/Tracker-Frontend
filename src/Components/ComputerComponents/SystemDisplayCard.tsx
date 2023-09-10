import { useNavigate } from "react-router-dom";
import { System } from "../../Types/System";

export default function SystemDisplayCard(system: System) {
    const navigate = useNavigate()
    const handleClick = () => navigate("/computers/system/" + system.id, { replace: true })

    return (
        <div id="systemDisplay" className="mx-14 my-10 hover:cursor-pointer" onClick={handleClick}>
            <img src="https://placehold.co/150x150?text=icon" alt="System icon" />
            <h4 className="text-center">{system.displayName}</h4>
        </div>
    )
}