
export default function RepCounter(){

    return (
        <form>
            <div className="formDiv">
                <label className="inputLabel">Pull ups </label>
                <input className="repInput" placeholder="weight" type="number"></input>
                <input className="repInput" placeholder="reps" type="number"></input>
            </div>
            <div className="formDiv">
                <label className="inputLabel">Squat </label>
                <input className="repInput" placeholder="weight" type="number"></input>
                <input className="repInput" placeholder="reps" type="number"></input>
            </div>
            <div className="formDiv">
                <label className="inputLabel">Bench Press </label>
                <input className="repInput" placeholder="weight" type="number"></input>
                <input className="repInput" placeholder="reps" type="number"></input>
            </div>
            <div className="formDiv">
                <label className="inputLabel">Dips </label>
                <input className="repInput" placeholder="weight" type="number"></input>
                <input className="repInput" placeholder="reps" type="number"></input>
            </div>
            <div className="formDiv">
                <label className="inputLabel">Calf Raise </label>
                <input className="repInput" placeholder="weight" type="number"></input>
                <input className="repInput" placeholder="reps" type="number"></input>
            </div>
            <div>
                <button>Save</button>
            </div>
        </form>
    )
}