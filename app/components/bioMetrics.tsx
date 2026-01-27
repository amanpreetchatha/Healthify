import { useEffect, useState } from "react";
import useUserContext from "~/context";
import supabase from "../supabase-client";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
);

interface WeightData{
  labels: string[],
  datasets: [{
    label: string,
    data: number[],
    borderColor: string
  }]
}

export default function BioMetrics(){
    const user=useUserContext();
    const [enteredWeight,setEnteredWeight]=useState("");
    const [message,setMessage]=useState("");
    const [reRender, setReRender]=useState(true);
    let labels: string[] = [];
    let weightData: number[] = [];
    const [weightChartData,setWeightChartData]=useState<WeightData>({labels: [],datasets:[{label:"",data:[],borderColor:""}]}) ;
    useEffect(()=>{
      fetchBioMetrics();
    },[reRender]);
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
      });
      setWeightChartData({
        labels: labels,
        datasets: [{
          label: "Weight",
          data: weightData, 
          borderColor: "#f40",
        }]
      });
      setReRender(true);
    }
    async function setWeight(e: React.MouseEvent){
        e.preventDefault();
        setReRender(false);
        if(enteredWeight.length!==0){
          const {data, error} = await supabase
          .from("bio_metrics")
          .insert({user_id: user?.id,
              weight: enteredWeight,
              created_at: new Date(),
          })
          if(error){
            setMessage(error.message);
          }else{
            setMessage("Saved Successfully!");
            setEnteredWeight("");
          }
        }else{
          setMessage("Weight can't be empty!")
        }
    }
    
    return (
    <div className="containerDiv">
      <div>
        <form>
          <div className="formDiv">
            <label className="inputLabel">Weight</label>
            <input className="data-input" placeholder="Kg" value={enteredWeight} type="number" required onChange={(e)=>{
              e.preventDefault();
              setEnteredWeight(e.target.value);
              setMessage("");
            }}></input>
            <button type="submit" onClick={setWeight}>Save</button>
            <span>{message}</span>
          </div>
        </form>
      </div>
      <div>
        
        <Line className="chart" options={{}} data={weightChartData} />
      </div>
    </div>
    ) 
}