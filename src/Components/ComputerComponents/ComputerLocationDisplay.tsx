import { useContext, useEffect, useState } from "react"
import { connectionContext } from "../../Contexts/ConnectionContext"
import { ComputerLocation } from "../../Types/Computer";
import { useLastComputerLocation } from "../../Hooks/useLastLocation";

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
    
    const [lastLocation, lastLocationLoading] = useLastComputerLocation(computerId)

    useEffect(() => {
        // Wait for the last location to load before subscribing to new locations
        if (!connection || lastLocationLoading) return;

        connection.on("NewLocation", handleNewLocation);

        return () => {
            connection.off("NewLocation", handleNewLocation);
        }
    }, [connection, lastLocationLoading])

    useEffect(() => {
        if (lastLocation) setLocation(lastLocation)
    }, [lastLocation])

    if (lastLocationLoading) return;

    if (!location) return (
        <p
            className="text-sm"
        >No location found</p>
    )

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