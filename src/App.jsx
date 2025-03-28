// App.jsx
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Estilos para react-toastify
import { useDispatch } from "react-redux";
import { addUserInfo, clearUserInfo } from "./redux/marketSlice";
import { getValidTokenData } from "./utils/authUtils";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/product/Products.jsx";
import Cart from "./pages/Cart.jsx";
import RegisterForm from "./pages/RegisterForm.jsx";
import LoginForm from "./pages/login/LoginForm.jsx";
import ProductsSeller from "./pages/product/ProductsSeller.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import { ProductsProvider } from "./constants/productsContext.jsx";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const tokenData = getValidTokenData();
    if (tokenData) {
      dispatch(addUserInfo(tokenData));
    } else {
      dispatch(clearUserInfo());
    }
  }, [dispatch]);

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

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;
