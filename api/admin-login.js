import { configured, createSession, json, readBody, safeEqual, sessionCookie } from './_auth.js';

// POST { username, password } -> setzt das Sitzungs-Cookie.
export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { ok: false });
  if (!configured()) return json(res, 503, { ok: false, error: 'not_configured' });

  let body;
  try {
    body = await readBody(req);
  } catch {
    return json(res, 400, { ok: false });
  }

  const userOk = safeEqual(body.username || '', process.env.ADMIN_USER);
  const passOk = safeEqual(body.password || '', process.env.ADMIN_PASSWORD);
  if (!userOk || !passOk) {
    // Gebremst, damit Durchprobieren sich nicht lohnt.
    await new Promise((r) => setTimeout(r, 1000));
    return json(res, 401, { ok: false });
  }

  res.setHeader('Set-Cookie', sessionCookie(createSession()));
  return json(res, 200, { ok: true });
}
