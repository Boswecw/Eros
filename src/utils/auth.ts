// Secure authentication utility with password salting

/**
 * Generate a random salt for password hashing
 */
export function generateSalt(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Hash a password with salt using Web Crypto API
 */
export async function hashPassword(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + salt);
  
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}

/**
 * Verify a password against a stored hash and salt
 */
export async function verifyPassword(password: string, salt: string, storedHash: string): Promise<boolean> {
  const computedHash = await hashPassword(password, salt);
  return computedHash === storedHash;
}

/**
 * Admin credentials (in production, store these securely in environment variables)
 * For now, using a pre-computed hash with salt
 */
const ADMIN_SALT = "a1b2c3d4e5f6789012345678901234567890abcdef"; // Example salt
const ADMIN_PASSWORD_HASH = ""; // Will be set below

// Pre-compute the admin password hash (you should change this password!)
const ADMIN_PASSWORD = "ErosAdmin2025!"; // Change this to your desired password

// Initialize the admin hash (this runs once when the module loads)
let adminHashPromise: Promise<string> | null = null;

async function initializeAdminHash(): Promise<string> {
  if (!adminHashPromise) {
    adminHashPromise = hashPassword(ADMIN_PASSWORD, ADMIN_SALT);
  }
  return adminHashPromise;
}

/**
 * Verify admin credentials
 */
export async function verifyAdminCredentials(password: string): Promise<boolean> {
  try {
    const storedHash = await initializeAdminHash();
    return await verifyPassword(password, ADMIN_SALT, storedHash);
  } catch (error) {
    console.error('Admin verification failed:', error);
    return false;
  }
}

/**
 * Session management using localStorage (client-side)
 */
export class AdminSession {
  private static readonly SESSION_KEY = 'eros_admin_session';
  private static readonly SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  static setSession(): void {
    const sessionData = {
      timestamp: Date.now(),
      expires: Date.now() + this.SESSION_DURATION
    };
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
  }

  static isValidSession(): boolean {
    try {
      const sessionData = localStorage.getItem(this.SESSION_KEY);
      if (!sessionData) return false;

      const session = JSON.parse(sessionData);
      return Date.now() < session.expires;
    } catch {
      return false;
    }
  }

  static clearSession(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }

  static getRemainingTime(): number {
    try {
      const sessionData = localStorage.getItem(this.SESSION_KEY);
      if (!sessionData) return 0;

      const session = JSON.parse(sessionData);
      const remaining = session.expires - Date.now();
      return Math.max(0, remaining);
    } catch {
      return 0;
    }
  }
}

/**
 * Generate a secure session token (for more advanced session management)
 */
export async function generateSessionToken(): Promise<string> {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  
  const hashBuffer = await crypto.subtle.digest('SHA-256', array);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Rate limiting for login attempts
 */
export class LoginRateLimit {
  private static readonly MAX_ATTEMPTS = 5;
  private static readonly LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
  private static readonly STORAGE_KEY = 'eros_login_attempts';

  static recordAttempt(success: boolean): void {
    const attempts = this.getAttempts();
    
    if (success) {
      // Clear attempts on successful login
      localStorage.removeItem(this.STORAGE_KEY);
    } else {
      // Record failed attempt
      attempts.push(Date.now());
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(attempts));
    }
  }

  static isLocked(): boolean {
    const attempts = this.getAttempts();
    const recentAttempts = attempts.filter(time => Date.now() - time < this.LOCKOUT_DURATION);
    
    return recentAttempts.length >= this.MAX_ATTEMPTS;
  }

  static getRemainingLockoutTime(): number {
    if (!this.isLocked()) return 0;
    
    const attempts = this.getAttempts();
    const oldestRecentAttempt = Math.min(...attempts.filter(time => Date.now() - time < this.LOCKOUT_DURATION));
    const unlockTime = oldestRecentAttempt + this.LOCKOUT_DURATION;
    
    return Math.max(0, unlockTime - Date.now());
  }

  private static getAttempts(): number[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }
}

/**
 * Utility to check if running in browser (for SSR compatibility)
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

/**
 * Admin authentication hook for SolidJS components
 */
export function useAdminAuth() {
  const isAuthenticated = () => isBrowser() && AdminSession.isValidSession();
  const isLocked = () => isBrowser() && LoginRateLimit.isLocked();
  
  return {
    isAuthenticated,
    isLocked,
    login: async (password: string) => {
      if (!isBrowser()) return false;
      
      if (LoginRateLimit.isLocked()) {
        throw new Error('Too many failed attempts. Please try again later.');
      }
      
      const success = await verifyAdminCredentials(password);
      LoginRateLimit.recordAttempt(success);
      
      if (success) {
        AdminSession.setSession();
      }
      
      return success;
    },
    logout: () => {
      if (isBrowser()) {
        AdminSession.clearSession();
      }
    },
    getRemainingTime: () => isBrowser() ? AdminSession.getRemainingTime() : 0,
    getLockoutTime: () => isBrowser() ? LoginRateLimit.getRemainingLockoutTime() : 0
  };
}
