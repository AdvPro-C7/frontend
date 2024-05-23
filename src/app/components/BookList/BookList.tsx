import React from 'react';

interface Book {
    id: number;
    judul: string;
    author: string;
    publisher: string;
    price: number;
}

interface BookListProps {
    books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books = [] }) => (
    <table>
        <thead>
        <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Price</th>
        </tr>
        </thead>
        <tbody>
        {books.length > 0 ? (
            books.map(book => (
                <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.judul}</td>
                    <td>{book.author}</td>
                    <td>{book.publisher}</td>
                    <td>{book.price}</td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan={5}>No books found</td>
            </tr>
        )}
        </tbody>
    </table>
);

export default BookList;
