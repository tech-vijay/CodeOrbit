import fetch from 'node-fetch';

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function detailRow(label, value) {
  if (!value) return '';
  return `<tr><td style="padding:8px 14px;color:#64748b;font-weight:600;border-bottom:1px solid #e2e8f0;">${escapeHtml(label)}</td><td style="padding:8px 14px;color:#0f172a;border-bottom:1px solid #e2e8f0;">${escapeHtml(value)}</td></tr>`;
}

export async function sendLeadNotification(lead) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_NOTIFICATION_EMAIL;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !recipient || !from) {
    console.warn('Lead email notification skipped: RESEND_API_KEY, EMAIL_FROM, or CONTACT_NOTIFICATION_EMAIL is not configured.');
    return { skipped: true };
  }

  const subject = `New Code Orbit lead: ${lead.name || 'Website inquiry'}`;
  const html = `
    <div style="max-width:640px;margin:0 auto;font-family:Arial,sans-serif;color:#0f172a;">
      <div style="background:#0f172a;padding:24px 28px;border-radius:16px 16px 0 0;"><p style="margin:0;color:#22d3ee;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">New website inquiry</p><h1 style="margin:8px 0 0;color:#fff;font-size:24px;">${escapeHtml(lead.name || 'New lead')}</h1></div>
      <div style="padding:24px 28px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 16px 16px;background:#fff;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">${detailRow('Email', lead.email)}${detailRow('Phone', lead.phone)}${detailRow('Company', lead.company)}${detailRow('Service', lead.service)}${detailRow('Project type', lead.project_type)}${detailRow('Budget', lead.budget)}${detailRow('Timeline', lead.timeline)}${detailRow('Source', lead.source)}</table>
        <div style="margin-top:22px;padding:16px;background:#f8fafc;border-radius:10px;"><p style="margin:0 0 7px;color:#64748b;font-size:12px;font-weight:700;text-transform:uppercase;">Project details</p><p style="margin:0;white-space:pre-wrap;font-size:14px;line-height:1.6;">${escapeHtml(lead.message || 'No message provided.')}</p></div>
      </div>
    </div>`;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [recipient],
      reply_to: lead.email || undefined,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend email failed (${response.status}): ${body}`);
  }

  return response.json();
}
