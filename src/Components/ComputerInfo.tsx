import { Computer } from "../Types/Computer";

type Props = {
    computer: Computer
}

export default function computerInfo({ computer }: Props) {
    return (
        <div id="computerInfo">
            <p>{"Label: " + computer.label}</p>
            <p className="text-sm">{"Status: " + computer.status}</p>
            <p className="text-sm">{"Last update: " + (new Date(computer.lastUpdate)).toLocaleTimeString()}</p>
        </div>
    )
}