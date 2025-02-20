import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
//import { addBook } from "../../redux/books/actionCreators";
import { setAddBook } from "../../redux/slices/booksSlice";
import createBook from "../../utils/createBook";
import booksData from "../../data/books.json";
import "./BookForm.css";

function BookForm() {
  //   const [formData, setFormData] = useState({
  //    title: '',
  //    author: ''
  //   });
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author) {
      const book = createBook({ title, author }, "manual");
      dispatch(setAddBook(book));
      setTitle("");
      setAuthor("");
    }
  };

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];
    const randomBookWithId = createBook(randomBook, "random");
    dispatch(setAddBook(randomBookWithId));
  };

  const handleAddRandomBookApi = async () => {
    try {
      const res = await axios.get("http://localhost:4000/random-book");
      if (res?.data?.title && res?.data?.author) {
        dispatch(setAddBook(createBook(res.data, "API")));
      }
    } catch (error) {
      console.log("Error fetching random book", error);
    }
  };

  return (
    <div className="app__block book__form">
      <h2>Add a new book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Add Book</button>
        <button type="button" onClick={handleAddRandomBook}>
          Add Random
        </button>
        <button type="button" onClick={handleAddRandomBookApi}>
          Add Random via API
        </button>
      </form>
    </div>
  );
}

export default BookForm;
