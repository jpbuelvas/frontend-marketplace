// EditProductModal.jsx
import React, { useState, useEffect } from "react";

const EditProductModal = ({ product, onUpdate, closeModal }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    sku: "",
    quantity: 1,
    price: "",
    image: null,
  });

  // Precarga los valores al cambiar el producto
  useEffect(() => {
    if (product) {
      setFormValues({
        name: product.name || "",
        sku: product.sku || "",
        quantity: product.quantity || 1,
        price: product.price || "",
        image: null,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormValues({ ...formValues, image: files[0] });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Creamos un FormData con los datos del producto
    const data = new FormData();
    data.append("name", formValues.name);
    data.append("sku", formValues.sku);
    data.append("quantity", formValues.quantity);
    data.append("price", formValues.price);
    if (formValues.image) {
      data.append("image", formValues.image);
    }
    // Pasamos el closeModal para que se ejecute luego de actualizar
    onUpdate(product.id, data, closeModal);
  };

  return (
    <div
      className="modal fade"
      id="editProductModal"
      tabIndex="-1"
      aria-labelledby="editProductModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="modal-header">
              <h5 className="modal-title" id="editProductModalLabel">
                Editar Producto
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              ></button>
            </div>
            <div className="modal-body">
              {/* Campos del formulario */}
              <div className="mb-3">
                <label htmlFor="editProductName" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="editProductName"
                  name="name"
                  placeholder="Product Name"
                  required
                  value={formValues.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editProductSku" className="form-label">
                  SKU
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="editProductSku"
                  name="sku"
                  placeholder="ALFA-10"
                  required
                  value={formValues.sku}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editProductQuantity" className="form-label">
                  Cantidad
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="editProductQuantity"
                  name="quantity"
                  min="1"
                  required
                  value={formValues.quantity}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editProductPrice" className="form-label">
                  Precio
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  id="editProductPrice"
                  name="price"
                  placeholder="10.99"
                  required
                  value={formValues.price}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <div className="image-container d-flex justify-content-center align-items-center">
                  <img
                    src={product.ImageURL}
                    alt={product.name}
                    className="card-img-center justify-content-center"
                    style={{
                      objectFit: "cover",
                      height: "180px",
                      width: "100%",
                      maxWidth: "180px",
                    }}
                  />
                </div>
                <label htmlFor="editProductImage" className="form-label">
                  Cambiar Imagen
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="editProductImage"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Actualizar Producto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
