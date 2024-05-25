"use client"
import { userContext } from '@/app/contexts/AuthContext';
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
    const { state } = userContext();
    const[totalPrice,setTotalPrice] = useState<number>(0.0);
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
    }, [userId]);
    
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
    
        
    console.log(cartItems)
    return (
        <div className="w-full flex justify-left text-left flex-col text-black p-32 min-h-screen">
            <h1 className="font-semibold text-3xl text-left mb-8">Shopping Cart</h1>
            {cartItems.length > 0 ? (
                <div className="flex flex-col space-y-4">
                    {cartItems.map((book) => (
                        <div key={book.bookId} className="p-4 border border-gray-200 rounded shadow-sm flex items-center">
                            <img src={book.coverPicture} alt={book.bookTitle} className="w-20 h-30 mr-4" />
                            <div className="flex flex-col flex-grow">
                                <h2 className="text-xl font-semibold">{book.bookTitle}</h2>
                                <p className="text-gray-700">by {book.author}</p>
                                <p className="text-gray-900">${book.price.toFixed(2)}</p>
                                <div className="flex flex-row gap-4 items-center">
                                    <div className="flex items-center mt-2">
                                        <button
                                            onClick={() => handleDecreaseQuantity(book.bookId)}
                                            className="px-2 py-1 bg-blue-100 rounded-md hover:bg-blue-100"
                                            disabled={book.quantity <= 1}
                                        >-</button>
                                        <span className="px-4 py-1 border-t border-b border-gray-200">{book.quantity}</span>
                                        <button
                                            onClick={() => handleIncreaseQuantity(book.bookId)}
                                            className="px-2 py-1 bg-blue-100 rounded-md hover:bg-blue-100"
                                        >+</button>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <FaTrash
                                            className='cursor-pointer text-red-600'
                                            onClick={() =>handleDeleteCartItems(book.bookId)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="mt-8 flex justify-end items-center">
                        <div className="flex flex-col gap-4">
                            <p className="text-2xl font-semibold">Total: ${totalPrice}</p>
                            <button
                                // onClick={handleCheckout}
                                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
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
