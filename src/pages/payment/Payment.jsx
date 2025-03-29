import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { formatMoney } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../../redux/marketSlice";
import { createSelector } from "reselect";

// Selectores memoizados
const selectProducts = createSelector(
  (state) => state.market?.products,
  (products) => products || []
);

const selectAddress = createSelector(
  (state) => state.market?.address,
  (address) => address || {}
);

const PaymentResult = () => {
  const location = useLocation();
  const [transactionData, setTransactionData] = useState(null);
  const dispatch = useDispatch();
  const pedidoEnviado = useRef(false); // Control para evitar múltiples envíos

  // Obtener productos y dirección usando los selectores memoizados
  const products = useSelector(selectProducts);
  const token = localStorage.getItem("token");
  const finalProductsRef = useRef(products);
  const address = useSelector(selectAddress);
  const enviarPedido = useCallback(
    async (transactionId, productos, address) => {
      if (!productos || productos.length === 0) {
        console.error("No hay productos para registrar en el pedido.");
        return;
      }

      console.log("Datos del pedido a enviar:", {
        transactionId,
        address,
        productos,
      });

      try {
        const pedidoData = {
          transactionId,
          address,
          items: productos.map(({ id, quantity }) => ({
            productId: id,
            quantity,
          })),
        };

        console.log("Enviando pedido:", pedidoData);

        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/orders`,
          pedidoData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Pedido enviado correctamente:", response.data);
      } catch (error) {
        console.error(
          "Error al enviar el pedido:",
          error.response?.data || error.message
        );
      }
    },
    [token] // Solo se recrea si `token` cambia
  );
  useEffect(() => {
    if (products.length) {
      localStorage.setItem("cart", JSON.stringify(products));
      finalProductsRef.current = products; // Asegura tener los productos más recientes
    }
  }, [products]);

  useEffect(() => {
    const transactionId = new URLSearchParams(location.search).get("id");
    if (
      !transactionId ||
      pedidoEnviado.current ||
      finalProductsRef.current.length === 0
    )
      return; // Evita ejecuciones repetidas

    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/wompi/transaction-status?id=${transactionId}`
      )
      .then((response) => {
        setTransactionData(response.data.data);
        if (response.data.data.status === "APPROVED") {
          enviarPedido(transactionId, finalProductsRef.current, address);
          pedidoEnviado.current = true; // Marcamos como enviado para evitar múltiples solicitudes
          dispatch(resetCart());
        }
      })
      .catch((error) =>
        console.error("Error fetching transaction status:", error)
      );
  }, [location.search, dispatch, address, enviarPedido]);

  return (
    <div className="container mx-auto p-5 font-sans">
      <h2 className="text-2xl font-semibold mb-5">Resumen del Pago</h2>
      {transactionData ? (
        <>
          <div
            className={`p-4 mb-5 rounded-md border ${
              transactionData.status === "APPROVED"
                ? "bg-green-100 text-green-800 border-green-300"
                : "bg-yellow-100 text-yellow-800 border-yellow-300"
            }`}
          >
            Tu pago ha sido {transactionData.status.toLowerCase()}.
          </div>
          <table className="w-full table-auto border-collapse mb-5">
            <tbody>
              <tr>
                <td className="px-4 py-2 border">
                  <strong>ID de la Transacción</strong>
                </td>
                <td className="px-4 py-2 border">{transactionData.id}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border">
                  <strong>Cantidad</strong>
                </td>
                <td className="px-4 py-2 border">
                  {formatMoney(
                    (transactionData.amount_in_cents / 100).toFixed(2)
                  )}{" "}
                  COP
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border">
                  <strong>Estado</strong>
                </td>
                <td className="px-4 py-2 border">{transactionData.status}</td>
              </tr>
            </tbody>
          </table>
          <Link to="/products">
            <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
              Seguir navegando
            </button>
          </Link>
        </>
      ) : (
        <div className="p-4 bg-blue-100 text-blue-800 rounded-md border border-blue-300">
          Buscando el resumen del pago...
        </div>
      )}
    </div>
  );
};

export default PaymentResult;
