"use client"
import { userContext } from '@/app/contexts/AuthContext';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface CartItem {
    author: string;
    bookId: number;
    bookTitle: string;
    coverPicture: string;
    price: number;
    quantity: number;
    userId: number;
}

interface Order {
    id: number;
    orderDate: string;
    shippingAddress: string | null;
    status: string;
    totalPrice: number;
    userId: number;
    cartItems: CartItem[];
}

const History: React.FC = () => {
    const { state } = userContext();
    const userId = state.id;
    const [data, setData] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openDropdown, setOpenDropdown] = useState<Record<number, boolean>>({});

    const fetchWaitingPayment = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/order/waiting-shipping', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });
            if (response.ok) {
                const data: Order[] = await response.json();
                setData(data);
            } else {
                throw new Error('Failed to fetch payment: ' + response.statusText);
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {

        fetchWaitingPayment();
    }, [userId]);

    const toggleDropdown = (orderId: number) => {
        setOpenDropdown(prevState => ({
            ...prevState,
            [orderId]: !prevState[orderId],
        }));
    };

    return (
        <div className="w-full text-gray-800 flex justify-left text-left flex-col p-28 py-40 min-h-screen bg-gray-100">
            <h1 className="text-gray-800 font-semibold text-4xl mb-6">Pesanan Saya</h1>
            {error && toast.error(error)}
            {loading && <p className="text-xl">Loading...</p>}
            {data && data.length > 0 ? (
                data.map(order => (
                    <div key={order.id} className="mb-10 bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-2">Tanggal Order: {new Date(order.orderDate).toLocaleDateString()}</h2>
                        <p className="text-lg">Status: <span className={`font-semibold ${order.status === 'Pending' ? 'text-yellow-600' : 'text-green-600'}`}>{order.status}</span></p>
                        <p className="text-lg">Total Harga: <span className="font-semibold">${order.totalPrice}</span></p>

                        <div className="mt-6">
                            <h3 className="text-xl font-semibold mb-4 flex justify-between items-center cursor-pointer" onClick={() => toggleDropdown(order.id)}>
                                Cart Items
                                {openDropdown[order.id] ? <FaChevronUp /> : <FaChevronDown />}
                            </h3>
                            {openDropdown[order.id] && (
                                <div>
                                    {order.cartItems.length > 0 ? (
                                        order.cartItems.map(item => (
                                            <div key={item.bookId} className="flex items-center border-b py-4">
                                                <img src={item.coverPicture} alt={item.bookTitle} className="w-20 h-30 mr-6 rounded" />
                                                <div>
                                                    <p className="text-lg font-semibold">Title: {item.bookTitle}</p>
                                                    <p className="text-md">Author: {item.author}</p>
                                                    <p className="text-md">Price: ${item.price}</p>
                                                    <p className="text-md">Quantity: {item.quantity}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No items in the cart.</p>
                                    )}
                                </div>
                            )}
                        </div>
                      
                    </div>
                ))
            ) : (
                <p className="text-xl">No orders found.</p>
            )}
        </div>
    );
}

export default History;
