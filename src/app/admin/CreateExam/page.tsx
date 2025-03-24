'use client';
import React, { useEffect, useState } from 'react';
import EditExamModal from '../../components/EditExamModal';
import ExamForm from '../../components/ExamForm';
import ExamTable from '../../components/ExamTable';
import AdminNavbar from '../../components/navbaradmin';
import { deleteExam, fetchExams } from '../../services/examService';

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

const CreateExamPage: React.FC = () => {
    const [exams, setExams] = useState<Exam[]>([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [selectedExam, setSelectedExam] = useState<Exam | null>(null);

    useEffect(() => {
        fetchExams().then(setExams);
    }, []);

    interface CreateExamResponse {
        success: boolean;
        message?: string;
    }

    const handleSubmit = async (examData: Exam): Promise<void> => {
        try {
            const response = await fetch('/api/createExam', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(examData),
            });
    
            const result: CreateExamResponse = await response.json();
            if (result.success) {
                alert('สร้างกำหนดการสอบสำเร็จ');
            } else {
                alert(result.message || 'เกิดข้อผิดพลาดในการสร้างกำหนดการสอบ');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
        }
    };

    const handleDeleteExam = async (id: number) => {
        const isConfirmed = window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบกำหนดการสอบนี้?');
        if (!isConfirmed) return;
    
        try {
            const result = await deleteExam(id);
            if (result.success) {
                alert('ลบกำหนดการสอบสำเร็จ');
                const updatedExams = await fetchExams();
                setExams(updatedExams);
            } else {
                alert(result.message || 'เกิดข้อผิดพลาดในการลบกำหนดการสอบ');
            }
        } catch (error) {
            console.error('Error deleting exam:', error);
            alert('เกิดข้อผิดพลาดในการลบกำหนดการสอบ');
        }
    };
    

    const handleEditExam = (id: number) => {
        const exam = exams.find((exam) => exam.id === id) || null;
        setSelectedExam(exam);
        setIsEditModalOpen(true);
    };

    const handleUpdateExam = async (updatedExam: Exam) => {
        try {
            const response = await fetch('/api/updateExam', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedExam),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const result = await response.json();
    
            if (result.success) {
                alert('อัปเดตกำหนดการสอบสำเร็จ');
                const updatedExams = await fetchExams();
                setExams(updatedExams);
                setIsEditModalOpen(false);
            } else {
                alert(result.message || 'เกิดข้อผิดพลาดในการอัปเดต');
            }
        } catch (error) {
            console.error('Error updating exam:', error);
            alert('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center p-6 bg-gradient-to-br from-purple-50 to-blue-50">
            <AdminNavbar />
            <div className="bg-white shadow-2xl rounded-2xl p-8 mt-24 w-full max-w-lg border border-gray-200">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">สร้างกำหนดการสอบ</h1>
                <ExamForm onSubmit={handleSubmit} />
            </div>
            <div className="mt-12 w-full max-w-6xl">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">กำหนดการสอบที่สร้างไว้</h2>
                <div className="overflow-x-auto">
                    <ExamTable exams={exams} onDelete={handleDeleteExam} onEdit={handleEditExam} />
                </div>
            </div>
            {isEditModalOpen && selectedExam && (
                <EditExamModal 
                    exam={selectedExam} 
                    onClose={() => setIsEditModalOpen(false)}
                    onUpdate={handleUpdateExam} 
                />
            )}
        </div>
    );
};

export default CreateExamPage;
