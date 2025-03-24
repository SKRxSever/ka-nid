'use client';
import { motion } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';

interface RegisterFormProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Exam {
    id: string;
    name: string;
}

const RegisterForm: FC<RegisterFormProps> = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        citizenId: '',
        tel: '',
        class: '',
        school: '',
        subject: '',
    });
    const [slipFile, setSlipFile] = useState<File | null>(null);
    const [slipPreview, setSlipPreview] = useState<string | null>(null);
    const [exams, setExams] = useState<Exam[]>([]);

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await fetch('/api/getrx');
                if (!response.ok) {
                    throw new Error('Failed to fetch exams');
                }
                const data = await response.json();
                if (Array.isArray(data)) {
                    setExams(data);
                } else {
                    console.error('Invalid data format:', data);
                    setExams([]);
                }
            } catch (error) {
                console.error('Failed to fetch exams:', error);
                setExams([]);
            }
        };

        fetchExams();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSlipFile(file);
            setSlipPreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveFile = () => {
        setSlipFile(null);
        setSlipPreview(null);
    };

    const handleNext = () => setStep(2);
    const handleBack = () => setStep(1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!slipFile) {
            alert('กรุณาอัปโหลดสลิปเงิน');
            return;
        }

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value);
        });
        formDataToSend.append('slip', slipFile);

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                body: formDataToSend,
            });
            const result = await response.json();
            if (!response.ok) {
                alert(result.error);
            } else {
                alert(result.message);
                onClose();
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('เกิดข้อผิดพลาด โปรดลองอีกครั้ง');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                    <div className="flex items-center justify-center space-x-3">
                        <img src="/imgs/skr.png" alt="Register" className="h-16 w-12 object-contain drop-shadow-lg" />
                        <h1 className="text-2xl font-bold text-white text-center">
                            {step === 1 ? 'ลงทะเบียนสมัครสอบ' : 'เลือกวิชาและเวลาสอบ'}
                        </h1>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {step === 1 ? (
                        <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-4">
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">ชื่อ</label>
                                        <input
                                            type="text"
                                            name="fname"
                                            value={formData.fname}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            placeholder="กรุณากรอกชื่อ"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">นามสกุล</label>
                                        <input
                                            type="text"
                                            name="lname"
                                            value={formData.lname}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            placeholder="กรุณากรอกนามสกุล"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">เลขบัตรประชาชน</label>
                                    <input
                                        type="text"
                                        name="citizenId"
                                        value={formData.citizenId}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        placeholder="X-XXXX-XXXXX-XX-X"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">เบอร์โทรศัพท์</label>
                                    <input
                                        type="tel"
                                        name="tel"
                                        value={formData.tel}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        placeholder="08X-XXX-XXXX"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">โรงเรียน</label>
                                    <input
                                        type="text"
                                        name="school"
                                        value={formData.school}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        placeholder="กรุณากรอกชื่อโรงเรียน"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">ระดับชั้น</label>
                                    <select
                                        name="class"
                                        value={formData.class}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-select-arrow bg-no-repeat bg-right-4"
                                    >
                                        <option value="" disabled>เลือกระดับชั้นปัจจุบัน</option>
                                        {['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'M1', 'M2', 'M3', 'M4', 'M5', 'M6'].map(level => (
                                            <option key={level} value={level}>
                                                {level.startsWith('P') ? `ประถมศึกษาปีที่ ${level.slice(1)}` : `มัธยมศึกษาปีที่ ${level.slice(1)}`}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-95"
                            >
                                ดำเนินการต่อ →
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div className="gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">วิชาสอบ</label>
                                        <select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-select-arrow bg-no-repeat bg-right-4"
                                        >
                                            <option value="" disabled>เลือกวิชาที่ต้องการสอบ</option>
                                            {Array.isArray(exams) && exams.length > 0 ? (
                                                exams.map((exam) => (
                                                    <option key={exam.id} value={exam.name}>
                                                        {exam.name}
                                                    </option>
                                                ))
                                            ) : (
                                                <option value="" disabled>ไม่มีข้อมูลวิชาสอบ</option>
                                            )}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">อัปโหลดสลิปเงิน</label>
                                    <div className="flex items-center justify-center w-full">
                                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                                            {slipPreview ? (
                                                <img src={slipPreview} alt="Slip Preview" className="h-28 w-full object-cover rounded-lg" />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">คลิกเพื่ออัปโหลด</span> หรือลากและวาง</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG (MAX. 1MB)</p>
                                                </div>
                                            )}
                                            <input type="file" className="hidden" onChange={handleFileChange} accept="image/png, image/jpeg" />
                                        </label>
                                    </div>
                                    {slipPreview && (
                                        <button
                                            type="button"
                                            onClick={handleRemoveFile}
                                            className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-95"
                                        >
                                            ลบไฟล์
                                        </button>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">ชำระเงินผ่าน QR Code</label>
                                    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                        <img src="/imgs/slip.jpg" alt="QR Code" className="h-full w-32 mb-4" />
                                        <p className="text-sm text-gray-700 dark:text-gray-200">เลขบัญชี: 123-456-7890</p>
                                        <p className="text-sm text-gray-700 dark:text-gray-200">ชื่อบัญชี: ธีรภัทร เสนาคำ</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between gap-3">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-95"
                                >
                                    ← ย้อนกลับ
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-95"
                                >
                                    ยืนยันการสมัคร ✓
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default RegisterForm;