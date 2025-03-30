import Banner from "../../components/banner/Banner.jsx";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/marketSlice.js";
import { useProducts } from "../../constants/productsContext.jsx";
import { CircularProgress, Box } from "@mui/material";
import ProductCard from "../../components/product/ProductCard.jsx";
import Loader from "../../components/loader/Loader.jsx";

function Home() {
  const { productos, loading } = useProducts();
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (loading) return <Loader />;

  return (
    <div className="container my-5">
      <h2 className="text-center mt-5 mb-4 fw-bold">Productos Destacados</h2>
      <div className="row g-4">
        {productos.map((product) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
            <ProductCard product={product} onAddToCart={handleAddToCart} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
