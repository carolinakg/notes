import React, { useState } from "react";
import ModalNote from "./ModalNote";


function Grid(props){
    const{notes, setNotes} = props;
    return(
        <section>
            {notes.filter((note)=> note.show ).map((note, index)=>(
                <div key={index}>
                    
                    <ModalNote note = {note} setNotes = {setNotes}/>
                </div>

            ))}
        </section>
    )
}
export default Grid;