import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = Date.now() + '-' + file.name.replace(/\s/g, '-');
        const filePath = path.join(process.cwd(), 'public/imgs', filename);

        await writeFile(filePath, buffer);

        const imageUrl = `/imgs/${filename}`;
        return NextResponse.json({ success: true, imageUrl });
    } catch (err) {
        console.error('Error uploading file:', err);
        return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }
}