import React, { useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form';
import Grid from './components/Grid';
import localforage from "localforage";
import Trash from './components/Trash';

function App() {
  const[notes,setNotes] = useState([]);
  const[isTrashOpen, setTrashOpen] = useState(false);
  const loadNotes = () => {
    localforage.getItem('notes').then(function(value) {
    const data = value || [];
    setNotes(data);

    }).catch(function(err) {
        console.log(err);
        setNotes([]);
    });
}
  useEffect(()=> {
    loadNotes();
  }, [])
  return (
    <div>
      <h1 className='title'>My notes</h1>
      <Form setNotes = {setNotes}/>
      <Grid notes = {notes} setNotes = {setNotes}/>
      {isTrashOpen?<Trash setNotes = {setNotes} notes = {notes} setTrashOpen = {setTrashOpen}/>: <button onClick={()=> setTrashOpen(true)}>Archived notes</button>}
    </div>
  );
}

export default App;
