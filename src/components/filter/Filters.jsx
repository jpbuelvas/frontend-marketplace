import React from "react";
import { Range, getTrackBackground } from "react-range";
import { formatMoney } from "../../utils/helper";
import { UserRole } from "../../constants/roles";

const Filters = ({
  name,
  sku,
  priceRange,
  setName,
  setSku,
  setPriceRange,
  selectedSellers,
  sellers,
  handleSellerChange,
  handleClearFilters,
  role,
}) => {
  return (
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

      {/* Slider de precios */}
      <div className="mb-3">
        <label className="form-label fw-bold">Precios</label>
        <div className="d-flex justify-content-between mb-2">
          <small>{formatMoney(priceRange[0])}</small>
          <small>{formatMoney(priceRange[1])}</small>
        </div>
        <Range
          step={10}
          min={0}
          max={100000}
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
                    max: 100000,
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

      {/* Filtro por Vendedor (solo para admin) */}
      {role === UserRole.ADMIN && (
        <div className="mb-3">
          <label className="form-label fw-bold">Vendedor</label>
          {sellers.map((seller) => (
            <div className="form-check" key={seller}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`seller-${seller}`}
                checked={selectedSellers.includes(seller)}
                onChange={() => handleSellerChange(seller)}
              />
              <label className="form-check-label" htmlFor={`seller-${seller}`}>
                {seller}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filters;
