import React, { useState } from 'react';

interface Exam {
    name: string;
    exam_date: string;
    exam_time: string;
    opening_date: string;
    opening_time: string;
    closing_date: string;
    closing_time: string;
    exam_levels: string[];
}

interface ExamFormProps {
    onSubmit: (examData: Exam) => Promise<void>;
}

const ExamForm: React.FC<ExamFormProps> = ({ onSubmit }) => {
    const [examName, setExamName] = useState<string>('');
    const [examDate, setExamDate] = useState<string>('');
    const [examTime, setExamTime] = useState<string>('');
    const [openingDate, setOpeningDate] = useState<string>('');
    const [openingTime, setOpeningTime] = useState<string>('');
    const [closingDate, setClosingDate] = useState<string>('');
    const [closingTime, setClosingTime] = useState<string>('');
    const [exam_levels, setExamLevels] = useState<string[]>([]);

    const handleExamLevelChange = (level: string) => {
        setExamLevels((prevLevels) =>
            prevLevels.includes(level)
                ? prevLevels.filter((l) => l !== level)
                : [...prevLevels, level]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const examData: Exam = {
            name: examName,
            exam_date: examDate,
            exam_time: examTime,
            opening_date: openingDate,
            opening_time: openingTime,
            closing_date: closingDate,
            closing_time: closingTime,
            exam_levels: exam_levels,
        };
        await onSubmit(examData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
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
                <label htmlFor="examTime" className="block text-gray-800 font-semibold mb-2">เวลาสอบ:</label>
                <input
                    type="text"
                    id="examTime"
                    className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm transition-all duration-200 ease-in-out focus:shadow-lg"
                    value={examTime}
                    onChange={(e) => setExamTime(e.target.value)}
                    placeholder="เช่น 09:00-10:00"
                    required
                />
            </div>
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
            <div>
                <label className="block text-gray-800 font-semibold mb-2">ระดับชั้นที่จัดสอบ:</label>
                <div className="grid grid-cols-2 gap-4 mt-2">
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
            <button
                type="submit"
                className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition duration-300 shadow-lg font-semibold transform transition-transform hover:scale-105"
            >
                สร้างกำหนดการสอบ
            </button>
        </form>
    );
};

export default ExamForm;