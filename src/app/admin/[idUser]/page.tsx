"use client"

import { useRouter } from 'next/navigation';

const UserDetail = () => {
    const router = useRouter();

    const handleButtonClick = () => {
        router.push(`/admin`);
    };

    return (
        <div className="bg-white-100">
            <div className='min-h-screen flex pt-32 pb-6 justify-center'>
                <div className='flex flex-col space-y-4 justify-center items-center'>
                    <div className='flex flex-col space-y-4 items-center'>
                        <div className="avatar ">
                            <div className="w-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <div className='flex flex-col space-y-10 items-center justify-center'>
                            <p className="card-title text-4xl text-gray-600 font-bold">Pratama Arhan</p>
                            <div className="flex flex-col space-y-8">
                                <div className='flex flex-row space-x-24 gap-24 justify-center'>
                                    <div className="flex flex-col space-y-6">
                                        <div>
                                            <p className="text-gray-600 font-bold">Email</p>
                                            <p className='text-gray-500 font-semibold'>PratamaArhan@gmail.com</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600 font-bold">No telepon</p>
                                            <p className='text-gray-500 font-semibold'>081268985678</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-y-6">
                                        <div>
                                            <p className="text-gray-600 font-bold">Tanggal lahir</p>
                                            <p className='text-gray-500 font-semibold'>12 Januari 2001</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600 font-bold">Jumlah peringatan</p>
                                            <p className='text-gray-500 font-semibold'>0</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 font-bold">Jenis kelamin</p>
                                        <p className='text-gray-500 font-semibold'>Perempuan</p>
                                    </div>
                                </div>
                                <div className="items-center justify-center">
                                    <div className="items-center justify-center">
                                        <p className="text-gray-600 font-bold">Bio</p>
                                        <p className="text-gray-500 font-semibold break-words max-w-screen-md"></p>
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