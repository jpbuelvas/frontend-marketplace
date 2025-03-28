import { useState, useEffect, useCallback } from "react";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";
import { CircularProgress, Box } from "@mui/material";
import { toast } from "react-toastify";
import CreateProductModal from "./CreateProductModal.jsx"; // Modal para crear producto
import EditProductModal from "./EditProductModal.jsx"; // Modal para editar producto
import { fetchProductsByOwner } from "../../utils/helper.js";
import { useSelector } from "react-redux";

function ProductsSeller() {
  const [productsByOwner, setProductByOwner] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const token = localStorage.getItem("token");
  const userInfo = useSelector((state) => state?.market?.userInfo);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const products = await fetchProductsByOwner(token);
      setProductByOwner(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, token]);

  const handleSaveProduct = async (formData) => {
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
      console.error("Error al guardar el producto:", error);
      toast.error("Error al crear el producto");
    }
  };

  const handleUpdateProduct = async (productId, formData) => {
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
      closeModal("editProductModal");
      fetchProducts();
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      toast.error("Error al actualizar el producto");
    }
  };

  const handleDeleteProduct = async (productId) => {
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
      console.error("Error al eliminar el producto:", error);
      toast.error("Error al eliminar el producto");
    }
  };

  // Helpers para abrir y cerrar modales
  const openModal = (modalId) => {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  };

  const closeModal = (modalId) => {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) modalInstance.hide();
    }
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    openModal("editProductModal");
  };

  const handleCreateClick = () => {
    setSelectedProduct(null);
    openModal("createProductModal");
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 9999,
          color: "#fff",
        }}
      >
        <CircularProgress color="inherit" size={60} />
      </Box>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Mis Productos</h2>

      {/* Botón para crear producto con nuevo estilo */}
      <div className="mb-4 d-flex justify-content-end">
        <button
          className="btn btn-primary btn-lg rounded-pill shadow-sm d-inline-flex align-items-center"
          onClick={handleCreateClick}
        >
          <i className="bi bi-plus-circle fs-5 me-2"></i>
          <span className="fw-bold">Añadir Producto</span>
        </button>
      </div>

      {/* Listado de productos */}
      <div className="row g-4">
        {productsByOwner.map((product) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
            <div className="card h-100 shadow-sm border-0 rounded-4">
              <img
                src={product.ImageURL}
                alt={product.name}
                className="card-img-top rounded-top-4"
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title mb-2">{product.name}</h5>
                <p className="card-text text-muted mb-1">
                  <strong>Precio:</strong> ${product.price}
                </p>
                <p className="card-text text-muted mb-3">
                  <strong>SKU:</strong> {product.sku}
                </p>
                <div className="mt-auto d-flex justify-content-end">
                  <button
                    className="btn btn-outline-secondary btn-sm me-2"
                    onClick={() => handleEditClick(product)}
                    title="Editar"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDeleteProduct(product.id)}
                    title="Eliminar"
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para crear producto */}
      <CreateProductModal
        onSave={handleSaveProduct}
        modalId="createProductModal"
      />

      {/* Modal para editar producto */}
      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onUpdate={handleUpdateProduct}
          modalId="editProductModal"
        />
      )}
    </div>
  );
}

export default ProductsSeller;
