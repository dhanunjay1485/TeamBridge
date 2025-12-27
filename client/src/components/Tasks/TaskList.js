import React, { useEffect, useState } from "react";
import API from "../../axios";
import TaskForm from "./TaskForm";

const TaskList = ({ roomId }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await API.get("/tasks", { params: { roomId } });
    setTasks(res.data);
  };

  const handleCreate = async (task) => {
    await API.post("/tasks", task);
    fetchTasks();
  };

  const toggleComplete = async (task) => {
    await API.put(`/tasks/${task._id}`, {
      ...task,
      completed: !task.completed,
    });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, [roomId]);

  return (
    <div className="task-list">
      <h2>Tasks</h2>
      <TaskForm onSubmit={handleCreate} roomId={roomId} />
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task)}
            />
            {task.title}
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
