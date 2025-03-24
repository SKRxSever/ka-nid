import React, { useEffect, useState } from 'react';

export interface Exam {
    id?: number;
    name: string;
    exam_date?: string;
    exam_time?: string;
    opening_date?: string;
    opening_time?: string;
    closing_date?: string;
    closing_time?: string;
    exam_levels?: string[];
}

interface EditExamModalProps {
    exam: Exam;
    onClose: () => void;
    onUpdate: (updatedExam: Exam) => Promise<void>;
}

const EditExamModal: React.FC<EditExamModalProps> = ({ exam, onClose, onUpdate }) => {
    const [examName, setExamName] = useState<string>(exam.name || '');
    const [examDate, setExamDate] = useState<string>(exam.exam_date || '');
    const [examTime, setExamTime] = useState<string>(exam.exam_time || 'morning');
    const [openingDate, setOpeningDate] = useState<string>(exam.opening_date || '');
    const [openingTime, setOpeningTime] = useState<string>(exam.opening_time || '');
    const [closingDate, setClosingDate] = useState<string>(exam.closing_date || '');
    const [closingTime, setClosingTime] = useState<string>(exam.closing_time || '');
    const [exam_levels, setExamLevels] = useState<string[]>(exam.exam_levels || []);

    // อัปเดต state เมื่อ `exam` เปลี่ยน
    useEffect(() => {
        setExamName(exam.name || '');
        setExamDate(exam.exam_date || '');
        setExamTime(exam.exam_time || 'morning');
        setOpeningDate(exam.opening_date || '');
        setOpeningTime(exam.opening_time || '');
        setClosingDate(exam.closing_date || '');
        setClosingTime(exam.closing_time || '');
        setExamLevels(exam.exam_levels || []);
    }, [exam]);

    const handleExamLevelChange = (level: string) => {
        setExamLevels((prevLevels) =>
            prevLevels.includes(level)
                ? prevLevels.filter((l) => l !== level)
                : [...prevLevels, level]
        );
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!examName.trim()) {
            alert('กรุณากรอกชื่อวิชา');
            return;
        }
        if (!examDate) {
            alert('กรุณาเลือกวันที่สอบ');
            return;
        }
        if (exam_levels.length === 0) {
            alert('กรุณาเลือกระดับชั้นที่จัดสอบ');
            return;
        }
        
        const examData: Exam = {
            id: exam.id,
            name: examName,
            exam_date: examDate,
            exam_time: examTime,
            opening_date: openingDate,
            opening_time: openingTime,
            closing_date: closingDate,
            closing_time: closingTime,
            exam_levels,
        };
    
        try {
            await onUpdate(examData);
            onClose();
        } catch (error) {
            console.error('Error updating exam:', error);
            alert('เกิดข้อผิดพลาดในการอัปเดตกำหนดการสอบ');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-screen-md max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">แก้ไขกำหนดการสอบ</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* ชื่อวิชา */}
                    <div>
                        <label htmlFor="examName" className="block text-gray-800 font-semibold mb-2">รายวิชาที่สอบ:</label>
                        <input
                            type="text"
                            id="examName"
                            className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm transition-all duration-200 ease-in-out focus:shadow-lg"
                            value={examName}
                            onChange={(e) => setExamName(e.target.value)}
                            required
                        />
                    </div>

                    {/* วันสอบและเวลาสอบ */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="examDate" className="block text-gray-800 font-semibold mb-2">กำหนดวันสอบ:</label>
                            <input
                                type="date"
                                id="examDate"
                                className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm transition-all duration-200 ease-in-out focus:shadow-lg"
                                value={examDate}
                                onChange={(e) => setExamDate(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-800 font-semibold mb-2">เวลาสอบ:</label>
                            <div className="flex space-x-4 mt-2">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="examTime"
                                        value="morning"
                                        checked={examTime === 'morning'}
                                        onChange={(e) => setExamTime(e.target.value)}
                                        className="hidden"
                                    />
                                    <span className={`w-6 h-6 border-2 border-purple-300 rounded-full flex items-center justify-center transition-all ${examTime === 'morning' ? 'bg-purple-500 border-purple-500' : ''}`}>
                                        {examTime === 'morning' && <span className="w-3 h-3 bg-white rounded-full"></span>}
                                    </span>
                                    <span className="text-gray-700">เช้า</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="examTime"
                                        value="afternoon"
                                        checked={examTime === 'afternoon'}
                                        onChange={(e) => setExamTime(e.target.value)}
                                        className="hidden"
                                    />
                                    <span className={`w-6 h-6 border-2 border-purple-300 rounded-full flex items-center justify-center transition-all ${examTime === 'afternoon' ? 'bg-purple-500 border-purple-500' : ''}`}>
                                        {examTime === 'afternoon' && <span className="w-3 h-3 bg-white rounded-full"></span>}
                                    </span>
                                    <span className="text-gray-700">บ่าย</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* วันเปิดรับสมัครและเวลาเปิดรับสมัคร */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="openingDate" className="block text-gray-800 font-semibold mb-2">กำหนดวันเปิดรับสมัคร:</label>
                            <input
                                type="date"
                                id="openingDate"
                                className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm transition-all duration-200 ease-in-out focus:shadow-lg"
                                value={openingDate}
                                onChange={(e) => setOpeningDate(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="openingTime" className="block text-gray-800 font-semibold mb-2">กำหนดเวลาเปิดรับสมัคร:</label>
                            <input
                                type="time"
                                id="openingTime"
                                className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm transition-all duration-200 ease-in-out focus:shadow-lg"
                                value={openingTime}
                                onChange={(e) => setOpeningTime(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* วันปิดรับสมัครและเวลาปิดรับสมัคร */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="closingDate" className="block text-gray-800 font-semibold mb-2">กำหนดวันปิดรับสมัคร:</label>
                            <input
                                type="date"
                                id="closingDate"
                                className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm transition-all duration-200 ease-in-out focus:shadow-lg"
                                value={closingDate}
                                onChange={(e) => setClosingDate(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="closingTime" className="block text-gray-800 font-semibold mb-2">กำหนดเวลาปิดรับสมัคร:</label>
                            <input
                                type="time"
                                id="closingTime"
                                className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm transition-all duration-200 ease-in-out focus:shadow-lg"
                                value={closingTime}
                                onChange={(e) => setClosingTime(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* ระดับชั้นที่จัดสอบ */}
                    <div>
                        <label className="block text-gray-800 font-semibold mb-2">ระดับชั้นที่จัดสอบ:</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                            {[
                                { value: 'P1', label: 'ป.1' },
                                { value: 'P2', label: 'ป.2' },
                                { value: 'P3', label: 'ป.3' },
                                { value: 'P4', label: 'ป.4' },
                                { value: 'P5', label: 'ป.5' },
                                { value: 'P6', label: 'ป.6' },
                                { value: 'M1', label: 'ม.1' },
                                { value: 'M2', label: 'ม.2' },
                                { value: 'M3', label: 'ม.3' },
                                { value: 'M4', label: 'ม.4' },
                                { value: 'M5', label: 'ม.5' },
                                { value: 'M6', label: 'ม.6' },
                            ].map(({ value, label }) => (
                                <label key={value} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="examLevels"
                                        value={value}
                                        checked={exam_levels.includes(value)}
                                        onChange={() => handleExamLevelChange(value)}
                                        className="hidden"
                                    />
                                    <span className={`w-6 h-6 border-2 border-purple-300 rounded-md flex items-center justify-center transition-all ${exam_levels.includes(value) ? 'bg-purple-500 border-purple-500' : ''}`}>
                                        {exam_levels.includes(value) && (
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        )}
                                    </span>
                                    <span className="text-gray-700">{label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* ปุ่ม */}
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition duration-300 shadow-lg font-semibold transform transition-transform hover:scale-105"
                        >
                            อัปเดตกำหนดการสอบ
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition duration-300 shadow-lg font-semibold transform transition-transform hover:scale-105"
                        >
                            ปิด
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditExamModal;