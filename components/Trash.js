import React from "react";
import ArchivedNote from "./ArchivedNote";
function Trash(props){
    const{notes, setNotes, setTrashOpen} = props;
    return(
        <section>
            {notes.filter((note)=> !note.show ).map((note, index)=>(
                <div key={index}>
                    
                    <ArchivedNote note = {note} setNotes = {setNotes}/>
                </div>

            ))}
            <button onClick={()=>setTrashOpen(false)}>Close Trash</button>
        </section>
    )
}

export default Trash;