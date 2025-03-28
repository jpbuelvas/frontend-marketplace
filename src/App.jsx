import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import Cart from "./pages/Cart.jsx";
import { ProductsProvider } from "./constants/productsContext.jsx";
import RegisterForm from "./pages/RegisterForm.jsx";
import LoginForm from "./pages/login/LoginForm.jsx";
import ProductsSeller from "./pages/ProductsSeller.jsx"; // Asegúrate de tener este componente
import PrivateRoute from "./routes/PrivateRoute.jsx"; // Asegúrate de tener este componente

function App() {
  return (
    <BrowserRouter>
      <ProductsProvider>
        <Navbar />
        <div style={{ minHeight: "80vh" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginForm type="login" />} />
            <Route
              path="/register"
              element={<RegisterForm type="register" />}
            />
            {/* Ruta protegida para usuarios con rol "seller" */}
            <Route
              path="/my-products"
              element={
                <PrivateRoute allowedRoles={["seller"]}>
                  <ProductsSeller />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </ProductsProvider>
    </BrowserRouter>
  );
}

export default App;
