import React, { useState } from "react";
import { addUserInfo } from "../../redux/marketSlice";
import { useDispatch } from "react-redux";

function Login() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Resetea el mensaje antes de la petición

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error en el login. Status: " + response.status);
      }

      const data = await response.json();

      // Verificamos si el backend devuelve un token
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        dispatch(
          addUserInfo({
            token: data.access_token,
            user: { id: data.id, email: data.email, role: data.role },
          })
        ); // Agrega la información del usuario al store
        setMessage("¡Inicio de sesión exitoso!");
      } else {
        setMessage("El servidor no devolvió un token.");
      }
    } catch (error) {
      setMessage("Error al iniciar sesión: " + error.message);
    }
  };

  return (
    <div style={{ margin: "2rem" }}>
      <h2>Login</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", width: "200px" }}
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ marginBottom: "1rem" }}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ marginBottom: "1rem" }}
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
