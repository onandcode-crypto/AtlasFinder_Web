import nodemailer from 'nodemailer';

// Nodemailer 설정 (Gmail)
export const setupTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
};

// 메일 전송 헬퍼 함수
export const sendEmail = async ({ to, subject, html }: { to: string, subject: string, html: string }) => {
    try {
        const transporter = setupTransporter();
        const info = await transporter.sendMail({
            from: `"AtlasFinder" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html,
        });
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Email Sending Error:", error);
        return { success: false, error };
    }
};
