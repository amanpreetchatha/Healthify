import { ReactNode, useRef, useState } from "react";
import supabase from "../supabase-client";
import { MetaArgs, NavLink, redirect } from "react-router";

export function meta(){
    return [
        { title: "Gym | Register" },
        { name: "description", content: "Register here to start tracking your health"}
    ]
}

export default function Register(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [name, setName] = useState("");
    const [message,setMessage] = useState("");
    const pwd1 = useRef<HTMLInputElement>(null);
    const pwd2 = useRef<HTMLInputElement>(null);
    const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    async function signUpWithEmail() {
        if(validateInputs()===true){
            const { data,error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { name: name } },   //send data here
            });
        
            if (error)
                setMessage(error.message);

        }
        
        
        
    }
    function validateInputs(){
        
        if(emailPattern.test(email)===false)
            setMessage("Enter a valid email")
        else if(password.length<8)
            setMessage("Password needs to be atleast 8 characters");
        else if(password!==password2)
            setMessage("Passwords don't match");            
        else
            return true;
        return false;
    }
    return (
        <form>
            
            <div className="formDiv">
                <label className="inputLabel">Email</label>
                <input placeholder="user@email.com" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            </div>
            <div className="formDiv">
                <label className="inputLabel">Password</label>
                <input placeholder="********" ref={pwd1} type="password" value={password} onChange={(e)=>setPassword(e.target.value)} minLength={8}/>
            </div>
            <div className="formDiv">
                <label className="inputLabel">Re-enter Password</label>
                <input placeholder="********" ref={pwd2} type="password" value={password2} onChange={(e)=>setPassword2(e.target.value)}/>
            </div>
            <div className="formDiv">
                <div className="message">{message}</div>
                <button className="registerButton" onClick={(e)=>{e.preventDefault(); signUpWithEmail()}}>Register</button>
                
                <p>Already have an account? <NavLink to="/login">Login</NavLink></p>
            </div>
        </form>
    )

}