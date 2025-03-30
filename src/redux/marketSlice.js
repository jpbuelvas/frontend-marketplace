import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  userInfo: {
    token: null,
    user: null,
  },
  products: [],
  address: {},
};

export const marketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {
    // Agrega un producto al carrito
    addToCart: (state, action) => {
      console.log(state.products, "state", action.payload, "action");
      // Buscar si el producto ya existe en el carrito por su id
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        // Si el producto ya está en el carrito, mostrar notificación informativa
        toast.info(
          `El producto ${action.payload.name} ya está en el carrito.`,
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
              backgroundColor: "#ffff",
              color: "#2196F3",
              fontFamily: "Arial, sans-serif",
              fontSize: "16px",
            },
          }
        );
      } else {
        try {
          // Si no existe, agregar el producto con propiedad quantity inicializada en 1
          state.products.push({ ...action.payload, quantity: 1 });
          // Mostrar notificación de éxito
          toast.success(`${action.payload.name} ha sido agregado al carrito!`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
              backgroundColor: "#ffff",
              color: "#4CAF50",
              fontFamily: "Arial, sans-serif",
              fontSize: "16px",
            },
          });
        } catch (error) {
          // En caso de error al agregar, mostrar notificación de error
          toast.error(`No se pudo agregar ${action.payload.name} al carrito.`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
              backgroundColor: "#ffff",
              color: "#f44336",
              fontFamily: "Arial, sans-serif",
              fontSize: "16px",
            },
          });
        }
      }
    },
    // Guarda la información del usuario y el token en el estado
    addUserInfo: (state, action) => {
      state.userInfo.token = action.payload.token;
      state.userInfo.user = action.payload.user;
    },
    // Aumenta la cantidad de un producto en el carrito
    increaseQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity++;
      }
    },
    // Disminuye la cantidad de un producto en el carrito
    drecreaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item.quantity === 1) {
        item.quantity = 1; // Evita que la cantidad sea menor a 1
      } else {
        item.quantity--;
      }
    },
    // Limpia la información del usuario del estado
    clearUserInfo: (state) => {
      state.userInfo = { token: null, user: null };
    },
    // Elimina un producto del carrito según su id
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
    },
    // Guarda los detalles de la dirección en el estado
    setCartDetails: (state, action) => {
      state.address = action.payload;
    },
    // Reinicia el carrito vaciando el array de productos
    resetCart: (state) => {
      state.products = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  drecreaseQuantity,
  deleteItem,
  setCartDetails,
  resetCart,
  clearUserInfo,
  addUserInfo,
} = marketSlice.actions;
export default marketSlice.reducer;
