import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import createBook from "../../utils/createBook";
import { setError } from "./errorSlice";

const initialState = {
  booksList: [],
};

export const fetchBook = createAsyncThunk(
  "books/fetchBook",
  async (url, thunkAPI) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      throw error;
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState: initialState,
  reducers: {
    setAddBook: (state, action) => {
      state.booksList = [...state.booksList, action.payload];
    },
    setDeleteBook: (state, action) => {
      state.booksList = state.booksList.filter(
        (book) => book.id !== action.payload
      );
    },
    setToggleFavorite: (state, action) => {
      state.booksList = state.booksList.map((book) =>
        book.id === action.payload
          ? { ...book, isFavorite: !book.isFavorite }
          : book
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      if (action.payload.title && action.payload.author) {
        state.booksList = [
          ...state.booksList,
          createBook(action.payload, "API"),
        ];
      }
    });
  },
  // =========второй способ==============
  //   extraReducers: {
  //    [fetchBook.fulfilled]: (state, action) => {
  //       if (action.payload.title && action.payload.author) {
  //         state.booksList = [
  //           ...state.booksList,
  //           createBook(action.payload, "API"),
  //         ];
  //       }
  //     }
  //   }
});

export const { setAddBook, setDeleteBook, setToggleFavorite } =
  booksSlice.actions;

export const selectBooks = (state) => state.books.booksList;

export default booksSlice.reducer;
