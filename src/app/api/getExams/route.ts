import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function GET() {
    try {
        const sql = 'SELECT * FROM exams';
        const results = await query(sql);
        return NextResponse.json({ success: true, data: results });
    } catch (error) {
        console.error('Error fetching exams:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch exams' }, { status: 500 });
    }
}