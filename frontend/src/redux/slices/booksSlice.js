import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import createBook from "../../utils/createBook";

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

export const thunkFunction = async (dispatch, getState) => {
  try {
    const res = await axios.get("http://localhost:4000/random-book");
    if (res?.data?.title && res?.data?.author) {
      dispatch(setAddBook(createBook(res.data, "API")));
    }
  } catch (error) {
    console.log("Error fetching random book", error);
  }
};

export const { setAddBook, setDeleteBook, setToggleFavorite } =
  booksSlice.actions;

export const selectBooks = (state) => state.books.booksList;

export default booksSlice.reducer;
