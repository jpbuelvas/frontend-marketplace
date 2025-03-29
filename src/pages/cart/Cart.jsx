import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetCart } from "../../redux/marketSlice.js";
import { useNavigate } from "react-router-dom";
import WompiButton from "./Wompi.jsx"; // Ajusta la ruta según tu proyecto
import CartItem from "../../components/CartItem.jsx";
// import { toast } from "react-toastify";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.market.products);
  // Obtenemos el token para saber si el usuario está logeado
  const token = useSelector((state) => state.market.userInfo?.token);

  // Calcular el total
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  // Estado para la dirección de envío
  const [address, setAddress] = useState({
    name: "",
    celular: "",
    direccion: "",
    ciudad: "",
    estado: "",
    codigoPostal: "",
  });

  // Actualización de campos de dirección
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Determinar si la dirección está completa (todos los campos llenos)
  const isAddressComplete = Object.values(address).every(
    (field) => field.trim() !== ""
  );

  // Vaciar el carrito
  const handleClearCart = () => {
    dispatch(resetCart());
  };

  // Función para proceder al pago
  // const handleProceed = () => {
  //   if (!token) {
  //     // Si el usuario no está logeado, redirige a login
  //     navigate("/login");
  //   } else if (!isAddressComplete) {
  //     // Si la dirección no está completa, muestra un mensaje (o puedes hacer otra acción)
  //     toast.error("Por favor, completa todos los campos de la dirección.");
  //   }
  // };

  return (
    <div className="container my-5">
      <h1 className="mb-4">Carrito</h1>

      {cartItems.length === 0 ? (
        <p className="text-muted">No hay productos en el carrito.</p>
      ) : (
        <div className="row">
          {/* Sección izquierda: tabla de productos */}
          <div className="col-md-8">
            <div className="d-flex justify-content-md-between align-items-md-center mb-3 flex-column flex-md-row gap-2">
              <h5 className="mb-0">Productos en tu carrito</h5>
              <button
                className="btn btn-danger w-auto"
                style={{ width: "fit-content" }}
                onClick={handleClearCart}
              >
                <i className="bi bi-trash-fill me-2"></i>
                Vaciar Carrito
              </button>
            </div>
            <div className="d-flex flex-column gap-3 mt-4">
              {cartItems.map((item, index) => (
                <div key={index}>
                  <CartItem item={item} />
                  <hr />
                </div>
              ))}
            </div>
          </div>

          {/* Sección derecha: Totales y dirección de envío */}
          <div className="col-md-4">
            {/* Card con totales */}
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Totales del carrito</h5>
                <div className="d-flex justify-content-between">
                  <span>Subtotal:</span>
                  <strong>${totalPrice.toFixed(2)}</strong>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Total:</span>
                  <strong>${totalPrice.toFixed(2)}</strong>
                </div>
                {/* Validamos el token y la dirección */}
                {token ? (
                  isAddressComplete ? (
                    // Si el usuario está logeado y la dirección está completa, mostramos el widget de Wompi
                    <WompiButton amount={totalPrice.toFixed(2)} />
                  ) : (
                    // Si la dirección está incompleta, mostramos el botón deshabilitado
                    <div className="text-center">
                      <button className="py-2 px-4 btn btn-secondary" disabled>
                        Completa los datos
                      </button>
                      <p className="text-sm text-gray-500 mt-2">
                        Asegúrate de que todos los campos de la dirección estén
                        llenos.
                      </p>
                    </div>
                  )
                ) : (
                  // Si el usuario no está logeado, mostramos un botón para ir a login
                  <div className="text-center">
                    <button
                      className="py-2 px-4 btn btn-primary"
                      onClick={() => navigate("/login")}
                    >
                      Inicia sesión para pagar
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Card con formulario de dirección de envío */}
            {token && (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Dirección de Envío</h5>
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Nombre</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={address.name}
                        onChange={handleAddressChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Celular</label>
                      <input
                        type="text"
                        className="form-control"
                        name="celular"
                        value={address.celular}
                        onChange={handleAddressChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Dirección</label>
                      <input
                        type="text"
                        className="form-control"
                        name="direccion"
                        value={address.direccion}
                        onChange={handleAddressChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Ciudad</label>
                      <input
                        type="text"
                        className="form-control"
                        name="ciudad"
                        value={address.ciudad}
                        onChange={handleAddressChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Estado/Región</label>
                      <input
                        type="text"
                        className="form-control"
                        name="estado"
                        value={address.estado}
                        onChange={handleAddressChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Código Postal</label>
                      <input
                        type="text"
                        className="form-control"
                        name="codigoPostal"
                        value={address.codigoPostal}
                        onChange={handleAddressChange}
                      />
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
