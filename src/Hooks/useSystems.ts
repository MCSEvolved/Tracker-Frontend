import { useEffect, useState, useContext } from "react";
import { System } from "../Types/System";
import axios from "axios";
import { authContext } from "../Contexts/AuthContext";

export default function useSystems() {
    const { pending, isSignedIn, user } = useContext(authContext);

    const [systems, setSystems] = useState<System[]>([]);
    const [systemsLoading, setSystemsLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            if (pending || !isSignedIn || !user) return setSystemsLoading(false);

            const URL = createURL();

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
                    setSystemsLoading(false);
                    console.error(err);
                })
        })()
    }, [pending, isSignedIn, user])

    return [systems, systemsLoading] as [System[], boolean];
}

const createURL = () => {
    return import.meta.env.VITE_MCS_API_URL + "system/get/all";
}
