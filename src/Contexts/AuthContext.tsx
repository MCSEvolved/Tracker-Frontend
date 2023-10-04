import { createContext, useEffect } from "react";
import { AuthState, useAuth } from "../Hooks/useAuth";

export const authContext = createContext<AuthState>({ isSignedIn: false, user: null, pending: true, isMCSPlayer: false});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const { pending, isSignedIn, user, isMCSPlayer } : AuthState = useAuth();

    //redirect user to login if not signed in
    useEffect(() => {
        if (!isSignedIn && !pending) {
            window.location.href = import.meta.env.VITE_LOGIN_URL + "?redirect=" + window.location.href;
        }
    }, [isSignedIn, pending]);

    return (
        <authContext.Provider value={{ isSignedIn, user, pending, isMCSPlayer } as AuthState}>
            {children}
        </authContext.Provider>
    )
};

