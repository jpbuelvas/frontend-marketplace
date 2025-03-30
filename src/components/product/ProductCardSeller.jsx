import React from "react";
import { defaultIamge } from "../../assets/images/index.js";
import { formatMoney } from "../../utils/helper.js";

function ProductCardSeller({ product, onEdit, onDelete }) {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div className="card h-100 shadow-sm border-0 rounded-4">
        <img
          src={product.ImageURL ? product.ImageURL : defaultIamge}
          alt={product.name}
          className="card-img-top rounded-top-4"
          style={{ height: "180px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title mb-2">{product.name}</h5>
          <p className="card-text text-muted mb-1">
            <strong>Precio:</strong> {formatMoney(product.price)}
          </p>
          <p className="card-text text-muted mb-1">
            <i className="bi bi-upc-scan me-1"></i>
            <strong>SKU:</strong> {product.sku}
          </p>
          <p className="card-text text-muted mb-3">
            <strong>Cantidad:</strong> {product.quantity}
          </p>
          <div className="mt-auto d-flex justify-content-end">
            <button
              className="btn btn-outline-secondary btn-sm me-2"
              onClick={() => onEdit(product)}
              title="Editar"
            >
              <i className="bi bi-pencil-square"></i>
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => onDelete(product.id)}
              title="Eliminar"
            >
              <i className="bi bi-trash3"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCardSeller;
