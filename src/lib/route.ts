import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export const runtime = 'edge';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, message, subject } = body;

        // 필수 필드 검증
        if (!email || !message) {
            return NextResponse.json(
                { error: 'Email and message are required' },
                { status: 400 }
            );
        }

        const emailSubject = subject || `[AtlasFinder] 새로운 문의: ${name || '이름 없음'}`;
        const htmlContent = `
            <h2>새로운 문의가 접수되었습니다.</h2>
            <p><strong>이름:</strong> ${name || '입력되지 않음'}</p>
            <p><strong>이메일:</strong> ${email}</p>
            <p><strong>메시지:</strong></p>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">
                ${message}
            </div>
        `;

        // 관리자 이메일로 전송 (수신자 이메일 설정)
        await sendEmail({
            to: 'onandcode@gmail.com', // 문의 내용을 받을 관리자 이메일
            subject: emailSubject,
            html: htmlContent,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        );
    }
}