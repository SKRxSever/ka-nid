'use client';
import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../components/navbaradmin';

interface ReqAdmin {
    id: number;
    fname: string;
    lname: string;
    citizenId: string;
    tel: string;
    citizenImg?: string;
}

const ListBoard: React.FC = () => {
    const [reqAdmins, setReqAdmins] = useState<ReqAdmin[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchReqAdmins = async () => {
            try {
                const response = await fetch('/api/list');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setReqAdmins(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchReqAdmins();
    }, []);

    const openModal = (imageUrl: string) => {
        setSelectedImage(imageUrl);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    if (loading) {
        return <p className="text-center text-gray-600">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>;
    }

    return (
        <div className="container mx-auto p-6 mt-24">
            <AdminNavbar />
            <h1 className="text-2xl font-bold text-gray-800 mb-4">รายชื่อรวม</h1>
            <p className="text-gray-600 mb-6">รายชื่อบุคลากรทั้งหมด</p>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Req-Admin-List</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="py-3 px-6 text-left text-gray-700">ID</th>
                            <th className="py-3 px-6 text-left text-gray-700">First Name</th>
                            <th className="py-3 px-6 text-left text-gray-700">Last Name</th>
                            <th className="py-3 px-6 text-left text-gray-700">Citizen ID</th>
                            <th className="py-3 px-6 text-left text-gray-700">Phone</th>
                            <th className="py-3 px-6 text-left text-gray-700">ID Card</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reqAdmins.map((admin, index) => (
                            <tr key={admin.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                <td className="py-4 px-6 border-b text-gray-700">{admin.id}</td>
                                <td className="py-4 px-6 border-b text-gray-700">{admin.fname}</td>
                                <td className="py-4 px-6 border-b text-gray-700">{admin.lname}</td>
                                <td className="py-4 px-6 border-b text-gray-700">{admin.citizenId}</td>
                                <td className="py-4 px-6 border-b text-gray-700">{admin.tel}</td>
                                <td className="py-4 px-6 border-b">
                                    {admin.citizenImg ? (
                                        <button
                                            onClick={() => openModal(admin.citizenImg!)}
                                            className="text-blue-500 hover:text-blue-700 underline"
                                        >
                                            View ID Card
                                        </button>
                                    ) : (
                                        <span className="text-gray-400">No Image</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Custom Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-[90%] w-full md:max-w-2xl p-6 mx-4 overflow-y-auto max-h-[90vh]">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">ID Card Image</h2>
                        {selectedImage && (
                            <img
                                src={selectedImage}
                                alt="ID Card"
                                className="w-full h-auto rounded-lg border border-gray-300"
                            />
                        )}
                        <button
                            onClick={closeModal}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListBoard;