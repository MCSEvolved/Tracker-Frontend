import { useContext, useEffect, useState } from "react";
import { ComputerLocation } from "../Types/Computer";
import { authContext } from "../Contexts/AuthContext";
import { AuthState } from "./useAuth";
import axios from "axios";

export function useLastComputerLocation(computerID: number) {
    const [location, setLocation] = useState<ComputerLocation | null>(null);
    const [locationLoading, setLocationLoading] = useState<boolean>(true);

    const { pending, isSignedIn, user }: AuthState = useContext(authContext)

    useEffect(() => {
        (async () => {
            if (pending || !isSignedIn || !user) return;

            const TOKEN = await user.getIdToken();
            const CONFIG = {
                headers: { "Authorization": "Bearer " + TOKEN }
            };

            const URL = createURL(computerID)

            axios.get(URL, CONFIG)
                .then(res => {
                    setLocation(res.data);
                    setLocationLoading(false);
                })
                .catch(err => {
                    if (err.response && err.response.status === 404) {
                        setLocation(null);
                        setLocationLoading(false);
                        return;
                    }
                    console.error(err);
                })
        })()
    }, [pending, isSignedIn, user])

    return [location, locationLoading] as [ComputerLocation, boolean];
}

const createURL = (computerID: number) => {
    return import.meta.env.VITE_SERVER_URL + "location/get/by-id?" + new URLSearchParams({ computerId: computerID.toString() });
}
