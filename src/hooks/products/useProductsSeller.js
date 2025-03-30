// useProducts.js
import { useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { fetchProductsByOwner } from "../../utils/helper";

export default function useProductsSeller(token, userInfo) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const productsData = await fetchProductsByOwner(token);
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const saveProduct = async (formData, closeModal) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/products/create-with-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Producto creado correctamente");
      closeModal("createProductModal");
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const updateProduct = async (productId, formData, closeModal) => {
    formData.append(
      "user",
      JSON.stringify({
        id: userInfo.user.id,
        email: userInfo.user.email,
        role: userInfo.user.role,
      })
    );
    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/products/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Producto actualizado correctamente");
      if (typeof closeModal === "function") {
        closeModal("editProductModal");
      }
      fetchProducts();
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      toast.error(error.response?.data?.message);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Producto eliminado correctamente");
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return {
    products,
    isLoading,
    fetchProducts,
    saveProduct,
    updateProduct,
    deleteProduct,
  };
}
