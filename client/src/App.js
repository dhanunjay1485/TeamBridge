import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import RoomList from "./components/RoomList";
import CreateRoom from "./components/CreateRoom";
import RoomDetails from "./components/RoomDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/rooms" element={<ProtectedRoute><RoomList /></ProtectedRoute>} />
        <Route path="/rooms/create" element={<ProtectedRoute><CreateRoom /></ProtectedRoute>} />
        <Route path="/rooms/:id" element={<ProtectedRoute><RoomDetails /></ProtectedRoute>} /> 
      </Routes>
    </Router>
  );
}

export default App;
