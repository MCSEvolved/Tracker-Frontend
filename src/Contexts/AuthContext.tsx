import { createContext } from "react";
import { AuthState, useAuth } from "../Hooks/useAuth";

const authContext = createContext<AuthState>({ isSignedIn: false, user: null, pending: true });

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const { pending, isSignedIn, user } : AuthState = useAuth();
    return (
        <authContext.Provider value={{ isSignedIn, user, pending } as AuthState}>
            {children}
        </authContext.Provider>
    )
};

export { authContext, AuthContextProvider };
    

