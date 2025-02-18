import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
};

const booksSlice = createSlice({
  name: "books",
  initialState: initialState,
  reducers: {
    setAddBook: (state, action) => {
      state.books = [...state.books, action.payload];
    },
    setDeleteBook: (state, action) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
    },
    setToggleFavorite: (state, action) => {
      state.books = state.books.map((book) =>
        book.id === action.payload
          ? { ...book, isFavorite: !book.isFavorite }
          : book
      );
    },
  },
});

export const { setAddBook, setDeleteBook, setToggleFavorite } =
  booksSlice.actions;

export const selectBooks = (state) => state.books.books;

export default booksSlice.reducer;
