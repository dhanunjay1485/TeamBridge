import React, { useEffect, useState } from "react";
import API from "../../axios";
import NoteForm from "./NoteForm";

const NoteList = ({ roomId }) => {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  const fetchNotes = async () => {
    try {
      const res = await API.get("/notes", {
        params: { roomId },
      });
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes", err);
    }
  };

  const handleCreateOrUpdate = async (note) => {
    try {
      if (note.id) {
        await API.put(`/notes/${note.id}`, note);
      } else {
        await API.post("/notes", note);
      }
      fetchNotes();
      setEditingNote(null);
    } catch (err) {
      console.error("Error saving note", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      fetchNotes();
    } catch (err) {
      console.error("Error deleting note", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [roomId]);

  return (
    <div className="note-section">
      <h2>Notes</h2>
      <NoteForm onSubmit={handleCreateOrUpdate} existingNote={editingNote} roomId={roomId} />
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <strong>{note.title}</strong>
            <p>{note.content}</p>
            <button onClick={() => setEditingNote(note)}>Edit</button>
            <button onClick={() => handleDelete(note._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
