import { useState } from "react";
import "./BookForm.css";

function BookForm() {
  //   const [formData, setFormData] = useState({
  //    title: '',
  //    author: ''
  //   });
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author) {
      //dispatch action
      setTitle("");
      setAuthor("");
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
        <button type="submit">Add book</button>
      </form>
    </div>
  );
}

export default BookForm;
