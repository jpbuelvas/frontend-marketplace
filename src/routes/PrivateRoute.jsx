// PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const roles = useSelector((state) => state?.market?.userInfo?.user?.role);

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    // Si el token está expirado lo redireccionamos al
    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");
      return <Navigate to="/login" />;
    }
  } catch (error) {
    console.log("Error decodificando el token:", error);
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  // Validación del rol
  if (allowedRoles && !allowedRoles.includes(roles)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
