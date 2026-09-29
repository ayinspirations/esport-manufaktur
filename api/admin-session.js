import { json, validSession } from './_auth.js';

// GET -> { ok: true } bei gueltiger Sitzung.
export default function handler(req, res) {
  return json(res, 200, { ok: validSession(req) });
}
