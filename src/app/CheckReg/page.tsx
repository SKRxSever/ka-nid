'use client';
import React, { useState } from 'react';
import Navbar from '../components/navbar';

const CheckReg: React.FC = () => {
    const [idCardNumber, setIdCardNumber] = useState('');

    const handleSearch = () => {
        console.log('Searching for ID Card Number:', idCardNumber);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-white">
            <Navbar />
            <div className="bg-white p-6 rounded-2xl shadow-xl text-gray-800 w-96 text-center">
                <h1 className="text-3xl font-bold mb-2 text-indigo-600">ตรวจสอบการลงทะเบียน</h1>
                <p className="mb-4 text-gray-600">กรอกเลขบัตรประชาชนเพื่อค้นหา</p>
                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="กรอกเลขบัตรประชาชน"
                        value={idCardNumber}
                        onChange={(e) => setIdCardNumber(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <button 
                        onClick={handleSearch} 
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg transition-all">
                        ค้นหา
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckReg;