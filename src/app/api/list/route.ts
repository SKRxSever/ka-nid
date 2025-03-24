import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function GET() {
    try {
        const results = await query("SELECT * FROM req_admin");
        return NextResponse.json(results);
    } catch (error) {
        console.error('Error fetching inbox:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
