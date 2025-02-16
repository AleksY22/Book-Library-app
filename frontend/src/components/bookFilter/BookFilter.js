import { useDispatch, useSelector } from "react-redux";
import {
  setTitleFilter,
  selectTitleFilter,
  resetFilters,
} from "../../redux/slices/filterSlice";
import "./BookFilter.css";

function BookFilter() {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);
  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };
  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="app__block book__filter">
      <div className="book__filter-row">
        <div className="book__filter-group">
          <input
            type="text"
            value={titleFilter}
            placeholder="Filter by title..."
            onChange={handleTitleFilterChange}
          />
        </div>
        <button onClick={handleResetFilters}>Reset Filters</button>
      </div>
    </div>
  );
}

export default BookFilter;
