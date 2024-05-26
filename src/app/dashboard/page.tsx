"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Book {
    id: number;
    title: string;
    author: string;
    publisher: string;
    price: number;
}

interface Customer {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    warnings: number;
}

const dashboard: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    useEffect(() => {
        axios.get<Book[]>('http://localhost:8087/api/book-details')
            .then(response => setBooks(response.data || [])) 
            .catch(error => console.error('Error fetching books:', error));

        axios.get<Customer[]>('http://localhost:8087/api/customer/')
            .then(response => setCustomers(response.data || [])) 
            .catch(error => console.error('Error fetching customers:', error));
    }, []);

    const deleteBook = (id: number) => {
        axios.delete(`http://localhost:8087/api/book-details/${id}`)
            .then(() => setBooks(books.filter(book => book.id !== id)))
            .catch(error => console.error('Error deleting book:', error));
    };

    const warnCustomer = (id: number) => {
        axios.post<Customer>(`http://localhost:8087/api/customer/warn/${id}`)
            .then(response => {
                const updatedCustomer = response.data;
                setCustomers(customers.map(customer =>
                    customer.id === updatedCustomer.id ? updatedCustomer : customer
                ));
            })
            .catch(error => console.error('Error warning customer:', error));
    };

    const viewCustomerProfile = (id: number) => {
        axios.get<Customer>(`http://localhost:8087/api/customer/${id}`)
            .then(response => setSelectedCustomer(response.data))
            .catch(error => console.error('Error fetching customer profile:', error));
    };

    return (
       <div className="w-full text-black-100 flex justify-left text-left flex-col text-black p-36 py-8 min-h-screen">
            <h1 className="text-4xl font-semibold mb-4 mt-40">Dashboard</h1>

            <h2 className="text-xl font-semibold mb-2 mt-10">Books</h2>
            <table className="min-w-full bg-white border border-gray-300 mb-10">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Id</th>
                        <th className="px-4 py-2 border-b">Title</th>
                        <th className="px-4 py-2 border-b">Author</th>
                        <th className="px-4 py-2 border-b">Publisher</th>
                        <th className="px-4 py-2 border-b">Price</th>
                        <th className="px-4 py-2 border-b">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(books) && books.length > 0 ? (
                        books.map(book => (
                            <tr key={book.id}>
                                <td className="px-4 py-2 border-b">{book.id}</td>
                                <td className="px-4 py-2 border-b">{book.title}</td>
                                <td className="px-4 py-2 border-b">{book.author}</td>
                                <td className="px-4 py-2 border-b">{book.publisher}</td>
                                <td className="px-4 py-2 border-b">{book.price}</td>
                                <td className="px-4 py-2 border-b">
                                    <button
                                        onClick={() => deleteBook(book.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="px-4 py-2 border-b text-center">No books available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <h2 className="text-xl font-semibold mb-2 mt-10">Customers</h2>
            <table className="min-w-full bg-white border border-gray-300 mb-10">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Id</th>
                        <th className="px-4 py-2 border-b">Name</th>
                        <th className="px-4 py-2 border-b">Email</th>
                        <th className="px-4 py-2 border-b">Phone Number</th>
                        <th className="px-4 py-2 border-b">Warnings</th>
                        <th className="px-4 py-2 border-b">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(customers) && customers.length > 0 ? (
                        customers.map(customer => (
                            <tr key={customer.id}>
                                <td className="px-4 py-2 border-b">{customer.id}</td>
                                <td className="px-4 py-2 border-b">{customer.name}</td>
                                <td className="px-4 py-2 border-b">{customer.email}</td>
                                <td className="px-4 py-2 border-b">{customer.phoneNumber}</td>
                                <td className="px-4 py-2 border-b">{customer.warnings}</td>
                                <td className="px-4 py-2 border-b">
                                    <button
                                        onClick={() => warnCustomer(customer.id)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                    >
                                        Warn
                                    </button>
                                    <button
                                        onClick={() => viewCustomerProfile(customer.id)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                    >
                                        View Profile
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="px-4 py-2 border-b text-center">No customers available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {selectedCustomer && (
                <div className="mt-10">
                    <h2 className="text-xl font-semibold mb-2">Customer Profile</h2>
                    <p><strong>Name:</strong> {selectedCustomer.name}</p>
                    <p><strong>Email:</strong> {selectedCustomer.email}</p>
                    <p><strong>Phone Number:</strong> {selectedCustomer.phoneNumber}</p> 
                    <p><strong>Warnings:</strong> {selectedCustomer.warnings}</p>
                </div>
            )}
        </div>
    );
};

export default dashboard;
