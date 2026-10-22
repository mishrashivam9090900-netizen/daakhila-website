const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;
const requests = new Map();

function json(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function clean(value, max = 200) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function normalizePhone(value) {
  let digits = clean(value, 30).replace(/\D/g, '');
  if (digits.startsWith('91') && digits.length === 12) digits = digits.slice(2);
  else if (digits.startsWith('0') && digits.length === 11) digits = digits.slice(1);
  return digits;
}

function rateLimited(ip) {
  const now = Date.now();
  const recent = (requests.get(ip) || []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  requests.set(ip, recent);
  return recent.length > MAX_REQUESTS_PER_WINDOW;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed.' });

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  if (rateLimited(ip)) return json(res, 429, { error: 'Too many requests. Please try again in a minute.' });

  let body;
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}; } catch { return json(res, 400, { error: 'Invalid request body.' }); }

  if (clean(body.website, 100)) return json(res, 400, { error: 'Invalid submission.' });

  const lead = {
    name: clean(body.name, 80),
    classYear: clean(body.classYear, 50),
    exam: clean(body.exam, 30),
    state: clean(body.state, 80),
    phone: normalizePhone(body.phone),
    consent: body.consent === true || body.consent === 'true' || body.consent === 'on',
  };
  const validExams = new Set(['JEE', 'NEET', 'BA', 'BSc', 'BCom']);
  const validationErrors = [
    ['name', lead.name.length < 2, 'Please enter your name.'],
    ['classYear', !lead.classYear, 'Please enter your class or year.'],
    ['exam', !validExams.has(lead.exam), 'Please select your exam.'],
    ['state', !lead.state, 'Please enter your home state.'],
    ['phone', !INDIAN_MOBILE_REGEX.test(lead.phone), 'Enter a valid 10-digit mobile number.'],
    ['consent', !lead.consent, 'Please tick the consent box.'],
  ];
  const firstError = validationErrors.find(([, invalid]) => invalid);
  if (firstError) return json(res, 400, { field: firstError[0], error: firstError[2] });

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL;
  if (!webhookUrl || !notificationEmail) return json(res, 503, { error: 'Contact service is not configured yet.' });

  try {
    const upstream = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...lead, notificationEmail, source: 'daakhila-website', submittedAt: new Date().toISOString() }),
    });
    if (!upstream.ok) throw new Error(`Webhook returned ${upstream.status}`);
    return json(res, 200, { ok: true });
  } catch (error) {
    console.error('Contact webhook failed', error);
    return json(res, 502, { error: 'We could not send your enquiry. Please use WhatsApp or email instead.' });
  }
}
