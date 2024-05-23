import React, { useState } from 'react';
import { BookDetailProps, BookDetailPropsForAdd } from '../../types/BookDetailProps';

type PopupFormProps = {
    onClose: () => void;
    onSubmit: (data: BookDetailPropsForAdd) => void;
};

const PopUpFormAddBook: React.FC<PopupFormProps> = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState<BookDetailPropsForAdd>({
        title: '',
        author: '',
        publisher: '',
        price: 0,
        description: '',
        stock: 0,
        publishDate: '',
        isbn: '',
        pages: 0,
        coverPicture: '',
        sold: 0,
        category: ''
    });
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

        if (!formData.title.trim()) {
            newErrors.title = 'Judul tidak boleh kosong';
        }
    
        if (!formData.author.trim()) {
            newErrors.author = 'Penulis tidak boleh kosong';
        }
    
        if (!formData.publisher.trim()) {
            newErrors.publisher = 'Penerbit tidak boleh kosong';
        }
    
        if (!formData.description.trim()) {
            newErrors.description = 'Deskripsi tidak boleh kosong';
        }
    
        if (!formData.publishDate.trim()) {
            newErrors.publishDate = 'Tanggal rilis tidak boleh kosong';
        }
    
        if (!formData.isbn.trim()) {
            newErrors.isbn = 'ISBN tidak boleh kosong';
        }
    
        if (!formData.coverPicture.trim()) {
            newErrors.coverPicture = 'Gambar sampul tidak boleh kosong';
        }

        if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
            newErrors.price = 'Harga harus berupa angka dan lebih besar dari 0';
        }

        if (isNaN(Number(formData.stock)) || Number(formData.stock) <= 0) {
            newErrors.stock = 'Stok harus berupa angka dan lebih besar dari 0';
        }

        if (isNaN(Number(formData.pages)) || Number(formData.pages) <= 0) {
            newErrors.pages = 'Jumlah halaman harus berupa angka dan lebih besar dari 0';
        }

        return newErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        onSubmit(formData);
        onClose(); // Close the pop-up after submitting
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 pt-10 pb-10">
            <div className="bg-slate-100 p-8 rounded shadow-lg w-1/3 max-h-full overflow-auto">
                <h2 className="text-xl mb-4 text-gray-700">Add Book</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder='Judul buku...'
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-white-100"
                        />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Author</label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            placeholder='Penulis...'
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-white-100"
                        />
                        {errors.author && <p className="text-red-500 text-xs mt-1">{errors.author}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Publisher</label>
                        <input
                            type="text"
                            name="publisher"
                            value={formData.publisher}
                            onChange={handleChange}
                            placeholder='Penerbit...'
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-white-100"
                        />
                        {errors.publisher && <p className="text-red-500 text-xs mt-1">{errors.publisher}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Harga</label>
                        <input
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder='Harga...'
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-white-100"
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
                            placeholder='Deskripsi...'
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-white-100"
                        />
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Stok</label>
                        <input
                            type="text"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            placeholder='Jumlah stok...'
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-white-100"
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
                            placeholder='Tanggal rilis...'
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-white-100"
                        />
                        {errors.publishDate && <p className="text-red-500 text-xs mt-1">{errors.publishDate}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">ISBN</label>
                        <input
                            type="text"
                            name="isbn"
                            value={formData.isbn}
                            onChange={handleChange}
                            placeholder='ISBN...'
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-white-100"
                        />
                        {errors.isbn && <p className="text-red-500 text-xs mt-1">{errors.isbn}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Pages</label>
                        <input
                            type="text"
                            name="pages"
                            value={formData.pages}
                            onChange={handleChange}
                            placeholder='Jumlah halaman...'
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-white-100"
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
                            placeholder='Cover...'
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-white-100"
                        />
                        {errors.coverPicture && <p className="text-red-500 text-xs mt-1">{errors.coverPicture}</p>}
                    </div>
                    <div className="flex justify-between">
                        <button type="button" onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PopUpFormAddBook;