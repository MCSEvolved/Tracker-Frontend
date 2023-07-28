import { useContext, useEffect, useState } from "react";
import { Computer } from "../Types/Computer";
import { AuthState } from "./useAuth";
import { authContext } from "../Contexts/AuthContext";
import axios from "axios";

export function useComputer(id: number) {
    const [computer, setComputer] = useState<Computer | null>(null);
    const [computerLoading, setComputerLoading] = useState<boolean>(true);

    const { pending, isSignedIn, user }: AuthState = useContext(authContext)

    useEffect(() => {
        (async () => {
            if (pending || !isSignedIn || !user) return;

            const TOKEN = await user.getIdToken();

            const CONFIG = {
                headers: { "Authorization": "Bearer " + TOKEN }
            };

            const URL = createURL(id)

            axios.get(URL, CONFIG)
                .then(res => {
                    setComputer(res.data);
                    setComputerLoading(false);
                })
                .catch(err => {
                    if (err.response.status === 404) {
                        setComputer(null);
                        setComputerLoading(false);
                        return;
                    }
                    console.error(err);
                })
        })()
    }, [pending, isSignedIn, user])

    return [computer, computerLoading, setComputer] as [Computer, boolean, React.Dispatch<React.SetStateAction<Computer>>];
}

const createURL = (id: number) => {
    return import.meta.env.VITE_SERVER_URL + "computer/get/by-id?" + new URLSearchParams({ id: id.toString() });
}