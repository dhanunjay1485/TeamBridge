import React, { useState } from "react";

const TaskForm = ({ onSubmit, roomId }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, roomId });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add new task"
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
