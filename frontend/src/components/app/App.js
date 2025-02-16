import BookList from "../bookList/BookList";
import BookForm from "../bookForm/BookForm";
import BookFilter from "../bookFilter/BookFilter";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1>Book Library App</h1>
      </header>
      <main className="app__main">
        <div className="app__left-column">
          <BookForm />
        </div>
        <div className="app__right-column">
          <BookFilter />
          <BookList />
        </div>
      </main>
    </div>
  );
}

export default App;
