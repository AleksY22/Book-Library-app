import { v4 as uuidv4 } from "uuid";

function createBook(book, source) {
  return {
    ...book,
    isFavorite: false,
    id: uuidv4(),
    source: source,
  };
}

export default createBook;
