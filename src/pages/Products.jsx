import { useDispatch } from "react-redux";
import { addToCart } from "../redux/marketSlice.js";
import { useProducts } from "../constants/productsContext.jsx";
import { CircularProgress, Box } from "@mui/material";

function Products() {
  const { productos, loading } = useProducts();

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
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
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente
          zIndex: 9999,
          color: "#fff", // Hace que el spinner herede el color blanco
        }}
      >
        <CircularProgress color="inherit" size={60} />
      </Box>
    );
  }
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Todos los Productos</h2>

      <div className="row g-4">
        {productos.map((product) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
            <div className="card h-100">
              <img
                src={product.imageURL}
                alt={product.name}
                className="card-img-top"
                style={{ objectFit: "cover", height: "180px" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Precio: ${product.price}</p>
                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => handleAddToCart(product)}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
