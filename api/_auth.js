// ---------------------------------------------------------------------------
// Gemeinsame Hilfen fuer den Admin-Login (Vercel Functions)
// ---------------------------------------------------------------------------
// Benutzername und Passwort kommen aus den Umgebungsvariablen ADMIN_USER und
// ADMIN_PASSWORD. Die Sitzung ist ein signiertes Cookie (HMAC); der Schluessel
// ist ADMIN_SECRET, ersatzweise das Passwort selbst. Nichts davon erreicht je
// den Browser.
// ---------------------------------------------------------------------------

import { createHmac, timingSafeEqual } from 'node:crypto';

export const COOKIE = 'gg_admin';
const MAX_AGE = 8 * 60 * 60; // 8 Stunden

const secret = () => process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || '';

export const configured = () => Boolean(process.env.ADMIN_USER && process.env.ADMIN_PASSWORD);

/** Vergleich in konstanter Zeit, damit die Laufzeit nichts ueber das Passwort verraet. */
export const safeEqual = (a, b) => {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
};

const sign = (value) => createHmac('sha256', secret()).update(value).digest('hex');

export const createSession = () => {
  const expires = String(Date.now() + MAX_AGE * 1000);
  return `${expires}.${sign(expires)}`;
};

export const validSession = (req) => {
  if (!configured()) return false;
  const raw = (req.headers.cookie || '')
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${COOKIE}=`));
  if (!raw) return false;
  const [expires, mac] = raw.slice(COOKIE.length + 1).split('.');
  if (!expires || !mac || !safeEqual(mac, sign(expires))) return false;
  return Number(expires) > Date.now();
};

export const sessionCookie = (value, maxAge = MAX_AGE) =>
  `${COOKIE}=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`;

export const json = (res, status, body) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
};

/** Liest einen JSON-Body, unabhaengig davon, ob Vercel ihn schon geparst hat. */
export const readBody = async (req) => {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body || '{}');
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const text = Buffer.concat(chunks).toString('utf8');
  return text ? JSON.parse(text) : {};
};
