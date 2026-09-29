// Merkt sich im Tab, dass der Vorschau-Modus aktiv sein soll. Die echte
// Pruefung macht der Server (/api/admin-session) -- dieses Flag spart nur den
// Aufruf fuer alle, die nie eingeloggt waren.
const KEY = 'gg-edit-mode';

export const markEditSession = () => {
  try {
    sessionStorage.setItem(KEY, '1');
  } catch {
    /* Privatmodus o. ae. */
  }
};

export const clearEditSession = () => {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* egal */
  }
};

export const hasEditSession = () => {
  try {
    return sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
};

export const checkServerSession = async () => {
  try {
    const res = await fetch('/api/admin-session', { credentials: 'same-origin', cache: 'no-store' });
    const data = await res.json();
    return Boolean(data.ok);
  } catch {
    return false;
  }
};
