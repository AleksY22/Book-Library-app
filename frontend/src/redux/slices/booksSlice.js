import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  booksList: [],
};

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
});

export const { setAddBook, setDeleteBook, setToggleFavorite } =
  booksSlice.actions;

export const selectBooks = (state) => state.books.booksList;

export default booksSlice.reducer;
