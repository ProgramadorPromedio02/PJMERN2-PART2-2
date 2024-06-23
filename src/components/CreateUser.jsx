// CreateUser.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function CreateUser() {
  const initialValue = {
    firstName: "",
    lastName: "",
    age: 18,
    phone: "",
    mail: "",
  };

  let { id } = useParams();
  const [user, setUser] = useState(initialValue);
  const [message, setMessage] = useState(""); // Estado para almacenar el mensaje de la API
  const [messageType, setMessageType] = useState(""); // Estado para el tipo de mensaje (éxito o error)

  const captureData = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const saveData = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        phone: user.phone,
        mail: user.mail,
      };

      if (id) {
        await axios.put(`http://localhost:4000/api/users/${id}`, newUser);
        setMessage("Usuario actualizado éxitosamente");
      } else {
        await axios.post("http://localhost:4000/api/users", newUser);
        setMessage("Usuario creado éxitosamente");
      }
      
      setMessageType("success");
      setUser(initialValue);

      // Limpiar el mensaje después de 5 segundos
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 5000);
    } catch (error) {
      console.error("Error al guardar usuario:", error);
      setMessage("Hubo un problema al guardar el usuario. Por favor, intenta de nuevo.");
      setMessageType("error");

      // Limpiar el mensaje de error después de 5 segundos
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 5000);
    }
  };

  const getOne = async (valueId) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/users/${valueId}`);
      setUser({
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        phone: res.data.phone,
        age: res.data.age,
        mail: res.data.mail,
      });
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getOne(id);
    }
  }, [id]);

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card card-body">
        <form onSubmit={saveData}>
          <h2 className="text-center mb-3" style={{ fontSize: "1.2rem" }}>
            {id ? "Editar usuario" : "Crear usuario"}
          </h2>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label" style={{ fontSize: "0.95rem" }}>Nombre:</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="firstName"
              placeholder="Ingrese el nombre del usuario"
              minLength={3}
              maxLength={20}
              name="firstName"
              value={user.firstName}
              onChange={captureData}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label" style={{ fontSize: "0.95rem" }}>Apellido:</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="lastName"
              placeholder="Ingrese el apellido del usuario"
              minLength={3}
              maxLength={15}
              name="lastName"
              value={user.lastName}
              onChange={captureData}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label" style={{ fontSize: "0.95rem" }}>Edad:</label>
            <input
              type="number"
              className="form-control form-control-sm"
              id="age"
              placeholder="Ingrese la edad del usuario"
              min={0}
              max={99}
              name="age"
              value={user.age}
              onChange={captureData}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label" style={{ fontSize: "0.95rem" }}>Teléfono:</label>
            <input
              type="tel"
              className="form-control form-control-sm"
              id="phone"
              placeholder="Ingrese el teléfono del usuario"
              pattern="[0-9]{9,12}"
              name="phone"
              value={user.phone}
              onChange={captureData}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mail" className="form-label" style={{ fontSize: "0.95rem" }}>Correo:</label>
            <input
              type="email"
              className="form-control form-control-sm"
              id="mail"
              placeholder="Ingrese el correo del usuario"
              minLength={10}
              maxLength={20}
              name="mail"
              value={user.mail}
              onChange={captureData}
              required
            />
          </div>
          <button className="btn btn-primary form-control" style={{ fontSize: "0.95rem", width: "100%" }}>
            {id ? "Actualizar usuario" : "Guardar usuario"}
          </button>
        </form>
        {message && (
          <div className={`mt-3 alert alert-${messageType}`} role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateUser;
