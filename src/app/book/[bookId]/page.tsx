"use client"

import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { useParams } from "next/navigation";
import PopUpFormEditBook from "../../components/PopUpFormUpdateBook";
import { BookDetailProps, BookDetailPropsForAdd } from '../../types/BookDetailProps';
import PopUpFormAddBook from '../../components/PopUpFormAddBook';
import { userContext } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';

const DetailsBookPageView: React.FC = () => {
    const router = useRouter();
    const params = useParams();
    const { bookId } = params;
    const [bookDetails, setBookDetails] = useState<BookDetailProps | null>(null);
    const { state } = userContext();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopupOpenForAdd, setIsPopupOpenForAdd] = useState(false);

    const getData = async () => {
        try {
            console.log("fetching data");
            const response = await axios.get(`http://localhost:8081/api/book-details/1`, {
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

    const handleAddClick = () => {
        setIsPopupOpenForAdd(true);
    };

    const handlePopupCloseAdd = () => {
        setIsPopupOpenForAdd(false);
    };

    const formatNumber = (number: number) => {
        return number.toLocaleString('id-ID');
    };

    const handleFormSubmitForEdit = async (data: BookDetailProps) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/book-details/${data.id}`, data);
            console.log('Updated book details:', response.data);
            getData();
        } catch (error) {
            console.error('Error updating book details:', error);
        }
    };

    const handleFormSubmitForAdd = async (data: BookDetailPropsForAdd) => {
        try {
            const response = await axios.post('http://localhost:8080/api/book-details', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Updated book details:', response.data);
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
            // Fallback: Copy URL to clipboard or provide other share options
            navigator.clipboard.writeText(window.location.href)
                .then(() => {
                    alert('Link copied to clipboard!');
                })
                .catch(console.error);
        }
    };

    const handleDeleteBook = async () => {

        if (bookDetails != null && bookDetails.sold > 0) {
            alert("Buku tidak dapat dihapus karena sudah pernah terjual.");
        } else {
            try {
                const response = await axios.delete(`http://localhost:8081/api/book-details/1`, {
                });
                console.log('Book deleted:', response.data);
                router.push('/book/1'); // Redirect to book list page after deletion
            } catch (error) {
                console.error('Error deleting book:', error);
            }
        }
    };

    useEffect(() => {
        getData();
    }, [bookId]);


    // Pastikan untuk memeriksa apakah state ada sebelum mengakses propertinya


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
                                        <p className='text-2xl text-sky-300 font-bold'>Rp {formatNumber(bookDetails.price)}</p>
                                        <div className='flex space-x-2'>
                                            <p className='text-sm'>Stock: {bookDetails.stock}</p>
                                            <p className='text-sm'>Sold: {bookDetails.sold}</p>
                                        </div>
                                    </div>
                                    { state.role == 'admin' && (
                                        <div className='flex space-x-5'>
                                            <button className='btn btn-primary px-10 text-white-100' onClick={handleEditClick}>Edit</button>
                                            <button className='btn btn-accent px-10 text-white-100' onClick={handleAddClick}>Add</button>
                                            <button className='btn btn-secondary px-10 text-white-100' onClick={handleShare}>Share</button>
                                            <button onClick={handleDeleteBook} className='btn btn-secondary px-10 text-white-100'>Delete Book</button>
                                        </div>
                                    )}
                                    { state.role == 'customer' && (
                                        <div className='flex space-x-5'>
                                            <button className='btn btn-primary px-10 text-white-100' onClick={handleEditClick}>Edit</button>
                                            <button className='btn btn-accent px-10 text-white-100' onClick={handleAddClick}>Add</button>
                                            <button className='btn btn-secondary px-10 text-white-100' onClick={handleShare}>Share</button>
                                            <button onClick={handleDeleteBook} className='btn btn-secondary px-10 text-white-100'>Delete</button>
                                        </div>
                                    )}
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
             {isPopupOpenForAdd && (
                <PopUpFormAddBook
                    onClose={handlePopupCloseAdd}
                    onSubmit={handleFormSubmitForAdd}
                />
            )}
        </div>
    );
};

export default DetailsBookPageView;