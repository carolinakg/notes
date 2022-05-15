import React, { useState } from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Modal from "react-modal";
import EditForm from "./EditForm";
import { saveNotes } from "../helpers/functions";
function ModalNote(props) {
  const { note, setNotes } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  function handleClick(date) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure?</h1>
            <p>You want to delete this note?</p>
            <button onClick={onClose}>No</button>
            <button
              onClick={() => {
                setNotes((notes) => {
                     const filteredNotes = notes.filter((note) => note.date !== date)
                     const info = notes.find((note) => note.date === date)
                     const noteList = [...filteredNotes, {...info, show: false}]
                     saveNotes(noteList);
                     return noteList;
                });
                onClose();
              }}
            >
              Yes, Delete it!
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
        <button onClick={() => handleClick(note.date)}>X</button>
        
      </div>
      <Modal isOpen={isOpen}>
        {edit ? (
          <EditForm note={note} setNotes={setNotes} setEdit={setEdit} />
        ) : (
          <div>
           <h4>{note.title || ""}</h4>
            <p>{note.input}</p>
            <p><strong>Date:</strong> {note.date}</p>
            <p><strong>Reminder:</strong> {note.reminder}</p>
            <p>{note.update || ""}</p>
          </div>
        )}
        <button onClick={() => handleClick(note.date)}>X</button>
        <button onClick={() => setIsOpen(false)}>Close</button>
        <button onClick={() => setEdit(true)}>Edit</button>
      </Modal>
    </div>
  );
}

export default ModalNote;
