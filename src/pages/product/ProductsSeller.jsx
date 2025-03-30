// ProductsSeller.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useProductsSeller from "../../hooks/products/useProductsSeller";
import Loader from "../../components/loader/Loader";
import ProductCardSeller from "../../components/product/ProductCardSeller";
import CreateProductModal from "../../components/product/CreateProductModal";
import EditProductModal from "../../components/product/EditProductModal";
import useModal from "../../hooks/modal/useModal";

function ProductsSeller() {
  const token = localStorage.getItem("token");
  const userInfo = useSelector((state) => state?.market?.userInfo);
  const { openModal, closeModal } = useModal();
  const {
    products,
    isLoading,
    fetchProducts,
    saveProduct,
    updateProduct,
    deleteProduct,
  } = useProductsSeller(token, userInfo);

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    openModal("editProductModal");
  };

  const handleCreateClick = () => {
    setSelectedProduct(null);
    openModal("createProductModal");
  };

  if (isLoading) return <Loader />;

  return (
    <div className="container my-5">
      <div className="mb-4 d-flex justify-content-end">
        <button
          className="btn btn-primary btn-lg rounded-pill shadow-sm d-inline-flex align-items-center"
          onClick={handleCreateClick}
        >
          <i className="bi bi-plus-circle fs-5 me-2"></i>
          <span className="fw-bold">Añadir Producto</span>
        </button>
      </div>

      <div className="row g-4">
        {products.map((product) => (
          <ProductCardSeller
            key={product.id}
            product={product}
            onEdit={handleEditClick}
            onDelete={deleteProduct}
          />
        ))}
      </div>

      <CreateProductModal
        onSave={saveProduct}
        modalId="createProductModal"
        closeModal={closeModal}
      />

      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onUpdate={updateProduct}
          modalId="editProductModal"
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default ProductsSeller;
