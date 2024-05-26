import React, { useState } from 'react';

type PopupFormProps = {
    onClose: () => void;
};

const UserDetail: React.FC<PopupFormProps> = ({ onClose }) => {
  const [showDetail, setShowDetail] = useState(false);

  const toggleDetail = () => {
    setShowDetail(!showDetail);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 pt-10 pb-10">
        <div className='bg-sky-500 p-8 rounded shadow-lg w-/3 max-h-full overflow-x'>
            <div className='flex flex-col space-y-4'>
                <div className='flex flex-col space-y-4 items-center'>
                        <div className="avatar ">
                            <div className="w-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <p className="card-title text-4xl text-white-100">Pratama Arhan</p>
                            <div className='flex flex-row space-x-10'>
                                <div>
                                    <div>
                                        <p>Email</p>
                                        <p className='text-white-100'>PratamaArhan@gmail.com</p>
                                    </div>
                                    <div>
                                        <p>No telepon</p>
                                        <p className='text-white-100'>081268985678</p>
                                    </div>
                                    <div>
                                        <p>Jenis kelamin</p>
                                        <p className='text-white-100'>Perempuan</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p>Tanggal lahir</p>
                                        <p className='text-white-100'>12 Januari 2001</p>
                                    </div>
                                    <div>
                                        <p>Jumlah peringatan</p>
                                        <p className='text-white-100'>0</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p>Bio</p>
                                <p className='text-white-100'>Saya adalah seseorang yang suka bermain bola dengan lemparan saya yang sangat luar biasa jauhnya kemampaun saya bahkan diakui oleh legenda dunia yaitu madun dan ceking</p>
                            </div>
                            
                        </div>
                        </div>
                <div className='flex justify-center space-x-2'>
                    <button className='btn btn-error text-white-100' onClick={onClose}>Back</button>
                    <button className='btn bg-orange-500 text-white-100'>Kasih peringatan</button>
                </div>
            </div>
        </div>
            
    </div>
  );
};

export default UserDetail;