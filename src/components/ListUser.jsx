// ListUser.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ListUser() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/users");
        setList(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/users/${id}`);
      // Remove the user from the list after deletion
      setList(list.filter(user => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="row">
      {list.map(item => (
        <div className="col-md-4 p-2" key={item._id}>
          <div className="card" style={{ fontSize: "0.9rem" }}>
            <div className="card-header">
              <h5 style={{ fontSize: "1.1rem" }}>Nombre: {item.firstName}</h5>
            </div>
            <div className="card-body">
              <p style={{ fontSize: "0.95rem" }}>Apellido: {item.lastName}</p>
              <p style={{ fontSize: "0.95rem" }}>Edad: {item.age}</p>
              <p style={{ fontSize: "0.95rem" }}>Teléfono: {item.phone}</p>
              <p style={{ fontSize: "0.95rem" }}>Correo: {item.mail}</p>
            </div>
            <div className="card-footer">
              <button className="btn btn-danger" onClick={() => deleteUser(item._id)}>
                Eliminar
              </button>
              <Link className="btn btn-primary m-1" to={'/edit/' + item._id}>
                Editar
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListUser;
