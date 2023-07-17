import { Computer } from "../Types/Computer";

export default function ComputerDisplay(computer: Computer) {
    return (
        <div>
            <p>{computer.label}</p>
            <p>{computer.id}</p>
        </div>
    )
}