import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { OrderStatus, UserRole } from "../../constants/roles";

function Orders() {
  const [orders, setOrders] = useState([]);
  const token = useSelector((state) => state.market.userInfo?.token);
  const role = useSelector((state) => state.market.userInfo?.user?.role);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error al obtener las órdenes");
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [token]);

  // Función para determinar la clase de la etiqueta (badge) de estado usando Bootstrap
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "badge bg-secondary";
      case "confirmed":
        return "badge bg-success";
      case "canceled":
        return "badge bg-danger";
      default:
        return "badge bg-light text-dark";
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">
        {role === UserRole.SELLER ? "Mis Ventas" : "Mis Compras"}
      </h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark text-center">
            <tr>
              <th>Orden ID</th>
              <th>{role === UserRole.SELLER ? "Comprador" : "Vendedor"}</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>
                  {role === UserRole.SELLER
                    ? order?.buyer?.fullname
                    : order?.seller?.fullname}
                </td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  <span className={getStatusBadgeClass(order.status)}>
                    {order.status}
                  </span>
                </td>
                <td>${order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
