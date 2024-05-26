"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Admin: React.FC = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState<any[]>([]);

    const handleButtonClick = (id: number) => {
        router.push(`/admin/${id}`);
    };

    const handleSearch = async () => {
        try {
            console.log("Sending search query:", searchQuery);
            const response = await axios.get(`http://localhost:8080/users/search`, {
                params: {
                    email: searchQuery,
                    nama: searchQuery,
                }
            });
            console.log("Received response:", response.data);
            setUsers(response.data);
        } catch (error) {
            console.error("Error searching users:", error);
        }
    };

    return (
        <div className='min-h-screen flex flex-col space-y-4 items-center pt-36 pb-6'>
            <div className="w-full max-w-md">
                <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Search by name or email"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-primary w-full mt-2" onClick={handleSearch}>Search</button>
            </div>
            <div className="w-full flex flex-wrap gap-2 justify-center">
                {users.map(user => (
                    <div key={user.id} className="card w-96 bg-grey-100 shadow-x">
                        <div className="card-body items-center text-center">
                            <div className='flex flex-col space-y-4 items-center'>
                                <div className="avatar">
                                    <div className="w-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={user.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} alt={user.name} />
                                    </div>
                                </div>
                                <div>
                                    <p className="card-title text-4xl text-white-100 text-center justify-center">{user.nama}</p>
                                    <p className='text-white-100'>{user.email}</p>
                                    <p className='text-white-100'>{user.noTelp}</p>
                                </div>
                            </div>
                            <div className="card-actions">
                                <button className="btn btn-primary text-white-100" onClick={() => handleButtonClick(user.id)}>Lihat Detail</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Admin;