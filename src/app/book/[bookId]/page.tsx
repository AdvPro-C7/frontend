"use client"

import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { useParams } from "next/navigation";
import PopUpFormEditBook from "../../components/PopUpFormUpdateBook";
import { BookDetailProps, BookDetailPropsForAdd } from '../../types/BookDetailProps';
import { useRouter } from 'next/navigation';
import { userContext } from '@/app/contexts/AuthContext';

const DetailsBookPageView: React.FC = () => {
    const router = useRouter();
    const params = useParams();
    const { bookId } = params;
    const [bookDetails, setBookDetails] = useState<BookDetailProps | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { state } = userContext();


    useEffect(() => {
        getData();
    }, [bookId]);

    const getData = async () => {
        try {
            console.log("fetching data");
            const response = await axios.get(`https://admin-hkqa74sxta-ew.a.run.app/api/book-details/${bookId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            setBookDetails(response.data);
        } catch (error) {
            console.log("keren : ", error)
        }
    };

    const handleEditClick = () => {
        setIsPopupOpen(true);
    };

    const handlePopupClose = () => {
        setIsPopupOpen(false);
    };

    const formatNumber = (number: number) => {
        return number.toLocaleString('id-ID');
    };

    const handleFormSubmitForEdit = async (data: BookDetailProps) => {
        try {
            const response = await axios.put(`https://admin-hkqa74sxta-ew.a.run.app/api/book-details/${data.id}`, data);
            console.log('Updated book details:', response.data);
            getData();
        } catch (error) {
            console.error('Error updating book details:', error);
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: bookDetails?.title,
                text: `Check out this book: ${bookDetails?.title}`,
                url: window.location.href
            }).then(() => {
                console.log('Thanks for sharing!');
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(window.location.href)
                .then(() => {
                    alert('Link copied to clipboard!');
                })
                .catch(console.error);
        }
    };

    const handleCart = async () => {
        if (state.role == 'customer' || state.role == 'admin'){
            try {
                const quantity = 1;
                const userId = state.id;
                const response = await fetch('https://functionality-hkqa74sxta-ew.a.run.app/api/customer/cart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId, bookId, quantity }),
                });
            } catch (error) {
                console.error('Error updating book details:', error);
            }
        } else {
            router.push("/auth")
        }
       
        
    };

    const handleDeleteBook = async () => {

        if (bookDetails != null && bookDetails.sold > 0) {
            alert("Buku tidak dapat dihapus karena sudah pernah terjual.");
        } else {
            try {
                const response = await axios.delete(`https://admin-hkqa74sxta-ew.a.run.app/api/book-details/${bookId}`, {
                });
                console.log('Book deleted:', response.data);
                router.push('/book-list'); // Redirect to book list page after deletion
            } catch (error) {
                console.error('Error deleting book:', error);
            }
        }
    };

    useEffect(() => {
        getData();
    }, [bookId]);


    return (
        <div className="flex flex-col min-h-screen pt-28">
            <div className="px-20 py-12 mr-24">
                <div className="flex mr-24 mt-8">
                    {bookDetails ? (
                        <>
                            <div className="flex flex-col p-3 mr-20">
                                <img src={bookDetails.coverPicture} alt={bookDetails.title} width={200} />
                            </div>
                            <div className="flex flex-col text-gray-500">
                                <p className="text-4xl font-bold">{bookDetails.title}</p>
                                <p className='pt-2'>{bookDetails.author}</p>
                                <div className='flex flex-col pt-8 space-y-10'>
                                    <div>
                                        <p className='text-2xl text-sky-300 font-bold'>${formatNumber(bookDetails.price)}</p>
                                        <div className='flex space-x-2'>
                                            <p className='text-sm'>Stock: {bookDetails.stock}</p>
                                            <p className='text-sm'>Sold: {bookDetails.sold}</p>
                                        </div>
                                    </div>
                                    { state.role == 'admin' && (
                                    <div className='flex space-x-5'>
                                        <button className='btn btn-primary px-10 text-white-100' onClick={handleEditClick}>Edit</button>
                                        <button onClick={handleDeleteBook} className='btn btn-secondary px-10 text-white-100'>Delete Book</button>
                                    </div>
                                    )}
                                    <div className='flex space-x-5'>
                                        <button className='btn btn-primary px-10 text-white-100' onClick={handleCart}>Add to chart</button>
                                        <button className='btn btn-secondary px-10 text-white-100' onClick={handleShare}>Share</button>
                                    </div>
                                </div>
                                <div className='flex flex-col mt-10 '>
                                    <p className='font-bold text-gray-600'>Deskripsi Buku</p>
                                    <p className='font-semibold text-gray-500'>{bookDetails.description}</p>
                                </div>
                                <div>
                                    <p className='font-bold mt-10 text-gray-600'>Detail Buku</p>
                                    <div className='flex space-x-36 mt-4'>
                                        <div className='flex flex-col space-y-2'>
                                            <div className='text-gray-500'>
                                                <p>Pages</p>
                                                <p className='font-semibold'>{bookDetails.pages}</p>
                                            </div>
                                            <div className='text-gray-500'>
                                                <p>Tahun rilis</p>
                                                <p className='font-semibold'>{bookDetails.publishDate}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col space-y-2'>
                                            <div className='text-gray-500'>
                                                <p>Category</p>
                                                <p className='font-semibold'>{bookDetails.category}</p>
                                            </div>
                                            <div className='text-gray-500'>
                                                <p>Publisher</p>
                                                <p className='font-semibold'>{bookDetails.publisher}</p>
                                            </div>
                                        </div>
                                        <div className='text-gray-500'>
                                            <p>ISBN</p>
                                            <p className='font-semibold'>{bookDetails.isbn}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
            {isPopupOpen && (
                <PopUpFormEditBook
                    bookDetails={bookDetails as BookDetailProps}
                    onClose={handlePopupClose}
                    onSubmit={handleFormSubmitForEdit}
                />
            )}
        </div>
    );
};

export default DetailsBookPageView;