import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/marketSlice.js";
import ProductCard from "../../components/product/ProductCard.jsx";
import Loader from "../../components/loader/Loader.jsx";
import { fetchProducts } from "../../redux/productSlice.js";
import { useEffect } from "react";

function Home() {
  const { products, loading } = useSelector((state) => state?.product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (loading) return <Loader />;

  return (
    <div className="container my-5">
      <h2 className="text-center mt-5 mb-4 fw-bold">Productos Destacados</h2>
      <div className="row g-4">
        {products.map((product) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
            <ProductCard product={product} onAddToCart={handleAddToCart} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
