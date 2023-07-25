import { useContext, useEffect, useState } from "react"
import { connectionContext } from "../../Contexts/ConnectionContext"
import { ComputerLocation } from "../../Types/Computer";

type Props = {
    computerId: number
}

export default function ComputerLocationDisplay({ computerId }: Props) {

    const [location, setLocation] = useState<ComputerLocation | null>(null)

    const handleNewLocation = (location: ComputerLocation) => {
        if (location.computerId !== computerId) return;
        setLocation(location)
    }

    const { connection } = useContext(connectionContext)

    useEffect(() => {
        if (!connection) return;

        connection.on("NewLocation", handleNewLocation);

        return () => {
            connection.off("NewLocation", handleNewLocation);
        }
    }, [connection])

    if (!location) return <p>No location yet</p>

    return (
        <p
            className="text-sm"
        >{"Coordinates: (" + location.coordinates.x + ", " +
            location.coordinates.y + ", " +
            location.coordinates.z + ") "
            }
        </p>
    )
}