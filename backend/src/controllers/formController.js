import FormSubmission from '../models/FormSubmission.js';
import { sendLeadNotification } from '../services/emailService.js';

function normalizePayload(body = {}) {
  const payload = body || {};
  return {
    source: payload.source || 'general',
    form_type: payload.form_type || 'form_submission',
    name: payload.name || '',
    email: payload.email || '',
    phone: payload.phone || '',
    service: payload.service || '',
    company: payload.company || '',
    project_type: payload.project_type || '',
    budget: payload.budget || '',
    timeline: payload.timeline || '',
    message: payload.message || '',
    raw: payload.raw || payload,
  };
}

export async function createFormSubmission(req, res) {
  try {
    const submission = await FormSubmission.create(normalizePayload(req.body));
    try {
      await sendLeadNotification(submission);
    } catch (emailError) {
      // The lead is safely stored even if the external mail provider is temporarily unavailable.
      console.error('Lead email notification failed:', emailError.message);
    }
    return res.status(201).json({ success: true, data: submission });
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
}

export async function getFormSubmissions(req, res) {
  try {
    const submissions = await FormSubmission.find({ source: { $ne: 'chat' } }).sort({ createdAt: -1 });
    return res.json({ data: submissions });
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
}

export async function saveFormSubmission(payload, source = 'general') {
  const normalized = normalizePayload({ ...payload, source });
  return FormSubmission.create(normalized);
}
