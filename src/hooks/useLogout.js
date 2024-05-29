import { signOut } from "firebase/auth"
import { auth } from "../assets/firebase"
import { useState } from "react"

export default function useLogOut(){
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(null)

    let logOut = async (e) =>{
        setLoading(true)
        try{
            let res = await signOut(auth)
            setError('')
            setLoading(false)
            return res.user
        }catch{
            setLoading(false);
            setError(true);
        }
    }
    return{error,loading,logOut}
}