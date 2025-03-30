// Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUserInfo } from "../../redux/marketSlice";
import { UserRole } from "../../constants/roles";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.market.products);
  // Obtenemos el token e información del usuario desde Redux
  const token = useSelector((state) => state.market?.userInfo?.token);
  const user = useSelector((state) => state.market?.userInfo?.user);
  // Calcula el total de artículos en el carrito
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(clearUserInfo());
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src="/src/assets/favicon.ico"
            alt="Marketplace"
            width="30"
            height="30"
            className="me-2"
          />
          MarketPlace
        </Link>
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
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Productos
              </Link>
            </li>
            {!token && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link position-relative" to="/cart">
                <i className="bi bi-cart me-2"></i>
                {totalItems > 0 && (
                  <span
                    className="position-absolute text-dark"
                    style={{
                      top: -1,
                      left: 22,
                      width: 18,
                      height: 18,
                      backgroundColor: "#9fb8d1",
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 50,
                    }}
                  >
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>

            {token && (
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link centered-btn"
                  id="navbarDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user?.fullname || "Cuenta"}
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  {user?.role === UserRole.SELLER && (
                    <li>
                      <Link className="dropdown-item" to="/my-products">
                        Mis Productos
                      </Link>
                    </li>
                  )}

                  <li>
                    <Link className="dropdown-item" to="/orders">
                      {user?.role === UserRole.SELLER ? "Ordenes" : "Compras"}
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
