import React, { useState, useEffect } from "react";

const NoteForm = ({ onSubmit, existingNote, roomId }) => {
  const [title, setTitle] = useState(existingNote?.title || "");
  const [content, setContent] = useState(existingNote?.content || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      content,
      roomId,
      id: existingNote?._id,
    });
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <input
        type="text"
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Note content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">{existingNote ? "Update" : "Create"} Note</button>
    </form>
  );
};

export default NoteForm;
