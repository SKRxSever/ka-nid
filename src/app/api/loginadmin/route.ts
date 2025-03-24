import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function POST(request: Request) {
    try {
        const { citizenId, tel } = await request.json();

        const sql = 'SELECT * FROM users WHERE 	citizenId = ? AND tel = ?';
        const results = await query(sql, [citizenId, tel]);

        if (Array.isArray(results) && results.length > 0) {
            return NextResponse.json({ success: true, message: 'Login successful' });
        } else {
            return NextResponse.json({ success: false, message: 'Invalid username or password' }, { status: 401 });
        }
    } catch (err) {
        console.error('Error during login:', err);
        return NextResponse.json({ success: false, message: 'An error occurred during login' }, { status: 500 });
    }
}