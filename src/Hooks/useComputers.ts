import { useEffect, useState } from "react";
import { Computer } from "../Types/Computer";
import { AuthState, useAuth } from "./useAuth";
import axios from "axios";

export function useComputers() {
    const [computers, setComputers] = useState<Computer[]>([]);
    const [computersLoading, setComputersLoading] = useState<boolean>(true);

    const { pending, isSignedIn, user }: AuthState = useAuth();

    useEffect(() => {
        (async () => {
            if (pending || !isSignedIn || !user) return;

            const TOKEN = await user.getIdToken();

            const CONFIG = {
                headers: { "Authorization": "Bearer " + TOKEN }
            };

            const URL = import.meta.env.VITE_SERVER_URL + "computer/get/all";

            axios.get(URL, CONFIG)
                .then(res => {
                    setComputers(res.data);
                    setComputersLoading(false);
                })
                .catch(err => {
                    console.error(err);
                })
        })()
    }, [pending, isSignedIn, user])

    return [computers, computersLoading] as [Computer[], boolean];
}