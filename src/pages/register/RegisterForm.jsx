import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SelectInput from "../../components/input/SelectInput";
import InputGroup from "../../components/input/InputGroup";

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

    // Validar contraseña
    if (formData.password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("El formato del email es inválido");
      return;
    }

    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
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

  const roleOptions = [
    { value: "buyer", label: "Comprador" },
    { value: "seller", label: "Vendedor" },
  ];

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-center mb-6">Registrarse</h2>
              <form onSubmit={handleSubmit}>
                <InputGroup
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  iconClass="bi bi-envelope"
                />
                <InputGroup
                  type="text"
                  name="fullname"
                  placeholder="Nombre Completo"
                  value={formData.fullname}
                  onChange={handleChange}
                  iconClass="bi bi-person"
                />
                <InputGroup
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  iconClass="bi bi-lock"
                />
                <InputGroup
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmar Contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  iconClass="bi bi-lock-fill"
                />
                <SelectInput
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  options={roleOptions}
                />
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
