// src/components/Products.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/marketSlice.js";
import { fetchProducts } from "../../redux/productSlice.js";
import { CircularProgress, Box } from "@mui/material";
import { Range, getTrackBackground } from "react-range";
import ProductCard from "./ProductCard.jsx";

function Products() {
  const dispatch = useDispatch();
  // Se obtiene la lista completa y el estado de carga desde Redux
  const { products, loading } = useSelector((state) => state?.product);

  // Estados para filtros locales
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [priceRange, setPriceRange] = useState([0, 670]);

  // Se carga la lista completa de productos al montar el componente
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filtrado de productos usando useMemo para optimizar
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchName = product.name.toLowerCase().includes(name.toLowerCase());
      const matchSku = product.sku.toLowerCase().includes(sku.toLowerCase());
      const matchPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchName && matchSku && matchPrice;
    });
  }, [products, name, sku, priceRange]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleClearFilters = () => {
    setName("");
    setSku("");
    setPriceRange([0, 670]);
  };

  if (loading) {
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
      <h2 className="text-center mb-4">Todos los Productos</h2>
      <div className="row">
        {/* Columna de Filtros */}
        <div className="col-lg-3 mb-4">
          <div className="border p-3 rounded-3 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="m-0">Filtros</h5>
              <button
                className="btn btn-link text-danger p-0"
                onClick={handleClearFilters}
              >
                Borrar
              </button>
            </div>

            {/* Filtro por nombre */}
            <div className="mb-3">
              <label className="form-label">Buscar por nombre</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej. Camisa"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Filtro por SKU */}
            <div className="mb-3">
              <label className="form-label">SKU</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej. SKU-123"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
              />
            </div>

            {/* Slider de precios con react-range */}
            <div className="mb-3">
              <label className="form-label fw-bold">Precios</label>
              <div className="d-flex justify-content-between mb-2">
                <small>${priceRange[0]}</small>
                <small>${priceRange[1]}</small>
              </div>
              <Range
                step={10}
                min={0}
                max={1000}
                values={priceRange}
                onChange={(values) => setPriceRange(values)}
                renderTrack={({ props, children }) => (
                  <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                      ...props.style,
                      height: "36px",
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <div
                      ref={props.ref}
                      style={{
                        height: "5px",
                        width: "100%",
                        borderRadius: "4px",
                        background: getTrackBackground({
                          values: priceRange,
                          colors: ["#ccc", "#0d6efd", "#ccc"],
                          min: 0,
                          max: 1000,
                        }),
                        alignSelf: "center",
                      }}
                    >
                      {children}
                    </div>
                  </div>
                )}
                renderThumb={({ props, index }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "24px",
                      width: "24px",
                      borderRadius: "12px",
                      backgroundColor: "#FFF",
                      border: "2px solid #0d6efd",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "0px 2px 6px #AAA",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "-28px",
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "12px",
                        fontFamily: "Arial,Helvetica,sans-serif",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        backgroundColor: "#0d6efd",
                      }}
                    >
                      {priceRange[index]}
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
        </div>

        {/* Columna de Productos */}
        <div className="col-lg-9">
          <div className="row g-4">
            {filteredProducts.map((product) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3"
                key={product.id}
              >
                <ProductCard product={product} onAddToCart={handleAddToCart} />
              </div>
            ))}
            {filteredProducts.length === 0 && (
              <div className="text-center mt-4">
                <p className="text-muted">
                  No hay productos que coincidan con los filtros.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
