import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../axios";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [message, setMessage] = useState("");

  // 🔐 Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  // 🧠 Fetch dashboard greeting and rooms
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/dashboard");
        setMessage(res.data.message);
      } catch {
        setMessage("Unauthorized");
      }
    };

    const fetchRooms = async () => {
      try {
        const res = await API.get("/rooms");
        setRooms(res.data);
      } catch (err) {
        console.error("Error fetching rooms", err);
      }
    };

    fetchDashboard();
    fetchRooms();
  }, []);

  // 📦 Create Room (Admin only)
  const handleCreateRoom = async () => {
    if (!newRoomName.trim()) return;
    try {
      await API.post("/rooms", { name: newRoomName });
      setNewRoomName("");
      const res = await API.get("/rooms");
      setRooms(res.data);
    } catch (err) {
      console.error("Failed to create room", err);
    }
  };

  // 👑 Fetch all users (Admin only)
  const handleFetchAllUsers = async () => {
    try {
      const res = await API.get("/users");
      setAllUsers(res.data);
      setShowUserList(true);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  // 🔼 Promote user to admin
  const handlePromote = async (userId) => {
    try {
      await API.put(`/users/promote/${userId}`);
      // Refresh user list after promotion
      const res = await API.get("/users");
      setAllUsers(res.data);
    } catch (err) {
      console.error("Failed to promote user", err);
    }
  };

  // 🚪 Optional logout (clear storage)
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={{ padding: "1rem" }}>
      {/* === Top Bar === */}
      <div>
        <button onClick={() => setShowSidebar(!showSidebar)}>☰ Profile</button>
        <h2>{message}</h2>
        {user && <p>Logged in as: {user.name} ({user.role})</p>}
      </div>

      {/* === Sidebar (Toggleable) === */}
      {showSidebar && user && (
        <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
          <h4>Profile</h4>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      {/* === Admin: Create Room === */}
      {user?.role === "admin" && (
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Room name"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
          />
          <button onClick={handleCreateRoom}>+ Create Room</button>
        </div>
      )}

      {/* === Room List (Visible to All) === */}
      <h3>Your Rooms</h3>
      <ul>
        {rooms.length === 0 ? (
          <li>No rooms available</li>
        ) : (
          rooms.map((room) => (
            <li key={room._id}>
              <button onClick={() => navigate(`/rooms/${room._id}`)}>
                {room.name}
              </button>
            </li>
          ))
        )}
      </ul>

      {/* === Admin: Show Users + Promote === */}
      {user?.role === "admin" && (
        <div style={{ marginTop: "2rem" }}>
          <button onClick={handleFetchAllUsers}>Show All Employees</button>
          {showUserList && (
            <div>
              <h4>All Users</h4>
              <ul>
                {allUsers.length === 0 ? (
                  <li>No users found</li>
                ) : (
                  allUsers.map((u) => (
                    <li key={u._id}>
                      {u.name} ({u.email}) - {u.role}
                      {u.role !== "admin" && (
                        <button onClick={() => handlePromote(u._id)}>
                          Promote to Admin
                        </button>
                      )}
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
