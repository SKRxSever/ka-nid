// app/api/mail/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    const { fname, lname, citizenId, tel, citizenImg } = await request.json();

    // สร้าง transporter สำหรับส่งอีเมล
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // ตั้งค่าอีเมล
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: 'New Registration',
        text: `New registration details:
            Name: ${fname} ${lname}
            Citizen ID: ${citizenId}
            Telephone: ${tel}`,
        attachments: citizenImg ? [
            {
                filename: 'citizenImg.jpg',
                content: citizenImg.split('base64,')[1],
                encoding: 'base64',
            },
        ] : [],
    };

    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}