import { useEffect, useState, useContext } from "react";
import { System } from "../Types/System";
import axios from "axios";
import { authContext } from "../Contexts/AuthContext";

export default function useSystems(systemId?: number | string) {
    const { pending, isSignedIn, user } = useContext(authContext);

    const [systems, setSystems] = useState<System[]>([]);
    const [systemsLoading, setSystemsLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            if (pending || !isSignedIn || !user) return;

            const URL = createURL(systemId);

            const CONFIG = {
                headers: {
                    "Authorization": "Bearer " + await user.getIdToken()
                }
            };

            axios.get(URL, CONFIG)
                .then(res => {
                    setSystems(res.data);
                    setSystemsLoading(false);
                })
                .catch(err => {
                    console.error(err);
                })
        })()
    }, [pending, isSignedIn, user])

    return [systems, systemsLoading] as [System[], boolean];
}

const createURL = (systemId?: number | string) => {
    if (!systemId) return import.meta.env.VITE_MCS_API_URL + "system/get/all";

    return import.meta.env.VITE_MCS_API_URL + "system/get/by-id?" + new URLSearchParams({ id: systemId.toString() });
}
