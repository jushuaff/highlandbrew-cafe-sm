import { z } from 'zod';
import { Resend } from 'resend';

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name is required.'),
  email: z.string().trim().email('A valid email is required.'),
  phone: z.string().trim().max(30).optional().or(z.literal('')),
  subject: z.string().trim().min(3, 'A subject is required.'),
  message: z.string().trim().min(10, 'Message must be at least 10 characters.'),
});

const sanitize = (value) => String(value ?? '').replace(/[<>]/g, '').trim();

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ ok: false, message: 'Method not allowed.' });
  }

  let body = {};

  try {
    body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body || {};
  } catch {
    return response.status(400).json({ ok: false, message: 'Invalid JSON payload.' });
  }

  const safeBody = {
    name: sanitize(body.name),
    email: sanitize(body.email),
    phone: sanitize(body.phone),
    subject: sanitize(body.subject),
    message: sanitize(body.message),
  };

  const validation = contactSchema.safeParse(safeBody);

  if (!validation.success) {
    return response.status(400).json({
      ok: false,
      message: validation.error.issues[0]?.message || 'Please review your form details.',
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    return response.status(200).json({
      ok: true,
      demo: true,
      message: 'Demo mode is active. Email delivery will be enabled after deployment with the required environment variables configured.',
    });
  }

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      reply_to: validation.data.email,
      subject: validation.data.subject,
      html: `
        <h2>New contact inquiry</h2>
        <p><strong>Name:</strong> ${validation.data.name}</p>
        <p><strong>Email:</strong> ${validation.data.email}</p>
        <p><strong>Phone:</strong> ${validation.data.phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${validation.data.subject}</p>
        <p><strong>Message:</strong><br/>${validation.data.message.replace(/\n/g, '<br/>')}</p>
      `,
    });

    return response.status(200).json({
      ok: true,
      demo: false,
      message: 'Your message has been sent successfully.',
      id: result?.id || null,
    });
  } catch (error) {
    return response.status(500).json({
      ok: false,
      message: 'Something went wrong while sending the message. Please try again shortly.',
      detail: error instanceof Error ? error.message : 'Unknown server error',
    });
  }
}
