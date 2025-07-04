// src/pages/CreateRoom.js
import { useState } from "react";
import API from "../axios";
import { useNavigate } from "react-router-dom";

function CreateRoom() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/rooms", { name });
      navigate("/rooms");
    } catch (err) {
      alert("Error creating room");
    }
  };

  return (
    <div>
      <h2>Create a New Room</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Room name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Create Room</button>
      </form>
    </div>
  );
}

export default CreateRoom;
