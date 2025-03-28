import { useSelector, useDispatch } from "react-redux";
import { deleteItem, resetCart } from "../redux/marketSlice";

function Cart() {
  const dispatch = useDispatch();
  // Obtenemos los items del carrito
  const cartItems = useSelector((state) => state.market.products);

  // Calculamos el total
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Función para eliminar un producto específico
  const handleRemoveFromCart = (id) => {
    console.log(id, "id");
    dispatch(deleteItem(id));
  };

  // Función para vaciar todo el carrito
  const handleClearCart = () => {
    dispatch(resetCart());
  };

  return (
    <div className="container my-5">
      <h2>Carrito de Compras</h2>

      {cartItems.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex align-items-center justify-content-between"
              >
                <div className="d-flex align-items-center">
                  <img
                    src={item.ImageURL}
                    alt={item.name}
                    style={{ width: "80px", marginRight: "10px" }}
                  />
                  <div>
                    <strong>{item.name}</strong> <br />${item.price} x{" "}
                    {item.quantity}
                  </div>
                </div>

                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>

          <h3>Total: ${totalPrice}</h3>
          <button className="btn btn-warning" onClick={handleClearCart}>
            Vaciar Carrito
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
