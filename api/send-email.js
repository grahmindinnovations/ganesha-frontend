import nodemailer from 'nodemailer'

function escapeHtml(str) {
  if (str == null) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function sendJson(res, status, data) {
  res.setHeader('Content-Type', 'application/json')
  res.status(status).json(data)
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') {
    return sendJson(res, 405, { success: false, message: 'Method not allowed' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {})
    const { name, email, phone, city, businessName, message } = body

    if (!name || !email || !phone || !message) {
      return sendJson(res, 400, {
        success: false,
        message: 'Name, email, phone and message are required.',
      })
    }

    const user = process.env.MAIL_USER
    const pass = process.env.MAIL_PASS
    if (!user || !pass) {
      console.error('[send-email] MAIL_USER or MAIL_PASS not set in environment')
      return sendJson(res, 500, {
        success: false,
        message: 'Unable to send email. Please try again later or contact inquiry@ganesha.app.',
      })
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    })

    const plainText = `
New contact details:

Name: ${name}
Email: ${email}
Phone: ${phone}
City: ${city || '-'}
Business name: ${businessName || '-'}

Message:
${message || '-'}
`.trim()

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New contact – Ganesha</title>
</head>
<body style="margin: 0; font-family: 'Segoe UI', system-ui, sans-serif; background: #f1f5f9; padding: 24px;">
  <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: hidden;">
    <div style="background: linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%); padding: 24px 28px; text-align: center;">
      <span style="display: inline-block; width: 44px; height: 44px; line-height: 44px; border-radius: 12px; background: rgba(255,255,255,0.25); font-weight: 700; font-size: 18px; color: #fff;">G</span>
      <h1 style="margin: 12px 0 0; font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: 0.02em;">Ganesha – New contact</h1>
      <p style="margin: 4px 0 0; font-size: 13px; color: rgba(255,255,255,0.9);">Landing page contact form</p>
    </div>
    <div style="padding: 28px;">
      <p style="margin: 0 0 20px; font-size: 14px; color: #64748b;">Someone reached out via the contact form. Details below.</p>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; width: 140px;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #0f172a;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${escapeHtml(email)}" style="color: #3b82f6; text-decoration: none;">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: 500;">${escapeHtml(phone)}</td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">City</td><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">${escapeHtml(city || '—')}</td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Business name</td><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">${escapeHtml(businessName || '—')}</td></tr>
      </table>
      <p style="margin: 20px 0 8px; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
      <div style="padding: 14px; background: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0; font-size: 14px; color: #334155; line-height: 1.5; white-space: pre-wrap;">${escapeHtml(message || '—')}</div>
    </div>
    <div style="padding: 16px 28px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">Ganesha · Hotel & Restaurant Cloud</div>
  </div>
</body>
</html>
`.trim()

    const mailOptions = {
      from: `"Ganesha Contact" <${user}>`,
      to: 'innovimagine@gmail.com',
      subject: 'New contact from Ganesha landing page',
      text: plainText,
      html,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('[send-email] Sent successfully:', info.messageId)
    return sendJson(res, 200, { success: true, message: 'Email sent successfully.' })
  } catch (err) {
    console.error('[send-email] Error:', err.message)
    console.error('[send-email] Stack:', err.stack)
    return sendJson(res, 500, {
      success: false,
      message: 'Unable to send email. Please try again later or contact inquiry@ganesha.app.',
    })
  }
}
