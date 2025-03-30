import axios from "axios";

// Función para calcular el total de los productos
export const calcularTotal = (productos) => {
  return productos.reduce((total, producto) => {
    return total + producto.precio * producto.cantidad;
  }, 0);
};

// Crear datos del pedido
export const crearPedidoData = (nombre, telefono, direccion, productos) => {
  const total = calcularTotal(productos);
  return { nombre, telefono, direccion, productos, total };
};

// Formatear dinero
export function formatMoney(amount) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(amount);
}

// Obtener productos desde la API
export const fetchProducts = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/products`
    ); // Usar variable de entorno
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Error al obtener productos:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error de red o de API:", error);
    return [];
  }
};

export const fetchProductsByOwner = async (token) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/products/my-products`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Error al obtener productos:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error de red o de API:", error);
    return [];
  }
};
