import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function GET() {
    try {
        const sql = 'SELECT * FROM news ORDER BY created_at DESC';
        const results = await query(sql);
        return NextResponse.json(results);
    } catch (err) {
        console.error('Error fetching news:', err);
        return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { title, content, image_url } = await request.json();

        const sql = 'INSERT INTO news (title, content, image_url) VALUES (?, ?, ?)';
        await query(sql, [title, content, image_url]);

        return NextResponse.json({ success: true, message: 'News added successfully' });
    } catch (err) {
        console.error('Error adding news:', err);
        return NextResponse.json({ error: 'Failed to add news' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();

        const sql = 'DELETE FROM news WHERE id = ?';
        await query(sql, [id]);

        return NextResponse.json({ success: true, message: 'News deleted successfully' });
    } catch (err) {
        console.error('Error deleting news:', err);
        return NextResponse.json({ error: 'Failed to delete news' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const { id, title, content, image_url } = await request.json();

        const sql = 'UPDATE news SET title = ?, content = ?, image_url = ? WHERE id = ?';
        await query(sql, [title, content, image_url, id]);

        return NextResponse.json({ success: true, message: 'News updated successfully' });
    } catch (err) {
        console.error('Error updating news:', err);
        return NextResponse.json({ error: 'Failed to update news' }, { status: 500 });
    }
}