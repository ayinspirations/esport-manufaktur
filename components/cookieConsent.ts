// ---------------------------------------------------------------------------
// Cookie consent store
// ---------------------------------------------------------------------------
// The previous implementation stored a single "cookies-accepted" flag, which
// cannot express what the privacy page actually declares (Google Analytics 4,
// HubSpot Analytics). This keeps a per-category record instead, so a visitor
// can accept statistics without accepting marketing, and so the rest of the
// app can ask what it is allowed to load.
//
// Nothing here loads a third-party script by itself -- it only records and
// reports the decision. Consumers check `getConsent()` before loading.
// ---------------------------------------------------------------------------

export type ConsentCategory = 'necessary' | 'statistics' | 'marketing';

export interface Consent {
  necessary: true;
  statistics: boolean;
  marketing: boolean;
  /** ISO timestamp of the decision -- required to show when consent was given. */
  decidedAt: string;
  /** Bump to re-ask everyone after a material change to what is loaded. */
  version: number;
}

export const CONSENT_VERSION = 1;
const KEY = 'cookie-consent';

/** Fires whenever the decision changes, so mounted components can react. */
export const CONSENT_EVENT = 'cookie-consent-change';

export function getConsent(): Consent | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Consent;
    // A stored decision from an older version is treated as no decision, so
    // the visitor is asked again rather than silently kept on stale terms.
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveConsent(choice: { statistics: boolean; marketing: boolean }): Consent {
  const consent: Consent = {
    necessary: true,
    statistics: choice.statistics,
    marketing: choice.marketing,
    decidedAt: new Date().toISOString(),
    version: CONSENT_VERSION
  };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(consent));
  } catch {
    /* storage can be unavailable (private mode, quota) -- the dialog still closes */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: consent }));
  return consent;
}

/** Clears the decision so the dialog is shown again. Used by the footer link. */
export function resetConsent() {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }));
}

export function hasConsentFor(category: ConsentCategory): boolean {
  if (category === 'necessary') return true;
  const c = getConsent();
  return c ? c[category] : false;
}

export const CATEGORIES: {
  id: ConsentCategory;
  label: string;
  description: string;
  locked?: boolean;
}[] = [
  {
    id: 'necessary',
    label: 'Notwendig',
    description:
      'Erforderlich, damit die Seite funktioniert – etwa das Speichern dieser Cookie-Entscheidung. Lässt sich nicht abwählen.',
    locked: true
  },
  {
    id: 'statistics',
    label: 'Statistik',
    description:
      'Hilft uns zu verstehen, wie die Seite genutzt wird – anonymisierte Reichweitenmessung, z. B. Google Analytics.'
  },
  {
    id: 'marketing',
    label: 'Marketing',
    description:
      'Erlaubt eingebettete Dienste wie das HubSpot-Kontaktformular und die Messung von Kampagnen.'
  }
];
