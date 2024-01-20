import { useEffect, useState } from "react";
import UserForm from "./UserForm";

function Users() {
  const [users, setUsers] = useState([]);
  const [reloadUsers, setReloadUsers] = useState(new Date());
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/users`);
        const jsonData = await response.json();
        setUsers(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUsers();
  }, [reloadUsers]);

  return (
    <main className='d-grid'>
      <h3 className='title'>Usuarios</h3>
      <div className='user-container'>
        <div className='user-overflow'>
          {users.map((user, index) => (
            <div key={index} className='user'>
              <div className='user-name'>{user.name}</div>
              <div className='user-email'>{user.email}</div>
              <div className='user-distance'>{user.distance}</div>
            </div>
          ))}
        </div>
      </div>
      <UserForm setReloadUsers={setReloadUsers} />
    </main>
  );
}
export default Users;
