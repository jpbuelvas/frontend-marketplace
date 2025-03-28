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
export const SplOfferData = [
  {
    _id: "201",
    img: null,
    productName: "Cap for Boys",
    price: "35.00",
    color: "Blank and White",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "202",
    img: null,
    productName: "Tea Table",
    price: "180.00",
    color: "Gray",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "203",
    img: null,
    productName: "Headphones",
    price: "25.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "204",
    img: null,
    productName: "Sun glasses",
    price: "220.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
];

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
    console.log(
      response,
      "response",
      import.meta.env.VITE_BACKEND_URL,
      "VITE_BACKEND_URL"
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
