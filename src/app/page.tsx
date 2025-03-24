'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaGlobe } from 'react-icons/fa';
import NavBar from './components/navbar';

export default function Home() {
  const targetDate = new Date('2025-03-20T23:59:59').getTime();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [showLangOptions, setShowLangOptions] = useState(false);
  interface NewsItem {
    id: string;
    title: string;
    content: string;
    image_url?: string;
  }

  const [news, setNews] = useState<NewsItem[]>([]); // State สำหรับเก็บข่าวสาร

  // ดึงข้อมูลข่าวสารจาก API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        const data = await response.json();
        setNews(data);
      } catch (err) {
        console.error('Failed to fetch news:', err);
      }
    };

    fetchNews();
  }, []);

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <NavBar />
      </div>
      <div style={styles.imageContainer}>
        <img src="/imgs/1.jpg" alt="Background" style={styles.headerImage} />
        <div style={styles.countdownOverlay}>
          <div style={styles.timeContainer}>
            {Object.entries(timeLeft).map(([label, value]) => (
              <div key={label} style={styles.timeBox}>
                <span style={styles.timeValue}>{value}</span>
                <span style={styles.timeLabel}>{label.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ส่วนแสดงข่าวสาร */}
      <div style={styles.newsContainer}>
        {news.map((item) => (
          <div key={item.id} style={styles.newsItem}>
            <h3 style={styles.newsTitle}>{item.title}</h3>
            <p style={styles.newsContent}>{item.content}</p>
            {item.image_url && (
              <img src={item.image_url} alt="News" style={styles.newsImage} />
            )}
          </div>
        ))}
      </div>

      <div
        style={styles.languageSwitcher}
        onClick={() => setShowLangOptions(!showLangOptions)}
      >
        <FaGlobe size={30} color="#fff" />
        {showLangOptions && (
          <div style={{ ...styles.languageOptions, animation: 'zoomIn 0.3s ease-in-out' }}>
            <Image src="/imgs/thai.jpg" alt="Thai" width={80} height={110} />
            <Image src="/imgs/eng.png" alt="English" width={80} height={110} />
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes zoomIn {
          from {
            transform: scale(0.5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

import { CSSProperties } from 'react';

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  navbar: {
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1000,
  },
  headerImage: {
    width: '100%',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  countdownOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    display: 'flex',
    gap: '1rem',
    padding: '1rem 2rem',
    borderRadius: '12px',
    color: '#ffffff',
  },
  timeContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '4.5rem',
  },
  timeBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#ffffff',
    minWidth: '100px',
  },
  timeValue: {
    fontSize: '4.5rem',
    fontWeight: 'bold',
    textShadow: '3px 3px 6px rgba(0, 48, 223, 0.7)',
  },
  timeLabel: {
    fontSize: '1.5rem',
    marginTop: '0.5rem',
    textShadow: '2px 2px 4px rgba(0, 48, 223, 0.7)',
  },
  languageSwitcher: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    background: 'rgba(0, 0, 0, 0.6)',
    padding: '10px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  languageOptions: {
    position: 'absolute',
    bottom: '50px',
    right: '58px',
    left: 'auto',
    display: 'flex',
    flexDirection: 'row',
    gap: '15px',
    background: 'rgba(0, 0, 0, 0.8)',
    padding: '8px',
    borderRadius: '8px',
    whiteSpace: 'nowrap',
    minWidth: 'auto',
  },
  newsContainer: {
    width: 'auto',
    marginTop: '20px',
  },
  newsItem: {
    border: '4px solid #1565C0', // เส้นขอบสีน้ำเงินเข้ม และหนาขึ้น (4px)
    padding: '15px',
    margin: '10px 0',
    borderRadius: '8px',
    backgroundColor: '#0D47A1', // สีพื้นหลังน้ำเงินเข้ม
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // เพิ่มเงาให้โดดเด่นขึ้น
    transition: 'all 0.3s ease',
  },
  newsTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#E3F2FD', // สีข้อความฟ้าอ่อนเพื่อความคมชัด
  },
  newsContent: {
    fontSize: '1rem',
    color: '#BBDEFB', // สีข้อความฟ้าอ่อน
  },
  newsImage: {
    maxWidth: '500px',
    maxHeight: '500px',
    borderRadius: '8px',
    marginTop: '10px',
  },
};