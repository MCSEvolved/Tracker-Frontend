import { Computer } from "../../Types/Computer"
import ComputerDisplay from "./ComputerDisplay"

type Props = {
    computers: Computer[]
}

export default function ComputerList({ computers }: Props) {

    if (computers.length === 0) return (
        <div className="text-center flex justify-center mt-14 flex-col">
            <h1 className="text-2xl font-bold">{"Looks like this system does not have any computers yet."}</h1>
            <h2 className="text-sm mt-2">Add some computers or select another system.</h2>
        </div>
    )

    return (
        <div className="flex flex-wrap justify-center basis-0 mt-6">
            {computers.map(computer => 
                <ComputerDisplay key={computer.id} computerId={computer.id} />
            )}
        </div>
    )
}