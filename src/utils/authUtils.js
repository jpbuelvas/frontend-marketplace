// src/utils/authUtils.js
import { jwtDecode } from "jwt-decode";

export const getValidTokenData = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      // Token expirado
      localStorage.removeItem("token");
      return null;
    }
    // Token válido
    return {
      token,
      user: {
        id: decoded.sub,
        email: decoded.email,
        role: decoded.role,
      },
    };
  } catch (error) {
    console.error("Error decodificando el token:", error);
    localStorage.removeItem("token");
    return null;
  }
};
