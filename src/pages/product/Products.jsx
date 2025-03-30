// src/components/Products.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/marketSlice.js";
import { fetchProducts } from "../../redux/productSlice.js";
import { CircularProgress, Box } from "@mui/material";
import ProductCard from "../../components/product/ProductCard.jsx";
import { UserRole } from "../../constants/roles.js";
import Filters from "../../components/filter/Filters.jsx";
import Loader from "../../components/loader/Loader.jsx";

function Products() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state?.product);
  const role = useSelector((state) => state.market?.userInfo?.user?.role);

  // Estados para filtros locales
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedSellers, setSelectedSellers] = useState([]);

  // Obtener lista única de vendedores a partir de product.owner
  const sellers = useMemo(() => {
    const uniqueSellers = new Set();
    products.forEach((product) => {
      if (product.owner && product.owner.fullname) {
        uniqueSellers.add(product.owner.fullname);
      }
    });
    return Array.from(uniqueSellers);
  }, [products]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filtrado de productos usando useMemo para optimizar
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchName = product?.name
        .toLowerCase()
        .includes(name.toLowerCase());
      const matchSku = product?.sku.toLowerCase().includes(sku.toLowerCase());
      const matchPrice =
        parseFloat(product.price) >= priceRange[0] &&
        parseFloat(product.price) <= priceRange[1];
      const matchSeller =
        role === UserRole.ADMIN && selectedSellers.length > 0
          ? selectedSellers.includes(product?.owner?.fullname)
          : true;

      return matchName && matchSku && matchPrice && matchSeller;
    });
  }, [products, name, sku, priceRange, selectedSellers, role]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleClearFilters = () => {
    setName("");
    setSku("");
    setPriceRange([0, 100000]);
    setSelectedSellers([]);
  };

  const handleSellerChange = (seller) => {
    setSelectedSellers((prevSelected) => {
      return prevSelected.includes(seller)
        ? prevSelected.filter((item) => item !== seller)
        : [...prevSelected, seller];
    });
  };
  // Se carga el loader
  if (loading) return <Loader />;

  return (
    <div className="container my-5">
      <div className="row">
        {/* Columna de Filtros */}
        <div className="col-lg-3 mb-4">
          <Filters
            name={name}
            sku={sku}
            priceRange={priceRange}
            setName={setName}
            setSku={setSku}
            setPriceRange={setPriceRange}
            selectedSellers={selectedSellers}
            sellers={sellers}
            handleSellerChange={handleSellerChange}
            handleClearFilters={handleClearFilters}
            role={role}
          />
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
