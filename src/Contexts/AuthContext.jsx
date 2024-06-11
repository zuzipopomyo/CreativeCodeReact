/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../assets/firebase";

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOG_IN":
            return { ...state, user: action.payload };
        case "LOG_OUT":
            return { ...state, user: null };
        case "AUTH_READY":
            return { ...state, authReady: true };
        default:
            return state;
    }
};

export default function AuthContextProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, { user: null, authReady: false });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            dispatch({ type: "AUTH_READY" });
            if (user) {
                dispatch({ type: "LOG_IN", payload: user });
            } else {
                dispatch({ type: "LOG_OUT" });
            }
        });

        return () => unsubscribe();
    }, []);

    return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthContextProvider };
