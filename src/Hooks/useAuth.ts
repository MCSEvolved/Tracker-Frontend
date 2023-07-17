import { User, getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

export type AuthState = {
    isSignedIn: boolean,
    pending: boolean,
    user: null | User
}

const INITIAL_STATE: AuthState = {
    isSignedIn: false,
    pending: true,
    user: null
}

export function useAuth() {
    const [authState, setAuthState] = useState<AuthState>(INITIAL_STATE);

    useEffect(() => {
        const unsubscribe = getAuth().onAuthStateChanged(user => {
            console.log("setting auth state")
            setAuthState({
                isSignedIn: !!user,
                pending: false,
                user
            })
        });
        return () => unsubscribe();
    }, [])


    return authState;
}