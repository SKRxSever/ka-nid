import React from 'react';
import { formatDate, formatExamTime, formatTime } from '../utils/dateUtils';

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

interface ExamTableProps {
    exams: Exam[];
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
}

const ExamTable: React.FC<ExamTableProps> = ({ exams, onDelete, onEdit }) => {
    return (
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-purple-500 text-white">
                <tr>
                    <th className="py-3 px-4 text-left">รายวิชาที่สอบ</th>
                    <th className="py-3 px-4 text-left">วันสอบ</th>
                    <th className="py-3 px-4 text-left">เวลาสอบ</th>
                    <th className="py-3 px-4 text-left">วันเปิดรับสมัคร</th>
                    <th className="py-3 px-4 text-left">เวลาปิดรับสมัคร</th>
                    <th className="py-3 px-4 text-left">ระดับชั้นที่จัดสอบ</th>
                    <th className="py-3 px-4 text-left"></th>
                </tr>
            </thead>
            <tbody className="text-gray-700">
                {exams.map((exam) => (
                    <tr key={exam.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4">{exam.name}</td>
                        <td className="py-3 px-4">{formatDate(exam.exam_date || '')}</td>
                        <td className="py-3 px-4">{formatExamTime(exam.exam_time || '')}</td>
                        <td className="py-3 px-4">
                            {formatDate(exam.opening_date ?? '')} | {formatTime(exam.opening_time ?? '')} น.
                        </td>
                        <td className="py-3 px-4">
                            {formatDate(exam.closing_date || '')} | {formatTime(exam.closing_time || '')} น.
                        </td>
                        <td className="py-3 px-4">
                            {(Array.isArray(exam.exam_levels) ? exam.exam_levels : (exam.exam_levels ?? '').split(','))
                                .map((level) => {
                                    const trimmedLevel = level.trim();
                                    if (!trimmedLevel) return '';

                                    const levelMap: { [key: string]: string } = {
                                        P1: 'ป.1',
                                        P2: 'ป.2',
                                        P3: 'ป.3',
                                        P4: 'ป.4',
                                        P5: 'ป.5',
                                        P6: 'ป.6',
                                        M1: 'ม.1',
                                        M2: 'ม.2',
                                        M3: 'ม.3',
                                        M4: 'ม.4',
                                        M5: 'ม.5',
                                        M6: 'ม.6',
                                    };
                                    return levelMap[trimmedLevel] || trimmedLevel;
                                })
                                .filter(level => level !== '')
                                .join(', ')}
                        </td>
                        <td className="py-3 px-4 flex space-x-2">
                            <button
                                onClick={() => exam.id !== undefined && onEdit(exam.id)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition duration-300"
                            >
                                แก้ไข
                            </button>
                            <button
                                onClick={() => onDelete(exam.id ?? 0)}
                                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                            >
                                ลบ
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ExamTable;