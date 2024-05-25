import React from 'react';

interface Customer {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    warnings: number;
}

interface CustomerListProps {
    customers: Customer[];
    handleWarnCustomer: (id: number) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers = [], handleWarnCustomer }) => (
    <table>
        <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Warnings</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {customers.length > 0 ? (
            customers.map(customer => (
                <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phoneNumber}</td>
                    <td>{customer.warnings}</td>
                    <td>
                        <button onClick={() => handleWarnCustomer(customer.id)}>Warn</button>
                    </td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan={6}>No customers found</td>
            </tr>
        )}
        </tbody>
    </table>
);

export default CustomerList;
