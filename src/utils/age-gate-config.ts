// Configuration for age gate behavior

// Pages that should bypass the age gate (if any)
// These would be safe, non-adult content pages
export const AGE_GATE_BYPASS_ROUTES = [
  // Uncomment any routes that should be accessible without age verification
  // '/about',
  // '/contact',
  // '/newsletter',
];

// Check if current route should bypass age gate
export function shouldBypassAgeGate(pathname: string): boolean {
  return AGE_GATE_BYPASS_ROUTES.some(route => pathname === route);
}

// Age gate settings
export const AGE_GATE_CONFIG = {
  minimumAge: 18,
  verificationExpiryDays: 30,
  storageKey: 'eros-age-verified',
  storageDateKey: 'eros-age-verified-date',
  exitUrl: 'https://www.google.com',
};
