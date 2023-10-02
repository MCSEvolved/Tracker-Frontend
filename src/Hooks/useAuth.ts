import axios from "axios";
import { User, getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

export type AuthState = {
    isSignedIn: boolean,
    pending: boolean,
    user: null | User,
    isMCSPlayer: boolean
}

const INITIAL_STATE: AuthState = {
    isSignedIn: false,
    pending: true,
    user: null,
    isMCSPlayer: false
}

export function useAuth() {
    const [authState, setAuthState] = useState<AuthState>(INITIAL_STATE);

    useEffect(() => {
        const unsubscribe = getAuth().onAuthStateChanged(user => {
            if (user) {
                checkIsMCSPlayer(user).then((res) => {
                    setAuthState({
                        isSignedIn: !!user,
                        pending: false,
                        user,
                        isMCSPlayer: res
                    })
                })
            } else {
                setAuthState({
                    isSignedIn: !!user,
                    pending: false,
                    user,
                    isMCSPlayer: false
                })
            }
        });
        return () => unsubscribe();
    }, [])


    return authState;
}

const checkIsMCSPlayer = async (user: User | null): Promise<boolean> => {
    if (!user || user.isAnonymous) return false;

    const idToken = await user.getIdToken();

    const CONFIG = {
        headers: {
            "authorization": idToken
        }
    }

    const res = await axios.get(import.meta.env.VITE_AUTH_URL + "/get-user-claims", CONFIG)
    if (res.data.role === "isPlayer" || res.data.role === "isAdmin") {
        return true
    }
    return false
}