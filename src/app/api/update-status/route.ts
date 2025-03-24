import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function POST(req: NextRequest) {
    try {
        const { id, status } = await req.json();

        if (!id || !['approved', 'rejected'].includes(status)) {
            return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
        }

        await query('UPDATE req_admin SET status = ? WHERE id = ?', [status, id]);

        return NextResponse.json({ message: 'Status updated successfully' });
    } catch (error) {
        console.error('Error updating status:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
