import { useState } from "react";
import type { Route } from "./+types/home";
import supabase from "../supabase-client";
import { NavLink, redirect, useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Gym | Reset Password" },
    { name: "description", content: "Reset your password here" },
  ];
}

export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [message,setMessage] = useState("");
  const [loading, setLoading]=useState(false);
  const navigate = useNavigate();

  /*async function signInWithEmail() {
    setLoading(true);
    if(validateInputs() === true){

      const { data,error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error){
          setMessage(error.message)
      }
      setLoading(false);
      navigate("/");
    }
                 
  }
  function validateInputs(){
    if(emailPattern.test(email)===false)
        setMessage("Enter a valid email")
    else if(password.length<8)
        setMessage("Password needs to be atleast 8 characters");     
    else
    {
      setMessage("")
      return true;
    }
    return false;
  }*/
  return (
    <div className="containerDiv">
      <form>
        <div>
            <label className="inputLabel">Email</label>
            <input placeholder="user@example.com" type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="message">{message}</div>
        <button>Reset Password</button>
        <NavLink to="/login">Login</NavLink>        
      </form>
    </div>
  )
}
