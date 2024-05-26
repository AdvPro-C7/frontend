'use client'
import React, { useState } from 'react';

type PasswordChangeModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (newPassword: string) => void;
};

const PasswordChangeModal: React.FC<PasswordChangeModalProps> = ({ isOpen, onClose, onSave }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSave = () => {
        if (password === confirmPassword) {
            onSave(password);
            onClose();
        } else {
            alert('Passwords do not match.');
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Change Password</h2>
                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered w-full mb-4"
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input input-bordered w-full mb-4"
                />
                <div className="flex justify-end">
                    <button className="btn mr-2" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="btn btn-primary" onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PasswordChangeModal;
