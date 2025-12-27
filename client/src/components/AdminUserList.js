import React, { useEffect, useState } from "react";
import API from "../api";

function AdminUserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get('/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const promoteToAdmin = (id) => {
    API.put(`/admin/promote/${id}`)
      .then(() => alert("User promoted to admin!"))
      .catch(err => alert("Promotion failed."));
  };

  return (
    <div>
      <h3>All Users</h3>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.name} - {user.role}
            {user.role !== 'admin' && (
              <button onClick={() => promoteToAdmin(user._id)}>
                Promote to Admin
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminUserList;
