import { createSignal, createEffect, Show, onMount } from "solid-js";
import { shouldBypassAgeGate, AGE_GATE_CONFIG } from "~/utils/age-gate-config";

interface AgeGateProps {
  children: any;
}

export default function AgeGate(props: AgeGateProps) {
  const [isVerified, setIsVerified] = createSignal(false);
  const [showGate, setShowGate] = createSignal(true);
  const [birthMonth, setBirthMonth] = createSignal("");
  const [birthDay, setBirthDay] = createSignal("");
  const [birthYear, setBirthYear] = createSignal("");
  const [error, setError] = createSignal("");
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [isClient, setIsClient] = createSignal(false);

  // Initialize client-side only
  onMount(() => {
    setIsClient(true);

    // Check if current route should bypass age gate
    if (shouldBypassAgeGate(window.location.pathname)) {
      setIsVerified(true);
      setShowGate(false);
      return;
    }

    // Check if user has already verified (stored in localStorage)
    const verified = localStorage.getItem(AGE_GATE_CONFIG.storageKey);
    const verifiedDate = localStorage.getItem(AGE_GATE_CONFIG.storageDateKey);

    if (verified === "true" && verifiedDate) {
      const storedDate = new Date(verifiedDate);
      const now = new Date();
      const daysDiff = (now.getTime() - storedDate.getTime()) / (1000 * 3600 * 24);

      // Verification expires after configured days
      if (daysDiff < AGE_GATE_CONFIG.verificationExpiryDays) {
        setIsVerified(true);
        setShowGate(false);
      } else {
        localStorage.removeItem(AGE_GATE_CONFIG.storageKey);
        localStorage.removeItem(AGE_GATE_CONFIG.storageDateKey);
      }
    }
  });

  const calculateAge = (month: number, day: number, year: number): number => {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleVerification = async (e: Event) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const month = parseInt(birthMonth());
    const day = parseInt(birthDay());
    const year = parseInt(birthYear());

    // Validation
    if (!month || !day || !year) {
      setError("Please enter your complete birth date.");
      setIsSubmitting(false);
      return;
    }

    if (month < 1 || month > 12) {
      setError("Please enter a valid month (1-12).");
      setIsSubmitting(false);
      return;
    }

    if (day < 1 || day > 31) {
      setError("Please enter a valid day (1-31).");
      setIsSubmitting(false);
      return;
    }

    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear) {
      setError("Please enter a valid birth year.");
      setIsSubmitting(false);
      return;
    }

    // Check if date is valid
    const testDate = new Date(year, month - 1, day);
    if (testDate.getMonth() !== month - 1 || testDate.getDate() !== day || testDate.getFullYear() !== year) {
      setError("Please enter a valid date.");
      setIsSubmitting(false);
      return;
    }

    // Check if date is in the future
    if (testDate > new Date()) {
      setError("Birth date cannot be in the future.");
      setIsSubmitting(false);
      return;
    }

    // Calculate age
    const age = calculateAge(month, day, year);

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (age >= AGE_GATE_CONFIG.minimumAge) {
      // Store verification in localStorage
      localStorage.setItem(AGE_GATE_CONFIG.storageKey, "true");
      localStorage.setItem(AGE_GATE_CONFIG.storageDateKey, new Date().toISOString());

      setIsVerified(true);
      setTimeout(() => setShowGate(false), 500);
    } else {
      setError(`You must be ${AGE_GATE_CONFIG.minimumAge} or older to access this content.`);
    }

    setIsSubmitting(false);
  };

  const handleExit = () => {
    // Redirect to configured exit URL
    window.location.href = AGE_GATE_CONFIG.exitUrl;
  };

  return (
    <>
      <Show when={isClient() && showGate()}>
        <div class="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
            {/* Warning Icon */}
            <div class="text-6xl mb-6">🔞</div>
            
            {/* Title */}
            <h1 class="text-2xl font-bold text-eros-dark dark:text-eros-300 mb-4">
              Age Verification Required
            </h1>
            
            {/* Warning Text */}
            <div class="text-sm text-muted dark:text-slate-400 mb-6 space-y-2">
              <p>
                This website contains adult content intended for mature audiences only.
              </p>
              <p class="font-semibold">
                You must be 18 years or older to continue.
              </p>
            </div>

            {/* Birth Date Form */}
            <form onSubmit={handleVerification} class="space-y-4">
              <div class="text-left">
                <label class="block text-sm font-medium text-eros-dark dark:text-eros-300 mb-3">
                  Enter your birth date:
                </label>
                
                <div class="grid grid-cols-3 gap-3">
                  {/* Month */}
                  <div>
                    <label class="block text-xs text-muted dark:text-slate-400 mb-1">Month</label>
                    <select
                      value={birthMonth()}
                      onChange={(e) => setBirthMonth(e.currentTarget.value)}
                      class="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-eros focus:border-eros dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200"
                      required
                      disabled={isSubmitting()}
                    >
                      <option value="">MM</option>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option value={i + 1}>{String(i + 1).padStart(2, '0')}</option>
                      ))}
                    </select>
                  </div>

                  {/* Day */}
                  <div>
                    <label class="block text-xs text-muted dark:text-slate-400 mb-1">Day</label>
                    <select
                      value={birthDay()}
                      onChange={(e) => setBirthDay(e.currentTarget.value)}
                      class="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-eros focus:border-eros dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200"
                      required
                      disabled={isSubmitting()}
                    >
                      <option value="">DD</option>
                      {Array.from({ length: 31 }, (_, i) => (
                        <option value={i + 1}>{String(i + 1).padStart(2, '0')}</option>
                      ))}
                    </select>
                  </div>

                  {/* Year */}
                  <div>
                    <label class="block text-xs text-muted dark:text-slate-400 mb-1">Year</label>
                    <select
                      value={birthYear()}
                      onChange={(e) => setBirthYear(e.currentTarget.value)}
                      class="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-eros focus:border-eros dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200"
                      required
                      disabled={isSubmitting()}
                    >
                      <option value="">YYYY</option>
                      {Array.from({ length: 100 }, (_, i) => {
                        const year = new Date().getFullYear() - i;
                        return <option value={year}>{year}</option>;
                      })}
                    </select>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              <Show when={error()}>
                <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  <p class="text-sm text-red-600 dark:text-red-400">{error()}</p>
                </div>
              </Show>

              {/* Buttons */}
              <div class="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting()}
                  class="flex-1 bg-eros-500 hover:bg-eros-600 disabled:bg-eros-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:cursor-not-allowed"
                >
                  {isSubmitting() ? "Verifying..." : "Enter Site"}
                </button>
                
                <button
                  type="button"
                  onClick={handleExit}
                  disabled={isSubmitting()}
                  class="flex-1 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:cursor-not-allowed"
                >
                  Exit
                </button>
              </div>
            </form>

            {/* Admin Bypass (for testing) */}
            <div class="mt-4">
              <button
                type="button"
                onClick={() => {
                  if (window.location.hostname === 'localhost') {
                    localStorage.setItem(AGE_GATE_CONFIG.storageKey, "true");
                    localStorage.setItem(AGE_GATE_CONFIG.storageDateKey, new Date().toISOString());
                    setIsVerified(true);
                    setShowGate(false);
                  }
                }}
                class="text-xs text-muted dark:text-slate-400 hover:text-eros underline"
              >
                {window.location.hostname === 'localhost' ? 'Skip (Dev Mode)' : ''}
              </button>
            </div>

            {/* Legal Notice */}
            <div class="mt-6 pt-4 border-t border-border">
              <p class="text-xs text-muted dark:text-slate-400">
                By entering this site, you certify that you are of legal age and agree to our terms of use.
              </p>
            </div>
          </div>
        </div>
      </Show>

      {/* Main Content - Only shown after verification or during SSR */}
      <Show when={!isClient() || isVerified()}>
        {props.children}
      </Show>
    </>
  );
}
