import { useContext, useEffect, useState } from "react";
import { authContext } from "../Contexts/AuthContext";
import { System } from "../Types/System";
import axios from "axios";

export default function useSystem(systemId: number | string) {
    const { pending, isSignedIn, user } = useContext(authContext);
    const [system, setSystem] = useState<System | null>(null);
    const [systemLoading, setSystemLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            if (pending || !isSignedIn || !user) return setSystemLoading(false);

            const URL = createURL(systemId);

            const CONFIG = {
                headers: {
                    "Authorization": "Bearer " + await user.getIdToken()
                }
            };

            axios.get(URL, CONFIG)
                .then(res => {
                    setSystem(res.data);
                    setSystemLoading(false);
                })
                .catch(err => {
                    setSystemLoading(false);
                    console.error(err);
                })
        })()
    }, [pending, isSignedIn, user]);
                
    return [system, systemLoading] as [System | null, boolean];
}

const createURL = (systemId: number | string) => {
    return import.meta.env.VITE_MCS_API_URL + "system/get/by-id?" + new URLSearchParams({ id: systemId.toString() });
};