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
        <h5 className="card-title mb-2 fw-semibold">{product.name}</h5>
        <p className="card-text text-muted mb-1">
          <i className="bi bi-currency-dollar me-1"></i>
          <strong>Precio:</strong> {formatMoney(product.price)}
        </p>
        <p className="card-text text-muted mb-3">
          <i className="bi bi-upc-scan me-1"></i>
          <strong>SKU:</strong> {product.sku}
        </p>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            marginTop: "auto",
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
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;
