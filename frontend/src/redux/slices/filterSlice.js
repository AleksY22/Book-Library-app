import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  author: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      //return { ...state, title: action.payload }; //традиционный подход
      state.title = action.payload; //в slices можно изменять state, при помощи библиотеки immer
    },

    setAuthorFilter: (state, action) => {
      state.author = action.payload;
    },

    resetFilters: (state) => {
      return initialState;
    },
  },
});

export const { setTitleFilter, setAuthorFilter, resetFilters } =
  filterSlice.actions;

export const selectTitleFilter = (state) => state.filter.title;
export const selectAuthorFilter = (state) => state.filter.author;

export default filterSlice.reducer;
