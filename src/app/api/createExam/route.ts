import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function POST(request: Request) {
    try {
        const { name, exam_date, exam_time, opening_date, opening_time, closing_date, closing_time, exam_levels } = await request.json();

        // ตรวจสอบข้อมูลที่จำเป็น
        if (!name || !exam_date || !exam_time || !opening_date || !opening_time || !closing_date || !closing_time || !exam_levels) {
            return NextResponse.json({ success: false, message: 'ข้อมูลไม่ครบถ้วน' }, { status: 400 });
        }

        // บันทึกข้อมูลลงฐานข้อมูล
        const sql = `
            INSERT INTO exams (name, exam_date, exam_time, opening_date, opening_time, closing_date, closing_time, exam_levels)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [name, exam_date, exam_time, opening_date, opening_time, closing_date, closing_time, JSON.stringify(exam_levels)];

        await query(sql, params);

        return NextResponse.json({ success: true, message: 'สร้างกำหนดการสอบสำเร็จ' }, { status: 201 });
    } catch (error) {
        console.error('Error creating exam:', error);
        return NextResponse.json({ success: false, message: 'เกิดข้อผิดพลาดในการสร้างกำหนดการสอบ' }, { status: 500 });
    }
}