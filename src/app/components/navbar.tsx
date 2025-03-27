"use client";
import React, { useState, useEffect } from 'react';
import LoginModal from './LoginModal';
import RegisterForm from './RegisterForm';
import RegisterGroup from './RegisterGroup';

const Navbar: React.FC = () => {
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isGroupRegisterOpen, setIsGroupRegisterOpen] = useState(false);
    const [showRegisterOptions, setShowRegisterOptions] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [currentPath, setCurrentPath] = useState('');

    useEffect(() => {
        setCurrentPath(window.location.pathname);
    }, []);

    const isActive = (path: string) => {
        return currentPath === path;
    };

    const toggleRegisterOptions = () => {
        setShowRegisterOptions(!showRegisterOptions);
    };

    const handleRegisterClick = (isGroup: boolean) => {
        setShowRegisterOptions(false);
        if (isGroup) {
            setIsLoginOpen(true);
        } else {
            setIsRegisterOpen(true);
        }
    };

    const closeModal = () => {
        setIsRegisterOpen(false);
        setIsGroupRegisterOpen(false);
        setShowRegisterOptions(false);
        setIsLoginOpen(false);
    };

    const handleSignUpClick = () => {
        setIsLoginOpen(false);
        setIsGroupRegisterOpen(true);
    };

    return (
        <div className="fixed top-12 left-0 w-full flex justify-center items-center px-4">
            <div className="absolute left-4">
                <img src="/imgs/Math.png" alt="Logo" className="h-24 w-65" />
            </div>
            <nav className="bg-sky-500 bg-opacity-75 py-2 px-4 w-6/12 hover:bg-opacity-100 transition duration-300 ease-in-out rounded-lg shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex space-x-12 ml-9">
                        {['/', '/CheckReg', '/How2', '/About'].map((path, idx) => (
                            <a
                                key={idx}
                                href={path}
                                className={`px-2.5 p-1 rounded-lg text-lg transform transition duration-300 ease-in-out ${isActive(path) ? 'bg-blue-700 text-white hover:scale-110' : 'text-blue-200 hover:text-white hover:scale-110'
                                    }`}
                            >
                                {['หน้าหลัก', 'ตรวจสอบการลงทะเบียน', 'วิธีสมัครสอบ', 'ข้อมูลติดต่อ'][idx]}
                            </a>
                        ))}
                    </div>
                </div>
            </nav>
            <div className="absolute right-14">
                <button onClick={toggleRegisterOptions} className="text-lg bg-blue-500 text-white py-1.5 px-9 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out shadow-md">
                    ลงทะเบียน
                </button>
                {showRegisterOptions && (
                    <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg p-3">
                        <button onClick={() => handleRegisterClick(false)} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg">ลงทะเบียนเดี่ยว</button>
                        <button onClick={() => handleRegisterClick(true)} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg">ลงทะเบียนหลายคน</button>
                    </div>
                )}
            </div>

            <RegisterForm isOpen={isRegisterOpen} onClose={closeModal} />
            <RegisterGroup isOpen={isGroupRegisterOpen} onClose={closeModal} />
            <LoginModal isOpen={isLoginOpen} onClose={closeModal} onSignUpClick={handleSignUpClick} />
        </div>
    );
};

export default Navbar;