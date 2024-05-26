"use client"
import { userContext } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';

export interface Book {
    bookId: number;
    bookTitle: string;
    author: string;
    price: number;
    coverPicture: string;
    quantity: number;
}

const CartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<Book[]>([]);
    const router = useRouter();
    const [totalPrice, setTotalPrice] = useState<number>(0.0);
    const [orderId, setOrderId] = useState<number>(0);
    const [shippingAddress, setShippingAddress] = useState<string>('');




    const userId = 3;
    const fetchCartItems = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/customer/userCart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });
            if (response.ok) {
                const data = await response.json();
                setTotalPrice(data.totalPrice);
                setOrderId(data.id);
                setCartItems(data.cartItems);
            } else {
                console.error('Failed to fetch cart items:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to fetch cart items:', error);
        }
    };
    useEffect(() => {
        fetchCartItems();
    }, []);

    const handleIncreaseQuantity = async (id: number) => {
        const bookId = id;
        const quantity = 1;
        try {
            const response = await fetch('http://localhost:8080/api/customer/addition', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, bookId, quantity }),
            });
            if (!response.ok) {
                console.error('Failed to increase quantity:', response.statusText);
            } else {
                fetchCartItems();
            }
        } catch (error) {
            console.error('Failed to increase quantity:', error);
        }
    };
    const handleDecreaseQuantity = async (id: number) => {
        const bookId = id;
        const quantity = 1;
        try {
            const response = await fetch('http://localhost:8080/api/customer/deduction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, bookId, quantity }),
            });
            if (!response.ok) {
                console.error('Failed to increase quantity:', response.statusText);
            } else {
                fetchCartItems();
            }
        } catch (error) {
            console.error('Failed to increase quantity:', error);
        }
    };

    const handleDeleteCartItems = async (id: number) => {
        const bookId = id;

        try {
            const response = await fetch(`http://localhost:8080/api/customer/cart/${bookId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to delete item: ${response.statusText}`);
            }

            fetchCartItems();
        } catch (error) {
            console.error('Failed to delete item:', error);
        }
    };

    const handleCheckout = async (id: number) => {
        try {
            const response = await fetch('http://localhost:8080/api/customer/placeOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, shippingAddress }),
            });

            if (!response.ok) {
                throw new Error(`Failed to checkout: ${response.statusText}`);
            }

            router.push(`/transaction/${userId}`);
        } catch (error) {
            console.error('Failed to checkout:', error);
        }
    }

    return (
        <div className="w-full text-black-100 flex justify-left text-left flex-col text-black p-36 py-40 min-h-screen">
            <h1 className="text-black-100 font-semibold text-3xl text-left mb-8">Shopping Cart</h1>


            {cartItems.length > 0 ? (
                <div className="flex flex-col space-y-4">
                    {cartItems.map((book) => (
                        <div key={book.bookId} className="p-4 py-10 rounded-xl shadow-lg flex items-center">
                            <img src={book.coverPicture} alt={book.bookTitle} className="w-20 h-30 mr-4" />
                            <div className="flex flex-col flex-grow">
                                <h2 className="text-xl font-semibold">{book.bookTitle}</h2>
                                <p className="text-gray-700">by {book.author}</p>
                                <p className="text-gray-900">${book.price.toFixed(2)}</p>
                                <div className="flex flex-row gap-4 items-center">
                                    <div className="flex items-center mt-2">
                                        <button
                                            onClick={() => handleDecreaseQuantity(book.bookId)}
                                            className="text-white-100 px-2 py-1 bg-blue-100 rounded-md hover:bg-blue-100"
                                            disabled={book.quantity <= 1}
                                        >-</button>
                                        <span className="px-4 py-1 border-t border-b border-gray-200">{book.quantity}</span>
                                        <button
                                            onClick={() => handleIncreaseQuantity(book.bookId)}
                                            className="text-white-100 px-2 py-1 bg-blue-100 rounded-md hover:bg-blue-100"
                                        >+</button>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <FaTrash
                                            className='cursor-pointer text-red-600'
                                            onClick={() => handleDeleteCartItems(book.bookId)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="mt-8 flex  justify-end items-center">
                        <div className="flex flex-col gap-4">

                            <p className="text-2xl font-semibold">Total: ${totalPrice}</p>
                            <div className="p-4 bg-[#ccdfef] py-10 w-full rounded-xl shadow-lg flex items-center">
                                <input
                                    type="text"
                                    placeholder="Enter Shipping Address"
                                    className="w-full px-4 py-2 border text-black-100 bg-white-100 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    value={shippingAddress}
                                    onChange={(e) => setShippingAddress(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={() => {
                                    if (shippingAddress.trim() !== '') {
                                        handleCheckout(orderId);
                                    } else {
                                        alert('Please enter a shipping address.');
                                    }
                                }}
                                className={`text-white-100 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-green-600 ${shippingAddress.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={shippingAddress.trim() === ''}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-gray-500">Your cart is empty.</p>
            )}
        </div>
    );
};

export default CartPage;
