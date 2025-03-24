// api/src/updateExam/route.ts
import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function PUT(request: Request) {
    try {
        const { id, ...examData } = await request.json();
        const sql = `
            UPDATE exams 
            SET name = ?, exam_date = ?, exam_time = ?, opening_date = ?, opening_time = ?, closing_date = ?, closing_time = ?, exam_levels = ?
            WHERE id = ?
        `;
        const params = [
            examData.name,
            examData.exam_date,
            examData.exam_time,
            examData.opening_date,
            examData.opening_time,
            examData.closing_date,
            examData.closing_time,
            JSON.stringify(examData.exam_levels),
            id,
        ];
        await query(sql, params);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating exam:', error);
        return NextResponse.json({ success: false, message: 'Failed to update exam' }, { status: 500 });
    }
}