'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSignUpClick: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSignUpClick }) => {
    const [citizenId, setIdCard] = useState('');
    const [tel, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            // เรียก API เพื่อตรวจสอบข้อมูล
            const response = await fetch('/api/loginreqadmin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ citizenId, tel }),
            });

            const data = await response.json();

            if (data.success) {
                // หากข้อมูลถูกต้อง
                router.push('/reqadmin/dashboard');
            } else {
                // หากข้อมูลไม่ถูกต้อง
                setError(data.error || 'ข้อมูลไม่ถูกต้องหรือสถานะไม่ได้รับการอนุมัติ');
            }
        } catch (err) {
            console.error('เกิดข้อผิดพลาดในการเชื่อมต่อ:', err);
            setError('เกิดข้อผิดพลาดในการเชื่อมต่อ');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                    <div className="flex items-center justify-center space-x-3">
                        <img src="/imgs/skr.png" alt="Login" className="h-16 w-12 object-contain drop-shadow-lg" />
                        <h1 className="text-2xl font-bold text-white text-center">ล็อคอิน</h1>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">เลขบัตรประชาชน</label>
                                <input
                                    type="text"
                                    placeholder="เลขบัตรประชาชน"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    required
                                    value={citizenId}
                                    onChange={(e) => setIdCard(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">เบอร์โทรศัพท์</label>
                                <input
                                    type="text"
                                    placeholder="เบอร์โทรศัพท์"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    required
                                    value={tel}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-95"
                        >
                            ล็อคอิน
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-gray-700 dark:text-gray-300">
                            ยังไม่มีบัญชี?{' '}
                            <button
                                onClick={onSignUpClick}
                                className="text-blue-500 hover:text-blue-600 font-semibold hover:underline"
                            >
                                สมัครสมาชิก
                            </button>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginModal;