import { promises as dns } from 'node:dns';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }

  try {
    const value = String(req.body?.email || '').trim().toLowerCase();
    const basicEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!basicEmail.test(value)) {
      return res.status(400).json({ ok: false, valid: false, message: 'Enter a valid email address.' });
    }
    const domain = value.split('@')[1];
    const records = await dns.resolveMx(domain);
    const hasMailServer = Array.isArray(records) && records.length > 0;
    return res.status(200).json({
      ok: true,
      valid: hasMailServer,
      deliverableDomain: hasMailServer,
      message: hasMailServer ? 'Email domain verified.' : 'This email domain does not appear to have a mail server.'
    });
  } catch (error) {
    console.error('Email verification error:', error);
    return res.status(200).json({ ok: false, valid: null, message: 'Email domain could not be verified right now. Please check the address and try again.' });
  }
}
