import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function GET() {
    try {
        const sql = 'SELECT * FROM exams';
        const results = await query(sql);
        
        if (!Array.isArray(results)) {
            console.error('Invalid data format:', results);
            return NextResponse.json({ error: 'Invalid data format' }, { status: 500 });
        }

        return NextResponse.json(results);
    } catch (error) {
        console.error('Database query error:', error);
        return NextResponse.json({ error: 'Failed to fetch exam data' }, { status: 500 });
    }
}