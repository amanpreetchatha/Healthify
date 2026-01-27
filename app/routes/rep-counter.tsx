import { useState } from "react";

export default function RepCounter(){
    const [exerciseName,setExerciseName] = useState("Pull ups");

    const exerciseItem = 
        <div className="formDiv">
            <label className="inputLabel">{exerciseName}</label>
            <input className="repInput" placeholder="weight" type="number"></input>
            <input className="repInput" placeholder="reps" type="number"></input>
        </div>;

    return (
        <form>
            {exerciseItem}
            <div>
                <button>Save</button>
            </div>
        </form>
    )
}