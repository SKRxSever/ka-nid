import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "math",
    port: parseInt(process.env.DB_PORT as string) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


export async function query(sql: string, params?: (string | number)[]) {
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.execute(sql, params);
        return results;
    } finally {
        connection.release();
    }
}