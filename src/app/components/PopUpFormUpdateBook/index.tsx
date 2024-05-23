import React, { useState } from 'react';
import { BookDetailProps } from '../../types/BookDetailProps';

type PopupFormProps = {
    bookDetails: BookDetailProps;
    onClose: () => void;
    onSubmit: (data: BookDetailProps) => void;
};

const PopUpFormUpdateBook: React.FC<PopupFormProps> = ({ bookDetails, onClose, onSubmit }) => {
    const [formData, setFormData] = useState<BookDetailProps>(bookDetails);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
    if (isNaN(formData.price) || formData.price <= 0) {
        newErrors.price = 'Harga harus berupa angka dan lebih besar dari 0';
    }

    if (isNaN(formData.stock) || formData.stock <= 0) {
        newErrors.stock = 'Stok harus berupa angka dan lebih besar dari 0';
    }

    if (isNaN(formData.pages) || formData.pages <= 0) {
        newErrors.pages = 'Jumlah halaman harus berupa angka dan lebih besar dari 0';
    }

    return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        onSubmit(formData);
        onClose(); // Tutup pop-up setelah berhasil menambahkan buku
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 pt-10 pb-10">
            <div className="bg-slate-100 p-8 rounded shadow-lg w-1/3 max-h-full overflow-auto">
                <h2 className="text-xl mb-4 text-gray-700">Edit Book Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Publisher</label>
                        <input
                            type="text"
                            name="publisher"
                            value={formData.publisher}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-white-100"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Harga</label>
                        <input
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-white-100"
                        />
                        {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Deskripsi</label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-white-100"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Stok</label>
                        <input
                            type="text"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-white-100"
                        />
                        {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Tanggal Rilis</label>
                        <input
                            type="text"
                            name="publishDate"
                            value={formData.publishDate}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-white-100"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Kategori</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-white-100"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">ISBN</label>
                        <input
                            type="text"
                            name="isbn"
                            value={formData.isbn}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-white-100"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Pages</label>
                        <input
                            type="text"
                            name="pages"
                            value={formData.pages}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-white-100"
                        />
                        {errors.pages && <p className="text-red-500 text-xs mt-1">{errors.pages}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Cover</label>
                        <input
                            type="text"
                            name="coverPicture"
                            value={formData.coverPicture}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-white-100"
                        />
                    </div>
                    {/* Add more fields as needed */}
                    <div className="flex justify-between">
                        <button type="button" onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-white-100">
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white-100 font-bold py-2 px-4 rounded">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PopUpFormUpdateBook;