"use client"

import { useState, useEffect, useRef, useContext } from 'react';
import UserDetail from '../components/DetailProfile';
import { useRouter } from 'next/navigation';

const admin: React.FC = () => {

    const router = useRouter();

    const handleButtonClick = () => {
        router.push(`/admin/1`);
    };

 

    return (
        <div className='min-h-screen flex space-y-2 flex-wrap gap-2 pl-2 pr-2 pt-36 pb-6 justify-center'>
            <div className="bg-white-10">
                <div className="card w-96 bg-grey-100 shadow-x"> 
                    <div className="card-body items-center text-center">
                        <div className='flex flex-col space-y-4 items-center'>
                        <div className="avatar ">
                            <div className="w-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <div>
                            <p className="card-title text-4xl text-white-100">Pratama Arhan</p>
                            <p className='text-white-100'>PratamaArhan@gmail.com</p>
                            <p className='text-white-100'>081268985678</p>
                        </div>
                        </div>
                        <div className="card-actions">
                        <button className="btn btn-primary text-white-100" onClick={handleButtonClick}>Lihat Detail</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
    }
    export default admin;