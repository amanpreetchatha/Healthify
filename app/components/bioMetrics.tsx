import { useEffect, useState } from "react";
import useUserContext from "~/context";
import supabase from "../supabase-client";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
);


export default function BioMetrics(){
    const user=useUserContext();
    const [enteredWeight,setEnteredWeight]=useState("");
    const [message,setMessage]=useState("");
    let labels = [];
    let weightData=[];

    async function fetchBioMetrics(){
      const {data, error} = await supabase
      .from("bio_metrics")
      .select("*")
      .eq("user_id",user?.id);
      if(error)
        setMessage(error.message);
      data?.map((row, index)=>{
        labels.push(row.created_at.slice(0,10));
        weightData.push(row.weight);
      })
    }
    useEffect(()=>{
      fetchBioMetrics();
    },[]);
    async function setWeight(e: React.MouseEvent){
        e.preventDefault();
        try{
        const {data, error} = await supabase
        .from("bio_metrics")
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
    
    const weightForm = (
    <div className="weight-form">
      <form>
        <div className="formDiv">
          <label className="inputLabel">Weight</label>
          <input placeholder="Enter weight in Kg" value={enteredWeight} onChange={(e)=>{
            e.preventDefault();
            setEnteredWeight(e.target.value)
          }}></input>
        </div>
        
        <div className="formDiv">
          <button onClick={setWeight}>Save</button>
          <div>{message}</div>
        </div>  
      </form>
    </div>
    );

    const weightChart = (
      <div className="containerDiv">
        <span>Weight Progress</span>
        {/* <Line options={{}} data={} /> */}
      </div>
    )
    return weightChart;
}