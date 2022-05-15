import React, { useState } from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Modal from "react-modal";
import { saveNotes } from "../helpers/functions";
function ArchivedNote(props) {
  const { note, setNotes } = props;
  const [isOpen, setIsOpen] = useState(false);
  function handleClick(date) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure?</h1>
            <p>You want to unarchive this note?</p>
            <button onClick={onClose}>No</button>
            <button
              onClick={() => {
                setNotes((notes) => {
                     const filteredNotes = notes.filter((note) => note.date !== date)
                     const info = notes.find((note) => note.date === date)
                     const noteList = [...filteredNotes, {...info, show: true}]
                     saveNotes(noteList);
                     return noteList;
                });
                onClose();
              }}
            >
              Yes!
            </button>
          </div>
        );
      },
    });
  }
  return (
    <div>
      <div className = "note" onClick={() => setIsOpen(true)}>
        <h4>{note.title || ""}</h4>
        <p>{note.input}</p>
        <p><strong>Date:</strong> {note.date}</p>
        <p><strong>Reminder:</strong> {note.reminder}</p>
        <p>{note.update || ""}</p>
        <button onClick={() => handleClick(note.date)}>Unarchive</button>
        
      </div>
      <Modal isOpen={isOpen}>
          <div>
           <h4>{note.title || ""}</h4>
            <p>{note.input}</p>
            <p><strong>Date:</strong> {note.date}</p>
            <p><strong>Reminder:</strong> {note.reminder}</p>
            <p>{note.update || ""}</p>
          </div>
    
        <button onClick={() => handleClick(note.date)}>Unarchive</button>
        <button onClick={() => setIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
}

export default ArchivedNote;
