import React, { useState } from "react"
import { saveNotes } from "../helpers/functions";
function EditForm(props){
    const {setNotes, note, setEdit} = props;
    const[input, setInput] = useState(note.input);
    const[title, setTitle] = useState("");
    function handleChanges(event){
        setInput(event.target.value);
    }
    function handleClick(event){
        event.preventDefault();
        setEdit(false);
        if(title){
        setNotes((prevNotes) => {
            const updateNotes = prevNotes.filter((info)=> info.date !== note.date)
            const allNotes = [...updateNotes,
                    {input,
                    title,
                    update: String(new Date(Date.now())), 
                    date: note.date} 
                ];
                saveNotes(allNotes);
                return allNotes;
        })
        } else{
            setNotes((prevNotes) => {
                const updateNotes = prevNotes.filter((info)=> info.date !== note.date)
                const allNotes = [...updateNotes,
                        {input,
                        update: String(new Date(Date.now())), 
                        date: note.date} 
                    ];
                    saveNotes(allNotes);
                    return allNotes;
            })
        }
    }
    return(
        <form>
            <input type = "text" placeholder="Title" onChange={(event)=> setTitle(event.target.value)}/>
            <textarea onChange = {handleChanges} placeholder="Your note"/>
            <button onClick={handleClick}>Add</button>
        </form>
    )
}
export default EditForm;