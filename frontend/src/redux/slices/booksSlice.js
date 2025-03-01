import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import createBook from "../../utils/createBook";
import { setError } from "./errorSlice";

const initialState = {
  booksList: [],
  isLoadingAPI: false,
};

export const fetchBook = createAsyncThunk(
  "books/fetchBook",
  async (url, thunkAPI) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      //throw error;
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState: initialState,
  reducers: {
    setAddBook: (state, action) => {
      //state.booksList.push(action.payload);
      state.booksList = [...state.booksList, action.payload];
    },
    setDeleteBook: (state, action) => {
      // state.booksList = state.booksList.filter(
      //   (book) => book.id !== action.payload
      // );
      return {
        ...state,
        booksList: state.booksList.filter((book) => book.id !== action.payload),
      };
    },
    setToggleFavorite: (state, action) => {
      state.booksList = state.booksList.map((book) =>
        book.id === action.payload
          ? { ...book, isFavorite: !book.isFavorite }
          : book
      );
    },
    //  setIsLoading: (state, action) => {
    //    state.isLoadingAPI = action.payload;
    //  },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBook.pending, (state) => {
      state.isLoadingAPI = true;
    });
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      state.isLoadingAPI = false;
      if (action.payload.title && action.payload.author) {
        state.booksList = [
          ...state.booksList,
          createBook(action.payload, "API"),
        ];
      }
    });
    builder.addCase(fetchBook.rejected, (state) => {
      state.isLoadingAPI = false;
    });
  },
  // =========второй способ==============
  //   extraReducers: {
  //     [fetchBook.pending]: (state) => {
  //       state.isLoadingAPI = true;
  //     },
  //     [fetchBook.fulfilled]: (state, action) => {
  //       state.isLoadingAPI = false;
  //       if (action.payload.title && action.payload.author) {
  //         state.booksList = [
  //           ...state.booksList,
  //           createBook(action.payload, "API"),
  //         ];
  //       }
  //     },
  //     [fetchBook.rejected]: (state) => {
  //       state.isLoadingAPI = false;
  //     },
  //   },
});

export const { setAddBook, setDeleteBook, setToggleFavorite } =
  booksSlice.actions;

export const selectBooks = (state) => state.books.booksList;
export const selectIsLoadingAPI = (state) => state.books.isLoadingAPI;

export default booksSlice.reducer;
