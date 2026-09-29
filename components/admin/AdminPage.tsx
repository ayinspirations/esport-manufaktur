import React, { useState } from 'react';
import { useDocumentHead } from '../../hooks/useDocumentHead';
import { markEditSession } from './editSession';

// ---------------------------------------------------------------------------
// /admin -- Anmeldung fuer den Vorschau-Modus
// ---------------------------------------------------------------------------
// Benutzername und Passwort stehen als ADMIN_USER / ADMIN_PASSWORD in den
// Umgebungsvariablen von Vercel. Nach der Anmeldung geht es zur Startseite,
// dort erscheint die Vorschau-Leiste.
// ---------------------------------------------------------------------------

export const AdminPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  useDocumentHead({ title: 'Admin | GG Manufaktur', description: 'Vorschau-Modus', robots: 'noindex, nofollow' });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        markEditSession();
        // Neu laden statt nur zu navigieren, damit der Vorschau-Modus sicher startet.
        window.location.href = '/';
        return;
      }
      setError(
        res.status === 503
          ? 'Der Admin-Zugang ist noch nicht eingerichtet (ADMIN_USER / ADMIN_PASSWORD fehlen).'
          : 'Benutzername oder Passwort ist falsch.'
      );
    } catch {
      setError('Anmeldung gerade nicht möglich. Bitte später erneut versuchen.');
    }
    setBusy(false);
  };

  const field =
    'w-full rounded-2xl bg-white/70 border border-white px-5 py-4 text-[#0b0f2a] font-medium outline-none focus:border-[#0e958e] focus:ring-2 focus:ring-[#0e958e]/20';

  return (
    <div className="w-full bg-[#badeda] min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
      <form onSubmit={submit} className="w-full max-w-md rounded-card bg-white/50 border border-white/80 p-8 md:p-10 shadow-[0_30px_60px_-40px_rgba(11,15,42,0.5)]">
        <p className="text-[#0e958e] font-black uppercase tracking-[0.25em] text-[11px] mb-3">Admin</p>
        <h1 className="text-[#0b0f2a] font-black uppercase tracking-tighter text-3xl mb-2">Vorschau-Modus</h1>
        <p className="text-slate-600 text-sm font-medium mb-8">
          Bilder austauschen und Texte ändern, um zu sehen, wie es aussieht. Es wird nichts gespeichert.
        </p>
        <label className="block text-[#0b0f2a] text-sm font-bold mb-2" htmlFor="admin-user">
          Benutzername
        </label>
        <input id="admin-user" className={`${field} mb-5`} autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <label className="block text-[#0b0f2a] text-sm font-bold mb-2" htmlFor="admin-pass">
          Passwort
        </label>
        <input
          id="admin-pass"
          type="password"
          className={`${field} mb-6`}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="mb-5 text-sm font-bold text-red-700">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-full bg-[#0b0f2a] text-white py-4 font-black uppercase tracking-widest text-xs hover:bg-[#0e958e] transition-colors disabled:opacity-60"
        >
          {busy ? 'Anmelden …' : 'Anmelden'}
        </button>
        <button type="button" onClick={() => onNavigate('home')} className="mt-4 w-full text-slate-500 text-xs font-bold hover:text-[#0b0f2a]">
          Zur Startseite
        </button>
      </form>
    </div>
  );
};
