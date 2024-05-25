'use client'
import React, { useEffect, useState } from 'react';
import { userContext } from "../contexts/AuthContext";
import { useRouter } from "next/navigation"; 
import { IoPersonCircleOutline } from "react-icons/io5";
import {Cloudinary} from "@cloudinary/url-gen";
import UploadWidget from '../components/UploadWidget';

type UserProps = {
    nama: string;
    email: string;
    noTelp: string;
    foto: string;
    jenisKelamin: string;
    tanggalLahir: Date;
    bio: string;
}

const UserProfile: React.FC = () => {
    const [userData, setUserData] = useState<UserProps | null>(null);
    const { state } = userContext();
    const [publicId, setPublicId] = useState("");

    const [cloudName] = useState("dzjfu0tcd");
    const [uploadPreset] = useState("ml_default");

    const router = useRouter();

    const [isLoaded, setIsLoaded] = useState(false);
    const [isSelected, setIsSelected] = useState('MyInfo');

    const fetchUser = async () => {
        setIsLoaded(true);
        try {
            const response = await fetch('https://api.example.com/user', {
                headers: { 'Authorization': `Bearer ${state.authenticated}` }
            });
            if (response.ok) {
                const fetchedUser = await response.json();
                setUserData(fetchedUser as UserProps);
            } else {
                throw new Error('Failed to fetch user data: ' + response.statusText);
            }
        } catch (error) {
            console.error("Failed to retrieve user data: ", error);
        } finally {
            setIsLoaded(false);
        }
    }

    const handleInputChange = <K extends keyof UserProps>(key: K, value: UserProps[K]) => {
        setUserData(prev => ({
            ...prev,
            [key]: value,
        } as UserProps));
    };
    

    useEffect(() => {
        // if (isAuthenticated) {
            fetchUser();
        // } else {
        //     router.push('/login');
        // }
    }, []);

    const cld = new Cloudinary({
        cloud: {
            cloudName
        }
    });

    const [uwConfig] = useState({
        cloudName,
        uploadPreset
    });

    const renderMyInfo = () => {
        return (
            <div className='bg-white p-6 shadow-lg rounded-lg'>
                <div className='grid grid-cols-1 gap-6'>
                    <div>
                        <UploadWidget/>
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-800'>Nama Lengkap</label>
                        <input
                            type="text"
                            placeholder={userData?.nama || 'Nama Lengkap'}
                            value={userData?.nama || ''}
                            onChange={e => handleInputChange('nama', e.target.value)}
                            className='input input-bordered w-full max-w-md'
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-800'>Email</label>
                        <input
                            type="email"
                            placeholder={userData?.email || 'Email'}
                            value={userData?.email || ''}
                            onChange={e => handleInputChange('email', e.target.value)}
                            className='input input-bordered w-full max-w-md'
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-800'>Gender</label>
                        <select
                            value={userData?.jenisKelamin || ''}
                            onChange={e => handleInputChange('jenisKelamin', e.target.value)}
                            className='input input-bordered w-full max-w-md'
                        >
                            <option value="Laki-Laki">Laki-Laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-800'>Tanggal Lahir</label>
                        <input
                            type="date"
                            value={userData?.tanggalLahir?.toISOString().slice(0, 10) || ''}
                            onChange={e => handleInputChange('tanggalLahir', new Date(e.target.value))}
                            className='input input-bordered w-full max-w-md'
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-800'>No. Telp</label>
                        <input
                            type="tel"
                            placeholder={userData?.noTelp || 'Nomor Telepon'}
                            value={userData?.noTelp || ''}
                            onChange={e => handleInputChange('noTelp', e.target.value)}
                            className='input input-bordered w-full max-w-md'
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-800'>Bio</label>
                        <input
                            type="text"
                            placeholder={userData?.bio || 'Bio'}
                            value={userData?.bio || ''}
                            onChange={e => handleInputChange('bio', e.target.value)}
                            className='input input-bordered w-full max-w-md'
                        />
                    </div>
                </div>
            </div>
        );
    }

    const renderMyOrder = () => {
        return (
            <>
            </>
        )
    }
    
    return (
        <div className='flex min-h-screen bg-gray-100 pt-32'>
            <div className='w-64 p-5 bg-white'>
                {/* Sidebar */}
                <ul>
                    <li className='mb-2'>
                        <button className="text-lg w-full text-left py-2 px-4 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 rounded-md" onClick={() => setIsSelected('MyOrder')}>
                            Pesanan Saya
                        </button>
                    </li>
                    <li className='mb-2'>
                        <button className="text-lg w-full text-left py-2 px-4 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 rounded-md" onClick={() => setIsSelected('MyInfo')}>
                            Akun Saya
                        </button>
                    </li>
                    <li className='mb-2'>
                        <button className="text-lg w-full text-left py-2 px-4 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 rounded-md" onClick={() => router.push('/logout')}>
                            Keluar
                        </button>
                    </li>
                </ul>
            </div>

            {isSelected === 'MyInfo' ? (
                    <div className='flex-grow p-10'>
                        {renderMyInfo()}
                    </div>
                ) : (
                    <div className='flex-grow p-10'>
                        {renderMyOrder()}
                    </div>
                )}
            </div>

    );
}

export default UserProfile;
