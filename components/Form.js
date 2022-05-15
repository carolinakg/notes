import React, { useEffect, useState } from "react"
import { saveNotes } from "../helpers/functions";

function Form(props){
    const {setNotes} = props;
    const[input, setInput] = useState("");
    const[title, setTitle] = useState("");
    const[hour, setHour] = useState("");
    const[minutes, setMinutes] = useState("");
    const[counters,setCounters] = useState([]);
    const[currentTime, setCurrentTime] = useState(0);
    useEffect(()=>{
    setInterval(updateTime, 10000);
    function updateTime(){
        setCurrentTime(String(new Date(Date.now())));
    }
    },[])
    useEffect(()=> {
       counters.forEach((counter)=> calculateCounter(counter));
    },[currentTime])
    function handleChanges(event){
        setInput(event.target.value);
    }
    function calculateCounter(counter){
        const now = String(new Date(Date.now()));
        const time = now.split(" ")[4];
        const curHour = time.split(":")[0];
        const curMinutes = time.split(":")[1];
        const dif = (counter.hour - curHour)*60 + (counter.minutes - curMinutes);
        if(dif<0){
            global.alert(counter.input);
            setCounters((prevCounters)=> prevCounters.filter((count)=> count.hour !== counter.hour || count.minutes !== counter.minutes));
        }
        
    }
    function handleClick(event){
        event.preventDefault();
        setCounters((prevCounters)=> [...prevCounters,{hour, minutes, input}]);
        if(title){
        setNotes((prevNotes) => {
            const newNotes = [...prevNotes,{reminder: `${hour}:${minutes}`,input,title,date: String(new Date(Date.now())), show: true}]
            saveNotes(newNotes);
                return newNotes;
            })
        } else{
            setNotes((prevNotes) => {
                const newNotes = [...prevNotes,{reminder: `${hour}:${minutes}`,input,date: String(new Date(Date.now())), show: true}]
                saveNotes(newNotes)
                return newNotes})
        }
    }
    return(
        <form>
            <input type = "number" placeholder="Hour" value = {hour} onChange={(event)=> setHour(event.target.value)}/>
            <input type = "number" placeholder="Minutes" value = {minutes} onChange={(event)=> setMinutes(event.target.value)}/>
            <input type = "text" placeholder="Title" onChange={(event)=> setTitle(event.target.value)}/>
            <textarea onChange = {handleChanges} placeholder="Your note"/>
            <button onClick={handleClick}>Add</button>
        </form>
    )
}
export default Form;