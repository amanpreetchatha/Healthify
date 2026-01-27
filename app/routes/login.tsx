import { useState } from "react";
import type { Route } from "./+types/home";
import supabase from "../supabase-client";
import { NavLink, redirect, useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Gym" },
    { name: "A simple web app", content: "A web app to track your fitness journey." },
  ];
}

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [message,setMessage] = useState("");
  const [loading, setLoading]=useState(false);
  const navigate = useNavigate();

  async function signInWithEmail() {
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
  }
  return (
    <div className="containerDiv">
      <form>
        <div>
            <label className="inputLabel">Email</label>
            <input placeholder="user@example.com" type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div>
            <label className="inputLabel">Password</label>
            <input placeholder="********" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <div className="message">{message}</div>
        <button className="button" onClick={(e)=>{e.preventDefault(); signInWithEmail()}} disabled={loading}>Login</button>
        <NavLink to="/forgotpassword">Forgot Password?</NavLink>
        <p>Don't have an account? <NavLink to='/register'>Register</NavLink></p>
      </form>
    </div>
  )
}
