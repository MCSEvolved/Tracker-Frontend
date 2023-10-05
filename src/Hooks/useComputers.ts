import { useEffect, useState } from "react";
import { Computer } from "../Types/Computer";
import { AuthState } from "./useAuth";
import axios from "axios";
import { authContext } from "../Contexts/AuthContext";
import { useContext } from "react";

export function useComputers(systemId?: number | string) {
    const [computers, setComputers] = useState<Computer[]>([]);
    const [computersLoading, setComputersLoading] = useState<boolean>(true);

    const { pending, isSignedIn, user }: AuthState = useContext(authContext)
    
    useEffect(() => {
        (async () => {
            if (pending || !isSignedIn || !user) return;

            const TOKEN = await user.getIdToken();

            const CONFIG = {
                headers: { "Authorization": "Bearer " + TOKEN }
            };

            const URL = createURL(systemId)

            axios.get(URL, CONFIG)
                .then(res => {
                    setComputers(res.data);
                    setComputersLoading(false);
                })
                .catch(err => {
                    setComputersLoading(false);
                    console.error(err);
                })
        })()
    }, [pending, isSignedIn, user])

    return [computers, computersLoading] as [Computer[], boolean];
}

const createURL = (systemId?: number | string) => {
    if (systemId) {
        return import.meta.env.VITE_SERVER_URL + "computer/get/by-system?" + new URLSearchParams({ systemId: systemId.toString() });
    } else {
        return import.meta.env.VITE_SERVER_URL + "computer/get/all";
    }
}