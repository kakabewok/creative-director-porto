import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        console.log('=== Weebhook detected ===');

        const body = await request.json();
        const documentType = body?._type;
        console.log('Type Document Changed:', documentType);

        if (documentType === 'project') {
            revalidateTag('projects', "max");
            console.log('Success: Projects list cache cleaned');
            return NextResponse.json({ revalidated: true, message: 'Projects list cache cleaned' });
        }

        if (documentType === 'user') {
            revalidateTag('user', "max");
            console.log('Success: User cache cleaned.');
            return NextResponse.json({ revalidated: true, message: 'Profile updated!' });
        }

        console.log('Warning: Webhook received, but no matching tag found for type:', documentType);
        return NextResponse.json({ revalidated: false, message: 'No matching tag found' });

    } catch (err) {
        console.error('Error revalidating:', err);
        return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
    }
}