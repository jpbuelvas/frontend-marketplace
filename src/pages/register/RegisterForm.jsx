import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullname: "",
    confirmPassword: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validar que password y confirmPassword coincidan
    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coincidens");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/register`,
        formData
      );
      if (response.data.userId) {
        toast.success("Registro exitoso!");
        navigate("/login");
      } else {
        toast.error("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      toast.error("Error al registrar usuario.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-center mb-6">Registrarse</h2>
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
                    <i className="bi bi-person"></i>
                  </span>
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Nombre Completo"
                    value={formData.fullname}
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
                <div className="mb-3 input-group">
                  <span className="input-group-text">
                    <i className="bi bi-lock-fill"></i>
                  </span>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmar Contraseña"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="form-select"
                  >
                    <option value="">Selecciona tu rol</option>
                    <option value="buyer">Comprador</option>
                    <option value="seller">Vendedor</option>
                  </select>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    <i className="bi bi-person-plus me-2"></i>Registrarse
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
