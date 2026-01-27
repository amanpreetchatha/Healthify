import { ReactNode, useRef, useState } from "react";
import supabase from "../supabase-client";
import { ActionFunctionArgs, Form, MetaArgs, NavLink, redirect, useNavigate } from "react-router";

export function meta(){
    return [
        { title: "Gym | Register" },
        { name: "description", content: "Register here to start tracking your health"}
    ]
}

export default function Register(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [message,setMessage] = useState("");
    const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    async function signUpWithEmail() {
        setLoading(true);
        if(validateInputs()===true){
            const { data,error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { name: name } },   //send data here
            });
        
            if (error)
                setMessage(error.message);
            
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
            return true;
        return false;
    }
    
    return (
        <div className="containerDiv">
            <form>
                <div className="formDiv">
                    <label className="inputLabel">Name</label>
                    <input placeholder="Enter name" type="text" value={name} onChange={(e)=>setName(e.target.value)} required />
                </div>
                <div className="formDiv">
                    <label className="inputLabel">Email</label>
                    <input placeholder="user@example.com" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                </div>
                <div className="formDiv">
                    <label className="inputLabel">Password</label>
                    <input placeholder="********" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} minLength={8}/>
                </div>
                <div className="formDiv">
                    <div className="message">{message}</div>
                    <button className="registerButton" onClick={(e)=>{e.preventDefault(); signUpWithEmail()}}>Register</button>
                    
                    <p>Already have an account? <NavLink to="/login">Login</NavLink></p>
                </div>
            </form>
        </div>
    )

}