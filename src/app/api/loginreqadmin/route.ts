import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function POST(request: Request) {
    try {
        const { citizenId, tel } = await request.json();

        const result = await query(
            'SELECT * FROM req_admin WHERE citizenId = ? AND tel = ? AND status = ?',
            [citizenId, tel, 'approved']
        );

        if (Array.isArray(result) && result.length > 0) {
            return NextResponse.json({ success: true }, { status: 200 });
        } else {
            return NextResponse.json({ success: false, error: 'ข้อมูลไม่ถูกต้องหรือสถานะไม่ได้รับการอนุมัติ' }, { status: 401 });
        }
    } catch (err) {
        console.error('เกิดข้อผิดพลาดในการตรวจสอบข้อมูล:', err);
        return NextResponse.json({ success: false, error: 'เกิดข้อผิดพลาดในการตรวจสอบข้อมูล' }, { status: 500 });
    }
}