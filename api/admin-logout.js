import { json, sessionCookie } from './_auth.js';

// POST -> loescht das Sitzungs-Cookie.
export default function handler(req, res) {
  res.setHeader('Set-Cookie', sessionCookie('', 0));
  return json(res, 200, { ok: true });
}
