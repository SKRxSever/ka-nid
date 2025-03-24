import { OkPacket } from 'mysql2/promise';
import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, message: 'ID is required' },
                { status: 400 }
            );
        }

        const sql = 'DELETE FROM exams WHERE id = ?';
        const result = await query(sql, [id]) as OkPacket;

        if (result.affectedRows > 0) {
            return NextResponse.json(
                { success: true, message: 'Exam deleted successfully' },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { success: false, message: 'Exam not found' },
                { status: 404 }
            );
        }
    } catch (error) {
        console.error('Error deleting exam:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}