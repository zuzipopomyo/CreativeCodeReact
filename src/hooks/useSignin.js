import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../assets/firebase";

export default function useSingIn() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const signIn = async (email, password) => {
        setLoading(true);
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            setLoading(false);
            setError(null);
            return res.user;
        } catch (e) {
            setLoading(false);
            setError(e.message);
            return null;
        }
    };

    return { error, loading, signIn };
}
