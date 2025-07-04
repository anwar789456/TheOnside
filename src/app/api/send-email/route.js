import { Resend } from 'resend';
import { NotificationEmail } from '@/components/NotificationEmail';


export async function POST(request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const { email, firstName, provider, emailUseCase, pricingPreference } = await request.json();
    // Send notification email to yourself
    const { data, error } = await resend.emails.send({
      from: 'AutoFollowUp <onboarding@resend.dev>',
      to: ['anwarsalhi080@gmail.com'], // Your email
      subject: `🚀 New Waitlist Signup: ${firstName}`,
      react: NotificationEmail({ firstName, email, provider, emailUseCase, pricingPreference }),
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