import { ReactNode, useRef, useState } from "react";
import supabase from "../supabase-client";


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
            <span className="message">{message}</span>
            <label>
                Email:
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            </label>
            <label>
                Password:
                <input ref={pwd1} type="password" value={password} onChange={(e)=>setPassword(e.target.value)} minLength={8}/>
            </label>
            <label>
                Re-enter Password:
                <input ref={pwd2} type="password" value={password2} onChange={(e)=>setPassword2(e.target.value)}/>
            </label>
            <label>
                <button type="button" className="cancelButton" onClick={()=>null}>Cancel</button>
                <button type="reset" className="resetButton" onClick={()=>{setEmail(""); setPassword("");setPassword2(""); setMessage("")}}>Reset</button>
                <button className="registerButton" onClick={(e)=>{e.preventDefault(); signUpWithEmail()}}>Register</button>
            </label>
        </form>
    )

}