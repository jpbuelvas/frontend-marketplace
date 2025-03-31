import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addUserInfo, clearUserInfo } from "./redux/marketSlice";
import { getValidTokenData } from "./utils/authUtils";
import Navbar from "./components/navbar/Navbar.jsx";
import Footer from "./components/footer/Footer.jsx";
import Home from "./pages/home/Home.jsx";
import Products from "./pages/product/Products.jsx";
import Cart from "./pages/cart/Cart.jsx";
import RegisterForm from "./pages/register/RegisterForm.jsx";
import LoginForm from "./pages/login/LoginForm.jsx";
import ProductsSeller from "./pages/product/ProductsSeller.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import { ProductsProvider } from "./constants/productsContext.jsx";
import Orders from "./pages/orders/Orders.jsx";
import PaymentResult from "./pages/payment/Payment.jsx";
import Chatbot from "./components/chatbot/Chatbot.jsx";
import Banner from "./components/banner/Banner.jsx";
import { fetchProducts } from "./redux/productSlice.js";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const tokenData = getValidTokenData();
    if (tokenData) {
      dispatch(addUserInfo(tokenData));
    } else {
      dispatch(clearUserInfo());
    }
  }, [dispatch]);

  // Cargamos productos en el App una carga mas rapida
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <Chatbot />
      <ProductsProvider>
        <Navbar />
        <div style={{ minHeight: "80vh" }}>
          {location.pathname === "/" && <Banner />}
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
            <Route path="/orders" element={<Orders />} />
            <Route path="/payment/result" element={<PaymentResult />} />
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
    </>
  );
}

export default App;
