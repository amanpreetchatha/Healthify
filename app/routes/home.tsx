import useUserContext from "~/context";
import type { Route } from "./+types/home";
import Login from "./login";
import supabase from "../supabase-client";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Gym | Home" },
    { name: "description", content: "A web app to track your fitness journey." },
  ];
}

export default function Home() {
  const user=useUserContext();
  const [enteredWeight,setEnteredWeight]=useState("");
  const [message,setMessage]=useState("");
  async function setWeight(){
    try{
      const {data, error} = await supabase
      .from("metrics")
      .insert({user_id: user?.id,
        weight: enteredWeight,
        created_at: new Date(),
      })
      if(error)
        setMessage(error.message);
      setMessage("Saved Successfully!");
      setEnteredWeight("");
    }catch(error: any){
      setMessage(error.message);
    }
  }
  //issue: flash of login component before user home component.
  return user===undefined ? <Login/> : (
    <div className="weight-form">
      <form>
        <div>
          <label>Weight</label>
          <input placeholder="Enter weight" value={enteredWeight} onChange={(e)=>{
            e.preventDefault();
            setEnteredWeight(e.target.value)
          }}></input>
          <button onClick={setWeight}>Save</button>
          <p>{message}</p>
        </div>
      </form>
    </div>
  );
}
