'use client';
import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../components/navbaradmin';

interface NewsItem {
    id: number;
    title: string;
    content: string;
    image_url?: string;
}

const DashboardPage = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState('');
    const [editId, setEditId] = useState<number | null>(null);

    const fetchNews = async () => {
        const response = await fetch('/api/news');
        const data = await response.json();
        setNews(data);
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const handleAddNews = async () => {
        let imageUrlToUse = imageUrl;

        if (imageFile) {
            const formData = new FormData();
            formData.append('file', imageFile);

            const uploadResponse = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const uploadResult = await uploadResponse.json();
            if (uploadResult.success) {
                imageUrlToUse = uploadResult.imageUrl;
            } else {
                alert('Failed to upload image');
                return;
            }
        }

        const response = await fetch('/api/news', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content, image_url: imageUrlToUse }),
        });

        const result = await response.json();
        if (result.success) {
            alert('News added successfully');
            fetchNews();
            setShowPopup(false);
            setTitle('');
            setContent('');
            setImageFile(null);
            setImageUrl('');
        } else {
            alert('Failed to add news');
        }
    };

    const handleDeleteNews = async (id: number) => {
        const confirmDelete = confirm('คุณแน่ใจหรือไม่ว่าต้องการลบข่าวนี้?');
        if (!confirmDelete) return;

        const response = await fetch('/api/news', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });

        const result = await response.json();
        if (result.success) {
            alert('News deleted successfully');
            fetchNews();
        } else {
            alert('Failed to delete news');
        }
    };

    const handleEditNews = (item: NewsItem) => {
        setEditId(item.id);
        setTitle(item.title);
        setContent(item.content);
        setImageUrl(item.image_url || '');
        setEditPopup(true);
    };

    const handleUpdateNews = async () => {
        if (editId === null) return;

        let imageUrlToUse = imageUrl;

        if (imageFile) {
            const formData = new FormData();
            formData.append('file', imageFile);

            const uploadResponse = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const uploadResult = await uploadResponse.json();
            if (uploadResult.success) {
                imageUrlToUse = uploadResult.imageUrl;
            } else {
                alert('Failed to upload image');
                return;
            }
        }

        const response = await fetch('/api/news', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: editId, title, content, image_url: imageUrlToUse }),
        });

        const result = await response.json();
        if (result.success) {
            alert('News updated successfully');
            fetchNews();
            setEditPopup(false);
            setTitle('');
            setContent('');
            setImageFile(null);
            setImageUrl('');
            setEditId(null);
        } else {
            alert('Failed to update news');
        }
    };

    return (
        <div style={styles.container}>
            <AdminNavbar />
            <div style={styles.imageContainer}>
                <img src="/imgs/1.jpg" alt="Background" style={styles.headerImage} />
            </div>

            {/* ปุ่มเพิ่มข่าว */}
            <button
                style={styles.addButton}
                onClick={() => setShowPopup(true)}
            >
                เพิ่มข่าว
            </button>

            {/* Pop-up สำหรับเพิ่มข่าว */}
            {showPopup && (
                <div style={styles.popupOverlay}>
                    <div style={styles.popup}>
                        <h2>เพิ่มข่าว</h2>
                        <input
                            type="text"
                            placeholder="หัวข้อข่าว"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={styles.input}
                        />
                        <textarea
                            placeholder="เนื้อหาข่าว"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            style={styles.textarea}
                        />
                        <input
                            type="file"
                            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                            style={styles.input}
                        />
                        <div style={styles.buttonContainer}>
                            <button onClick={handleAddNews} style={styles.submitButton}>
                                เพิ่ม
                            </button>
                            <button onClick={() => setShowPopup(false)} style={styles.cancelButton}>
                                ยกเลิก
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Pop-up สำหรับแก้ไขข่าว */}
            {editPopup && (
                <div style={styles.popupOverlay}>
                    <div style={styles.popup}>
                        <h2>แก้ไขข่าว</h2>
                        <input
                            type="text"
                            placeholder="หัวข้อข่าว"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={styles.input}
                        />
                        <textarea
                            placeholder="เนื้อหาข่าว"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            style={styles.textarea}
                        />
                        <input
                            type="file"
                            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                            style={styles.input}
                        />
                        <div style={styles.buttonContainer}>
                            <button onClick={handleUpdateNews} style={styles.submitButton}>
                                อัปเดต
                            </button>
                            <button onClick={() => setEditPopup(false)} style={styles.cancelButton}>
                                ยกเลิก
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* แสดงข่าวสาร */}
            <div style={styles.newsContainer}>
                {news.map((item) => (
                    <div key={item.id} style={styles.newsItem}>
                        <h3 style={styles.newsTitle}>{item.title}</h3>
                        <p style={styles.newsContent}>{item.content}</p>
                        {item.image_url && <img src={item.image_url} alt="News" style={styles.newsImage} />}
                        <div style={styles.newsActions}>
                            <button
                                onClick={() => handleEditNews(item)}
                                style={styles.editButton}
                            >
                                แก้ไข
                            </button>
                            <button
                                onClick={() => handleDeleteNews(item.id)}
                                style={styles.deleteButton}
                            >
                                ลบ
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardPage;

const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    imageContainer: {
      width: '100%',
    },
    headerImage: {
      width: '100%',
    },
    addButton: {
      margin: '20px 0',
      padding: '10px 20px',
      backgroundColor: '#0070f3',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    popupOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999, // ตั้งค่า z-index ให้สูงที่สุด
    },
    popup: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      width: '400px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      zIndex: 10000, // ตั้งค่า z-index ให้สูงกว่า popupOverlay
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      borderRadius: '5px',
      border: '1px solid #ccc',
      minHeight: '100px',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '10px',
    },
    submitButton: {
      padding: '10px 20px',
      backgroundColor: '#0070f3',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    cancelButton: {
      padding: '10px 20px',
      backgroundColor: '#ccc',
      color: '#000',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    newsContainer: {
      width: 'auto',
      marginTop: '20px',
    },
    newsItem: {
      border: '4px solid #1565C0',
      padding: '15px',
      margin: '10px 0',
      borderRadius: '8px',
      backgroundColor: '#0D47A1',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      transition: 'all 0.3s ease',
      position: 'relative',
    },
    newsTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#E3F2FD',
    },
    newsContent: {
      fontSize: '1rem',
      color: '#BBDEFB',
    },
    newsImage: {
      maxWidth: '500px',
      maxHeight: '500px',
      borderRadius: '8px',
      marginTop: '10px',
    },
    newsActions: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      display: 'flex',
      gap: '10px',
    },
    editButton: {
      padding: '5px 10px',
      backgroundColor: '#28a745',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    deleteButton: {
      padding: '5px 10px',
      backgroundColor: '#ff4d4d',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };