'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const AdminLogin: React.FC = () => {
    const [citizenId, setUsername] = useState('');
    const [tel, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/loginadmin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ citizenId, tel }),
            });

            const data = await response.json();

            if (data.success) {
                alert(data.message);
                router.push('/admin/dashboard');
            } else {
                setError(data.message);
            }
        } catch (err) {
            console.error('Error during login:', err);
            setError('An error occurred during login');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/imgs/1.jpg')" }}>
            <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Admin Login</h2>
                <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">โครงการทดสอบความเป็นเลิศทางคณิตศาสตร์</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-semibold mb-2">Username</label>
                        <input 
                            type="text" 
                            placeholder="Enter your username" 
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={citizenId}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-semibold mb-2">Password</label>
                        <input 
                            type="password" 
                            placeholder="Enter your password" 
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={tel}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;