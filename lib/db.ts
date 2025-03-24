import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'math_project',
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