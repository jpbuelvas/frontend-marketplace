import React, { useState } from "react";

const CreateProductModal = ({ onSave }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    sku: "",
    quantity: 1,
    price: "",
    image: null,
  });

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
    // Crear FormData para enviar archivos al backend
    const data = new FormData();
    data.append("name", formValues.name);
    data.append("sku", formValues.sku);
    data.append("quantity", formValues.quantity);
    data.append("price", formValues.price);
    if (formValues.image) {
      data.append("image", formValues.image);
    }
    // Llamada a la función que se encargue de enviar el FormData al backend
    onSave(data);
    // Cerrar el modal (según tu implementación, puede ser con Bootstrap o estado local)
  };

  return (
    <div
      className="modal fade"
      id="createProductModal"
      tabIndex="-1"
      aria-labelledby="createProductModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="modal-header">
              <h5 className="modal-title" id="createProductModalLabel">
                Crear Producto
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="productName" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="productName"
                  name="name"
                  placeholder="Product Name"
                  required
                  value={formValues.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="productSku" className="form-label">
                  SKU
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="productSku"
                  name="sku"
                  placeholder="ALFA-10"
                  required
                  value={formValues.sku}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="productQuantity" className="form-label">
                  Cantidad
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="productQuantity"
                  name="quantity"
                  min="1"
                  required
                  value={formValues.quantity}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="productPrice" className="form-label">
                  Precio
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  id="productPrice"
                  name="price"
                  placeholder="10.99"
                  required
                  value={formValues.price}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="productImage" className="form-label">
                  Imagen
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="productImage"
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
                Guardar Producto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProductModal;
