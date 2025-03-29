import { useDispatch } from "react-redux";
import { defaultIamge } from "../assets/images";
import { deleteItem } from "../redux/marketSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(deleteItem(id));
  };

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body d-flex flex-wrap align-items-center gap-3">
        {/* Botón de borrar más moderno */}
        <button
          className="btn btn-danger btn-sm rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: "36px", height: "36px" }}
          onClick={() => handleRemoveFromCart(item.id)}
          title="Eliminar producto"
        >
          <i className="bi bi-trash3-fill fs-6"></i>
        </button>

        {/* Imagen del producto */}
        <img
          src={item.ImageURL ? item.ImageURL : defaultIamge}
          alt={item.name}
          className="rounded"
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
        />

        {/* Nombre y controles de cantidad */}
        <div className="flex-fill">
          <h6 className="mb-2 fw-semibold">{item.name}</h6>
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-outline-danger"
              style={{ width: "24px", height: "24px", padding: 0 }}
            >
              <i className="bi bi-dash fw-bold"></i>
            </button>
            <strong className="mx-2">{item.quantity}</strong>
            <button
              className="btn btn-outline-danger"
              style={{ width: "24px", height: "24px", padding: 0 }}
            >
              <i className="bi bi-plus fw-bold"></i>
            </button>
          </div>
        </div>

        {/* Precio y subtotal */}
        <div className="text-end ms-auto">
          <p className="mb-1">
            <small className="text-muted">Precio:</small>{" "}
            <strong>${item.price}</strong>
          </p>
          <p className="mb-0">
            <small className="text-muted">Subtotal:</small>{" "}
            <strong>${(item.price * item.quantity).toFixed(2)}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
