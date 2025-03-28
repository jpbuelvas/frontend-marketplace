import React, { createContext, useState, useEffect, useContext } from "react";
import { fetchProducts } from "../utils/helper";

// Crea el contexto
const ProductsContext = createContext();

// Proveedor del contexto
export const ProductsProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar productos solo una vez al montar el proveedor
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const products = await fetchProducts(); // Llama a tu API o función para obtener datos
      setProductos(products);
      setLoading(false);
    };

    loadProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ productos, loading }}>
      {children}
    </ProductsContext.Provider>
  );
};

// Hook personalizado para usar el contexto de productos
export const useProducts = () => {
  return useContext(ProductsContext);
};
