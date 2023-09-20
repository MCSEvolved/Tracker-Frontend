import { createContext } from "react";
import { AuthState, useAuth } from "../Hooks/useAuth";

export const authContext = createContext<AuthState>({ isSignedIn: false, user: null, pending: true, isMCSPlayer: false});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const { pending, isSignedIn, user, isMCSPlayer } : AuthState = useAuth();
    return (
        <authContext.Provider value={{ isSignedIn, user, pending, isMCSPlayer } as AuthState}>
            {children}
        </authContext.Provider>
    )
};

