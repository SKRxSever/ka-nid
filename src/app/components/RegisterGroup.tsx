'use client';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

interface RegisterGroupProps {
    isOpen: boolean;
    onClose: () => void;
}

const RegisterGroup: React.FC<RegisterGroupProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        citizenId: '',
        tel: '',
        citizenImg: null as File | null,
        previewUrl: ''
    });

    const handleChange = (field: string, value: string | File | null) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const formDataData = new FormData();
        formDataData.append('fname', formData.fname);
        formDataData.append('lname', formData.lname);
        formDataData.append('citizenId', formData.citizenId);
        formDataData.append('tel', formData.tel);
        if (formData.citizenImg) {
            formDataData.append('citizenImg', formData.citizenImg);
        }
    
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                body: formDataData
            });
    
            if (response.ok) {
                console.log('Registration successful');
                onClose();
            } else {
                const errorData = await response.json();
                console.error('Registration failed:', errorData.error);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setFormData({ ...formData, citizenImg: file, previewUrl });
        }
    };

    const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={handleBackgroundClick}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                    <div className="flex items-center justify-center space-x-3">
                        <img src="/imgs/skr.png" alt="Register" className="h-16 w-12 object-contain drop-shadow-lg" />
                        <h1 className="text-2xl font-bold text-white text-center">สมัครสมาชิก</h1>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">ชื่อ</label>
                                    <input
                                        type="text"
                                        placeholder="ชื่อ"
                                        value={formData.fname}
                                        onChange={(e) => handleChange('fname', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">นามสกุล</label>
                                    <input
                                        type="text"
                                        placeholder="นามสกุล"
                                        value={formData.lname}
                                        onChange={(e) => handleChange('lname', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">เลขบัตรประชาชน</label>
                                <input
                                    type="text"
                                    placeholder="เลขบัตรประชาชน"
                                    value={formData.citizenId}
                                    onChange={(e) => handleChange('citizenId', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">เบอร์โทรศัพท์</label>
                                <input
                                    type="tel"
                                    placeholder="xxx-xxx-xxxx"
                                    value={formData.tel}
                                    onChange={(e) => handleChange('tel', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">อัปโหลดรูปภาพสำเนาบัตรประชาชน</label>
                                <div className="relative w-full group">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div className="flex items-center justify-center w-full px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md transition duration-200 cursor-pointer group-hover:bg-blue-600">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                        </svg>
                                        เลือกไฟล์เพื่ออัปโหลด
                                    </div>
                                </div>
                                {formData.previewUrl && (
                                    <div className="mt-4 flex justify-center">
                                        <img src={formData.previewUrl} alt="ID Preview" className="w-40 h-40 rounded-lg border border-gray-300" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-95"
                        >
                            ส่งข้อมูล
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default RegisterGroup;
