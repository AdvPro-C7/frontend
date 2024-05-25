'use client'
import React, { useEffect, useState } from 'react'
import { userContext } from "../contexts/AuthContext"
import { useRouter } from "next/navigation"

interface books {
    title: string;
    author: string;
    price: number;
    sold: number;
    publishDate: string;
    coverPicture: string;
}

const BookList: React.FC = () => {
    const { state } = userContext();
    const router = useRouter();

    const [bookData, setBookData] = useState<books[]>([]);
    const [searchQuery, setSearchQuery]  = useState("");
    const [sortType, setSortType] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSelection, setIsSelection] = useState(false);

    const isRadioSelected = (value: string): boolean => sortType === value;
    const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>) => setSortType(e.currentTarget.value)

    let url_keyword = `http://localhost:8080/api/book-list/search-sort?keyword=${encodeURIComponent(searchQuery)}&sortBy=${encodeURIComponent(sortType)}`;

    const pageLoad = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/api/book-list`);
            if (response.ok) {
                const fetchedBooks: books[] = await response.json(); 
                setBookData(fetchedBooks); 
            } else {
                throw new Error('Failed to fetch books: ' + response.statusText);
            }
        } catch (error) {
            console.error("Failed to retrieve Books: ", error);
        } finally {
            setIsLoading(false);
        }
    }

    const loadBooks = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(url_keyword);
            if (response.ok) {
                const fetchedBooks: books[] = await response.json(); 
                setBookData(fetchedBooks); 
            } else {
                throw new Error('Failed to fetch books: ' + response.statusText);
            }
        } catch (error) {
            console.error("Failed to retrieve Books: ", error);
        } finally {
            setIsLoading(false);
        }
    }
    
    useEffect(() => {
        setIsLoading(true)
        setIsSelection(false);
        const timeOut = setTimeout(() => {
            setIsLoading(false);
            (sortType.length+searchQuery.length) == 0 ? pageLoad() : loadBooks();
        }, 800);
        () => clearTimeout(timeOut);
    }, [isSelection]);
   

    return (
        <>
        <div className='flex py-36 px-5 min-h-screen'>
            {/* Search Bar */}
            <div className='flex flex-row w-full'>
                <div className='flex flex-col w-64 min-w-64'>
                    <input 
                        type="text" 
                        placeholder="Cari Buku" 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        className="overflow-x-auto w-full input input-bordered md:w-auto" 
                    />
            
                    {/* Radio Button */}
                    <div className="px-5 py-1"> 
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text">Newest</span> 
                                <input 
                                    type="radio" 
                                    name="sort" 
                                    value="newest"
                                    className="radio checked:bg-grey-500" 
                                    checked={isRadioSelected('newest')}
                                    onChange={handleRadioClick}/>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text">Popularity</span> 
                                <input 
                                    type="radio" 
                                    name="sort" 
                                    value="popularity"
                                    className="radio checked:bg-grey-500"
                                    checked={isRadioSelected('popularity')}
                                    onChange={handleRadioClick}/>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text">Price (Asc)</span> 
                                <input 
                                    type="radio" 
                                    name="sort" 
                                    value="priceAsc"
                                    className="radio checked:bg-grey-500" 
                                    checked={isRadioSelected('priceAsc')}
                                    onChange={handleRadioClick}/>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text">Price (Desc)</span> 
                                <input 
                                    type="radio" 
                                    name="sort" 
                                    value="priceDesc"
                                    className="radio checked:bg-grey-500" 
                                    checked={isRadioSelected('priceDesc')}
                                    onChange={handleRadioClick}/>
                            </label>
                        </div>
                        <div className='flex flex-col gap-4 justify-center py-2'>
                            <button className="btn btn-outline px-5 btn-sm" onClick={()=>setIsSelection(true)}>Cari</button>
                        </div>
                    </div>
                </div>
                
                {/* Book Cards */}
                <div className='flex-grow p-10'>
                    {isLoading ? (
                        <div className='flex justify-center items-center h-full'>
                            <span className="loading loading-dots loading-lg"></span>
                        </div>
                    ) : (
                        <div className='flex flex-wrap justify-start'> 
                            {bookData.map((book, index) => (
                                <div className="w-full sm:w-1/1 md:w-1/2 lg:w-1/3 p-4" key={index}>
                                    <div className="card bg-white shadow-lg rounded-lg flex flex-col h-full">
                                        <figure className="w-full">
                                            <img src={book.coverPicture} alt="Book cover" className="w-48 h-64 object-cover"/>
                                        </figure>
                                        <div className="card-body flex-grow">
                                            <h2 className="card-title text-lg font-bold">{book.title}</h2>
                                            <p className="text-sm">{book.author}</p>
                                            <p className="text-lg font-semibold">${book.price}</p>
                                            <p className="text-sm">Terjual: {book.sold}</p>
                                            <p className="text-sm">Tanggal Rilis: {book.publishDate}</p>
                                        </div>
                                        <div className="card-actions justify-end p-4">
                                            <button className="btn btn-neutral bg-primary" onClick={()=>router.push("")}>Detail Buku</button>
                                            <button className="btn btn-neutral bg-blue" onClick={()=>router.push("")}>Beli</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    );
}

export default BookList;
