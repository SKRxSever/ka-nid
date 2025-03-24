import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const fname = formData.get('fname') as string;
        const lname = formData.get('lname') as string;
        const citizenId = formData.get('citizenId') as string;
        const tel = formData.get('tel') as string;
        const school = formData.get('school') as string;
        const classLevel = formData.get('class') as string;
        const subject = formData.get('subject') as string;
        const slipFile = formData.get('slip') as File;

        // Convert file to base64
        const slipBuffer = await slipFile.arrayBuffer();
        const slipBase64 = Buffer.from(slipBuffer).toString('base64');

        // Insert data into database
        const sql = `
            INSERT INTO streg (fname, lname, citizenId, tel, school, class, subject, slip)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [fname, lname, citizenId, tel, school, classLevel, subject, slipBase64];

        await query(sql, params);

        return NextResponse.json({ message: 'Registration successful' }, { status: 200 });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}