import { createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { auth } from "../assets/firebase"

export default function useSignup() {
  
  let [error,setError] = useState(false)
  let [loading,setLoading] = useState(false)

  let signUp = async (userName,email,password) =>{
    try{
      setLoading(true)
      let res = await  createUserWithEmailAndPassword(auth,userName,email,password)
      setLoading(false)
      setError(false)
      console.log(res.user)
    }catch{
      setLoading(false)
      setError(error.message)
    }
  }

  return{error,loading,signUp}
}
