'use client';
import React, { useState } from 'react';
import AdminNavbar from '../../components/navbaradmin';
// ข้อมูลตัวอย่างของผู้สมัครสอบ
const mockData = [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        idCard: '1234567890123',
        phone: '0812345678',
        school: 'โรงเรียนตัวอย่างที่ 1',
        grade: 'ม.6',
        subject: 'คณิตศาสตร์',
        paymentSlip: 'slip1.jpg',
        status: 'Pending',
    },
    {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        idCard: '9876543210987',
        phone: '0898765432',
        school: 'โรงเรียนตัวอย่างที่ 2',
        grade: 'ม.5',
        subject: 'วิทยาศาสตร์',
        paymentSlip: 'slip2.jpg',
        status: 'Approved',
    },
    {
        id: 3,
        firstName: 'Alice',
        lastName: 'Johnson',
        idCard: '4567890123456',
        phone: '0823456789',
        school: 'โรงเรียนตัวอย่างที่ 3',
        grade: 'ม.4',
        subject: 'ภาษาอังกฤษ',
        paymentSlip: 'slip3.jpg',
        status: 'Rejected',
    },
];

const AdminRegCheckPage: React.FC = () => {
    const [registrations, setRegistrations] = useState(mockData);

    const approveRegistration = (id: number) => {
        setRegistrations(prev =>
            prev.map(reg =>
                reg.id === id ? { ...reg, status: 'Approved' } : reg
            )
        );
        alert(`ยืนยันสิทธิ์การสมัคร ID: ${id}`);
    };

    const rejectRegistration = (id: number) => {
        setRegistrations(prev =>
            prev.map(reg =>
                reg.id === id ? { ...reg, status: 'Rejected' } : reg
            )
        );
        alert(`ปฏิเสธการสมัคร ID: ${id}`);
    };

    const viewSlip = (paymentSlip: string) => {
        alert(`ดูสลิป: ${paymentSlip}`);
    };

    const editRegistration = (id: number) => {
        const registration = registrations.find(reg => reg.id === id);
        if (registration) {
            const newFirstName = prompt('แก้ไขชื่อ:', registration.firstName);
            const newLastName = prompt('แก้ไขนามสกุล:', registration.lastName);
            const newIdCard = prompt('แก้ไขเลขบัตรประชาชน:', registration.idCard);
            const newPhone = prompt('แก้ไขเบอร์โทร:', registration.phone);
            const newSchool = prompt('แก้ไขโรงเรียน:', registration.school);
            const newGrade = prompt('แก้ไขระดับชั้น:', registration.grade);
            const newSubject = prompt('แก้ไขรายวิชา:', registration.subject);

            if (
                newFirstName &&
                newLastName &&
                newIdCard &&
                newPhone &&
                newSchool &&
                newGrade &&
                newSubject
            ) {
                setRegistrations(prev =>
                    prev.map(reg =>
                        reg.id === id
                            ? {
                                  ...reg,
                                  firstName: newFirstName,
                                  lastName: newLastName,
                                  idCard: newIdCard,
                                  phone: newPhone,
                                  school: newSchool,
                                  grade: newGrade,
                                  subject: newSubject,
                              }
                            : reg
                    )
                );
                alert('แก้ไขข้อมูลสำเร็จ');
            }
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen ">
            <AdminNavbar />
            <h1 className="text-3xl font-bold text-center mb-8 text-blue-600 mt-40">
                Admin - Registration Check
            </h1>
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="min-w-full">
                    <thead className="bg-blue-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                ชื่อ
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                นามสกุล
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                เลขบัตรประชาชน
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                เบอร์โทร
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                โรงเรียน
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                ระดับชั้น
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                รายวิชา
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                สลิปเงิน
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                สถานะ
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                การดำเนินการ
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {registrations.map(reg => (
                            <tr key={reg.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm text-gray-900">{reg.id}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{reg.firstName}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{reg.lastName}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{reg.idCard}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{reg.phone}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{reg.school}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{reg.grade}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{reg.subject}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    <button
                                        onClick={() => viewSlip(reg.paymentSlip)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        ดูสลิป
                                    </button>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            reg.status === 'Pending'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : reg.status === 'Approved'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}
                                    >
                                        {reg.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900 space-x-2">
                                    <button
                                        onClick={() => editRegistration(reg.id)}
                                        disabled={reg.status !== 'Pending'}
                                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    >
                                        แก้ไข
                                    </button>
                                    <button
                                        onClick={() => approveRegistration(reg.id)}
                                        disabled={reg.status === 'Approved'}
                                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    >
                                        ยืนยันสิทธิ์
                                    </button>
                                    <button
                                        onClick={() => rejectRegistration(reg.id)}
                                        disabled={reg.status === 'Rejected'}
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    >
                                        ปฏิเสธ
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminRegCheckPage;