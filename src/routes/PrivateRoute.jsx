// PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const roles = useSelector((state) => state.market.user.role);
  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    //console.log(decoded, "decoded");
  } catch (error) {
    console.log("Error decoding token:", error);
    // Si el token es inválido, redirige al login
    // return <Navigate to="/login" />;
  }

  // Verifica el rol solo si se ha pasado allowedRoles
  if (allowedRoles && !allowedRoles.includes(roles)) {
    return <Navigate to="/" />;
  }

  // Si pasa todas las verificaciones, renderiza el componente hijo
  return children;
};

export default PrivateRoute;
