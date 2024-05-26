"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [books, setBooks] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8087/api/book-details/')
            .then(response => setBooks(response.data || [])) 
            .catch(error => console.error('Error fetching books:', error));

        axios.get('http://localhost:8087/api/customer/')
            .then(response => setCustomers(response.data || [])) 
            .catch(error => console.error('Error fetching customers:', error));
    }, []);

    const deleteBook = (id) => {
        axios.delete(`http://localhost:8087/api/book-details/${id}`)
            .then(() => setBooks(books.filter(book => book.id !== id)))
            .catch(error => console.error('Error deleting book:', error));
    };

    const warnCustomer = (id) => {
        axios.post(`http://localhost:8087/api/customer/warn/${id}`)
            .then(response => {
                const updatedCustomer = response.data;
                setCustomers(customers.map(customer =>
                    customer.id === updatedCustomer.id ? updatedCustomer : customer
                ));
            })
            .catch(error => console.error('Error warning customer:', error));
    };

    const viewCustomerProfile = (id) => {
        axios.get(`http://localhost:8087/api/customer/${id}`)
            .then(response => setSelectedCustomer(response.data))
            .catch(error => console.error('Error fetching customer profile:', error));
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Books</h2>
            <ul>
                {Array.isArray(books) && books.length > 0 ? (
                    books.map(book => (
                        <li key={book.id}>
                            {book.title} by {book.author} - {book.price}
                            <button onClick={() => deleteBook(book.id)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <li>No books available</li>
                )}
            </ul>
            <h2>Customers</h2>
            <ul>
                {Array.isArray(customers) && customers.length > 0 ? (
                    customers.map(customer => (
                        <li key={customer.id}>
                            {customer.name} ({customer.email})
                            <button onClick={() => warnCustomer(customer.id)}>Warn</button>
                            <button onClick={() => viewCustomerProfile(customer.id)}>View Profile</button>
                        </li>
                    ))
                ) : (
                    <li>No customers available</li>
                )}
            </ul>
            {selectedCustomer && (
                <div>
                    <h2>Customer Profile</h2>
                    <p>Name: {selectedCustomer.name}</p>
                    <p>Email: {selectedCustomer.email}</p>
                    <p>Phone Number: {selectedCustomer.phoneNumber}</p> 
                    <p>Warnings: {selectedCustomer.warnings}</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;