"use client"

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';

const UserDetail = () => {

    const router = useRouter();
    const { idUser} = useParams(); 
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`https://functionality-hkqa74sxta-ew.a.run.app/users/${idUser}`);
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [idUser]);

    const handleButtonClick = () => {
        router.push(`/dashboard/search`);
    };

    return (
        <div className="bg-white-100">
            <div className='min-h-screen flex pt-32 pb-6 justify-center'>
                <div className='flex flex-col space-y-4 justify-center items-center'>
                    <div className='flex flex-col space-y-4 items-center'>
                        <div className="avatar">
                            <div className="w-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={user?.foto || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} alt={user?.nama} />
                            </div>
                        </div>
                        <div className='flex flex-col space-y-10 items-center justify-center'>
                            <p className="card-title text-4xl text-gray-600 font-bold">{user?.nama}</p>
                            <div className="flex flex-col space-y-8">
                                <div className='flex flex-row space-x-24 gap-24 justify-center'>
                                    <div className="flex flex-col space-y-6">
                                        <div>
                                            <p className="text-gray-600 font-bold">Email</p>
                                            <p className='text-gray-500 font-semibold'>{user?.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600 font-bold">No telepon</p>
                                            <p className='text-gray-500 font-semibold'>{user?.noTelp}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-y-6">
                                        <div>
                                            <p className="text-gray-600 font-bold">Tanggal lahir</p>
                                            <p className='text-gray-500 font-semibold'>{user?.tanggalLahir}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600 font-bold">Jumlah peringatan</p>
                                            <p className='text-gray-500 font-semibold'>{user?.jumlahPeringatan}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 font-bold">Jenis kelamin</p>
                                        <p className='text-gray-500 font-semibold'>{user?.jenisKelamin}</p>
                                    </div>
                                </div>
                                <div className="items-center justify-center">
                                    <div className="items-center justify-center">
                                        <p className="text-gray-600 font-bold">Bio</p>
                                        <p className="text-gray-500 font-semibold break-words max-w-screen-md">{user?.bio}</p>
                                    </div>
                                </div>
                            </div>   
                        </div>
                    </div>
                    <div className='flex justify-center space-x-2 pt-20 pb-5'>
                        <button className='btn btn-error px-14 text-white-100' onClick={handleButtonClick}>Back</button>
                        <button className='btn bg-orange-500 text-white-100'>Kasih peringatan</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDetail;