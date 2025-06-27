import { Resend } from 'resend';
import { NotificationEmail } from '@/components/NotificationEmail';

const resend = new Resend("re_ATe3E5BY_CSWrmjJvQHtNzPybfTSTiGji");

export async function POST(request) {
  try {
    const { email, firstName, provider } = await request.json();

    // Send notification email to yourself
    const { data, error } = await resend.emails.send({
      from: 'AutoFollowUp <onboarding@resend.dev>',
      to: ['anwarsalhi080@gmail.com'], // Your email
      subject: `🚀 New Waitlist Signup: ${firstName}`,
      react: NotificationEmail({ firstName, email, provider }),
    });

    if (error) {
      console.error('Resend error:', error);
      return Response.json({ error: 'Failed to send notification' }, { status: 500 });
    }

    return Response.json({ success: true, data });
  } catch (error) {
    console.error('API error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}