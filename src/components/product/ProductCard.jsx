import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { defaultIamge } from "../../assets/images";
import { formatMoney } from "../../utils/helper";

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="card h-100 shadow-sm border-0 rounded-4">
      <img
        src={product.ImageURL ? product.ImageURL : defaultIamge}
        alt={product.name}
        className="card-img-top rounded-top-4"
        style={{ height: "180px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title mb-2 fw-semibold text-center">
          {product.name}
        </h5>
        <p className="card-text text-muted mb-1">
          <i className="bi bi-currency-dollar me-1"></i>
          <strong>Precio:</strong> {formatMoney(product.price)}
        </p>
        <p className="card-text text-muted mb-1">
          <i className="bi bi-upc-scan me-1"></i>
          <strong>SKU:</strong> {product.sku}
        </p>
        <p className="card-text text-muted mb-1">
          <strong>Cantidad:</strong> {product.quantity}
        </p>
        {/* Validamos que el vendedor exista */}
        {product?.owner?.fullname && (
          <p className="card-text text-muted mb-3">
            <strong>Vendedor:</strong> {product?.owner?.fullname}
          </p>
        )}
        <div className="mt-auto d-flex justify-content-end align-items-end">
          <Button
            variant="contained"
            color="primary"
            sx={{
              borderRadius: "20px",
              textTransform: "none",
              fontWeight: "bold",
            }}
            startIcon={<i className="bi bi-cart"></i>}
            onClick={() => onAddToCart(product)}
          >
            Agregar
          </Button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;
