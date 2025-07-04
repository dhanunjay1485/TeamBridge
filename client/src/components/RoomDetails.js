import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import API from "../axios";

import TaskForm from "../components/Tasks/TaskForm";
import TaskList from "../components/Tasks/TaskList";
import NoteForm from "../components/Notes/NoteForm";
import NoteList from "../components/Notes/NoteList";
import FileUpload from "../components/FileUpload";

function RoomDetails() {
  const { id } = useParams(); // roomId
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [user, setUser] = useState(null); // current logged-in user

  // 🔁 Fetch current user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  // 🔁 Fetch Room Details
  const fetchRoom = useCallback(async () => {
    try {
      const res = await API.get(`/rooms/${id}`);
      setRoom(res.data);
    } catch (err) {
      console.error("Error fetching room", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchRoom();
  }, [fetchRoom]);

  // 🔁 Fetch All Users (for Admin to add members)
  const fetchAllUsers = async () => {
    try {
      const res = await API.get("/users");
      setAllUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  // ➕ Add Member to Room
  const handleAddMember = async (userId) => {
    try {
      await API.post(`/rooms/add-member/${id}`, { userId });
      fetchRoom(); // refresh room members
    } catch (err) {
      console.error("Failed to add user to room", err);
    }
  };

  if (loading) return <p>Loading room...</p>;
  if (!room) return <p>Room not found.</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Room: {room?.name}</h2>

      {/* ===== Admin-only: Create Task ===== */}
      {user?.role === "admin" && (
        <div style={{ marginBottom: "2rem" }}>
          {showTaskForm && (
            <TaskForm
              roomId={id}
              onSuccess={() => {
                setShowTaskForm(false);
                fetchRoom();
              }}
            />
          )}
        </div>
      )}

      {/* ===== Task List (Visible to all) ===== */}
      <TaskList roomId={id} />

      {/* ===== Admin-only: Add Note ===== */}
      {user?.role === "admin" && (
        <div style={{ marginBottom: "2rem" }}>
          {showNoteForm && (
            <NoteForm
              roomId={id}
              onSuccess={() => {
                setShowNoteForm(false);
                fetchRoom();
              }}
            />
          )}
        </div>
      )}

      {/* ===== Notes List ===== */}
      <NoteList roomId={id} />

      {/* ===== File Uploads ===== */}
      <div style={{ marginBottom: "2rem" }}>
        <h3>File Uploads</h3>
        <FileUpload roomId={id} />
      </div>

      {/* ===== Member List ===== */}
      <div style={{ marginBottom: "2rem" }}>
        <h4>Members:</h4>
        <ul>
          {room?.members && room.members.length > 0 ? (
            room.members.map((member) => (
              <li key={member._id}>
                {member.name || member.email || member._id}
              </li>
            ))
          ) : (
            <li>No members yet.</li>
          )}
        </ul>
      </div>

      {/* ===== Admin-only: Add Members Section ===== */}
      {user?.role === "admin" && (
        <div>
          <button onClick={fetchAllUsers}>➕ Add Members</button>
          <ul>
            {allUsers
              .filter(
                (u) => !room.members.some((m) => m._id === u._id) // only show users not already in room
              )
              .map((u) => (
                <li key={u._id}>
                  {u.name} ({u.email}){" "}
                  <button onClick={() => handleAddMember(u._id)}>
                    Add to Room
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RoomDetails;
