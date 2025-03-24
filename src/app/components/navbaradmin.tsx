import React, { useEffect, useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';

interface Message {
    id: number;
    fname: string;
    lname: string;
    citizenId: string;
    tel: string;
    citizenImg?: string;
}

const InboxPopUp: React.FC<{
    inbox: Message[],
    onClose: () => void,
    onApprove: (id: number) => void,
    onReject: (id: number) => void
}> = ({ inbox, onClose, onApprove, onReject }) => {
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-h-[80vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">📩 คำขอแอดต่างโรงเรียน</h2>
                {inbox.length === 0 ? (
                    <p className="text-gray-500 text-center">ไม่มีข้อความใหม่</p>
                ) : (
                    <>
                        {!selectedMessage ? (
                            inbox.map((message) => (
                                <div
                                    key={message.id}
                                    className="p-4 bg-gray-100 rounded-lg mb-2 cursor-pointer hover:bg-gray-200 transition duration-300"
                                    onClick={() => setSelectedMessage(message)}
                                >
                                    <p><strong>👤 {message.fname} {message.lname}</strong></p>
                                </div>
                            ))
                        ) : (
                            <div className="p-4 bg-gray-100 rounded-lg mb-2">
                                <button
                                    className="text-blue-500 hover:text-blue-700 mb-2"
                                    onClick={() => setSelectedMessage(null)}
                                >
                                    ← กลับไปที่รายชื่อ
                                </button>
                                <p><strong>👤 {selectedMessage.fname} {selectedMessage.lname}</strong></p>
                                <p>📌 เลขบัตร: {selectedMessage.citizenId}</p>
                                <p>📞 โทร: {selectedMessage.tel}</p>

                                {selectedMessage.citizenImg ? (
                                    <div className="mt-2">
                                        <strong>📸 รูปภาพบัตรประชาชน:</strong>
                                        <img
                                            src={selectedMessage.citizenImg}
                                            alt="ID Card"
                                            className="w-100 h-auto rounded-lg border border-gray-300 mt-2"
                                        />
                                    </div>
                                ) : (
                                    <p className="text-gray-500">ไม่มีรูปภาพบัตรประชาชน</p>
                                )}

                                <div className="flex justify-end space-x-2 mt-3">
                                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600" onClick={() => onApprove(selectedMessage.id)}>✔ อนุมัติ</button>
                                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600" onClick={() => onReject(selectedMessage.id)}>✖ ปฏิเสธ</button>
                                </div>
                            </div>
                        )}
                    </>
                )}
                <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full">ปิด</button>
            </div>
        </div>
    );
};
const isActive = (path: string) => {
    return window.location.pathname === path;
};
const AdminNavbar: React.FC = () => {
    const [inbox, setInbox] = useState<Message[]>([]);
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    useEffect(() => {
        const fetchInbox = async () => {
            const res = await fetch('/api/get-inbox');
            const data: Message[] = await res.json();
            setInbox(data);
        };
        fetchInbox();
    }, []);

    const handleApprove = async (id: number) => {
        await fetch('/api/update-status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status: 'approved' }),
        });
        setInbox(prev => prev.filter(msg => msg.id !== id));
    };

    const handleReject = async (id: number) => {
        await fetch('/api/update-status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status: 'rejected' }),
        });
        setInbox(prev => prev.filter(msg => msg.id !== id));
    };

    return (
        <div className="fixed top-12 left-0 w-full flex justify-center items-center px-4">
            <div className="absolute left-4">
                <img src="/imgs/Math.png" alt="Logo" className="h-24 w-65" />
            </div>
            <nav className="bg-sky-500 bg-opacity-75 py-2 px-4 w-6/12 hover:bg-opacity-100 transition duration-300 ease-in-out rounded-lg shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex space-x-12 ml-9">
                    {['/admin/dashboard', '/admin/CreateExam', '/admin/reg_check', '/admin/listboard'].map((path, idx) => (
                            <a
                                key={idx}
                                href={path}
                                className={`px-2 p-1 rounded-lg text-lg transform transition duration-300 ease-in-out ${isActive(path) ? 'bg-blue-700 text-white hover:scale-110' : 'text-blue-200 hover:text-white hover:scale-110'
                                    }`}
                            >
                                {['หน้าหลัก', 'สร้างกำหนดการสอบ', 'เช็คการลงทะเบียน', 'รายชื่อคณะครู'][idx]}
                            </a>
                        ))}
                    </div>
                </div>
            </nav>
            <div className="absolute right-24">
                <button onClick={() => setIsPopUpOpen(true)} className="p-2 bg-blue-500 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out relative">
                    <FaEnvelope className="text-white text-2xl" />
                    {inbox.length > 0 && (
                        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                            {inbox.length}
                        </span>
                    )}
                </button>
            </div>
            {isPopUpOpen && <InboxPopUp inbox={inbox} onClose={() => setIsPopUpOpen(false)} onApprove={handleApprove} onReject={handleReject} />}
        </div>
    );
};

export default AdminNavbar;