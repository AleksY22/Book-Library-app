import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import createBook from "../../utils/createBook";

const initialState = {
  booksList: [],
};

export const fetchBook = createAsyncThunk("books/fetchBook", async () => {
  const res = await axios.get("http://localhost:4000/random-book");
  return res.data;
});

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
});

export const { setAddBook, setDeleteBook, setToggleFavorite } =
  booksSlice.actions;

export const selectBooks = (state) => state.books.booksList;

export default booksSlice.reducer;
