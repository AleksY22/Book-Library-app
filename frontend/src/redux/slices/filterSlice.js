import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      //return { ...state, title: action.payload }; //традиционный подход
      state.title = action.payload; //в slices можно изменять state, при помощи библиотеки immer
    },
    resetFilters: (state) => {
      return initialState;
    },
  },
});

export const { setTitleFilter, resetFilters } = filterSlice.actions;

export const selectTitleFilter = (state) => state.filter.title;

export default filterSlice.reducer;
