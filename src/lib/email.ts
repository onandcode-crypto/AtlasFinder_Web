interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async ({ to, subject, html }: EmailPayload) => {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn('RESEND_API_KEY is missing. Email sending skipped.');
    // 개발 환경이거나 키가 없을 때는 에러 대신 로그만 출력 (배포 중단 방지)
    return { success: false, error: 'Missing API Key' };
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: 'AtlasFinder <onboarding@resend.dev>', // Resend 테스트 도메인 (실제 운영시 도메인 인증 필요)
      to,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to send email: ${response.status} ${response.statusText}`);
  }

  return response.json();
};