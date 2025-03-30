import React, { useState } from "react";
import { addUserInfo } from "../../redux/marketSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    // Se resetea el mensaje antes de realizar la petición
    setMessage("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      // Se verifica que la respuesta sea exitosa
      if (!response.ok) {
        throw new Error("Error en el login. Status: " + response.status);
      }

      const data = await response.json();

      // Si se recibe un token, se almacena y se actualiza el estado global
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        dispatch(
          addUserInfo({
            token: data.access_token,
            user: { id: data.id, email: data.email, role: data.role },
          })
        );
        navigate("/");
        toast.success("¡Inicio de sesión exitoso!");
      } else {
        toast.error("El servidor no devolvió un token.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      toast.error("Error al iniciar sesión: " + error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Iniciar Sesión</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3 input-group">
                  <span className="input-group-text">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="mb-3 input-group">
                  <span className="input-group-text">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                {/* Botón para enviar el formulario */}
                <div className="d-grid mb-3">
                  <button type="submit" className="btn btn-primary">
                    <i className="bi bi-box-arrow-in-right me-2"></i> Iniciar
                    Sesión
                  </button>
                </div>
              </form>
              {/* Mensaje informativo o de error */}
              {message && (
                <div className="alert alert-info text-center" role="alert">
                  {message}
                </div>
              )}
              {/* Enlace para redirigir a la página de registro */}
              <p className="text-center">
                ¿No tienes cuenta?{" "}
                <Link to="/register" className="text-decoration-none">
                  Regístrate
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
