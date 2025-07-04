// src/pages/RoomList.js
import { useEffect, useState } from "react";
import API from "../axios";

function RoomList() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await API.get("/rooms");
        setRooms(res.data);
      } catch (err) {
        alert("Error fetching rooms");
      }
    };
    fetchRooms();
  }, []);

  return (
    <div>
      <h2>Your Rooms</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room._id}>
            {room.name} (Created: {new Date(room.createdAt).toLocaleDateString()})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoomList;
