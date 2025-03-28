// Navbar.jsx
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserRole } from "../constants/roles";

function Navbar() {
  // useSelector nos permite acceder al state de Redux
  const cartItems = useSelector((state) => state.market.products);
  const token = localStorage.getItem("token");
  const role = useSelector((state) => state.market?.userInfo.user.role);
  console.log(role, "role");
  // Calculamos el total de artículos
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        {/* Logo o título */}
        <Link className="navbar-brand" to="/">
          Mi Tienda
        </Link>

        {/* Botón para colapsar menú en móviles */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Items del menú */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Productos
              </Link>
            </li>
            {role === UserRole.SELLER && (
              <li>
                <Link className="nav-link" to="/my-products">
                  Mis Productos
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Carrito <span className="badge bg-secondary">{totalItems}</span>
              </Link>
            </li>

            {!token && (
              <li>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
