import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk para obtener productos desde el backend
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, thunkAPI) => {
    try {
      // Realiza la petición GET para obtener los productos
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/products`
      );
      return response.data;
    } catch (error) {
      // En caso de error, rechaza el thunk con el mensaje de error
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Slice para manejar el estado de los productos
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [], // Lista de productos
    loading: false, // Indicador de carga
    error: null, // Mensaje de error
  },
  reducers: {},
  extraReducers: (builder) => {
    // Caso pendiente de fetchProducts: se activa el loading
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    // Caso fulfilled de fetchProducts: se actualiza la lista de productos y se desactiva el loading
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    // Caso rejected de fetchProducts: se desactiva el loading y se guarda el error
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default productSlice.reducer;
