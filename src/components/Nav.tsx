
import { A } from "@solidjs/router";
import { createSignal, Show, onMount } from "solid-js";

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = createSignal(false);
  const [isDarkMode, setIsDarkMode] = createSignal(false);

  // Initialize dark mode from localStorage or system preference
  onMount(() => {
    const stored = localStorage.getItem('darkMode');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = stored ? stored === 'true' : systemPrefersDark;

    setIsDarkMode(shouldBeDark);
    updateDarkMode(shouldBeDark);
  });

  const updateDarkMode = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', dark.toString());
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode();
    setIsDarkMode(newMode);
    updateDarkMode(newMode);
  };

  return (
    <header class="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur dark:bg-slate-900/95 dark:border-slate-700">
      <nav class="flex items-center justify-between w-full">
        {/* Logo - Absolute Far Left Edge */}
        <A href="/" class="flex items-center gap-3 group pl-4 py-4">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/endless-fire-467204-n2.firebasestorage.app/o/Eros%2FEros_Signature_GoldFoil.png?alt=media&token=e2ab0b7a-6a84-494f-b744-0e08b190df39"
            alt="Ἔρως Signature"
            class="h-10 w-auto transition-transform group-hover:scale-105"
          />
        </A>

        {/* Desktop Navigation */}
        <div class="hidden md:flex items-center gap-6 text-sm pr-4">
          <A href="/books" class="link">Books</A>
          <A href="/about" class="link">About</A>
          <A href="/newsletter" class="link">Newsletter</A>
          <A href="/contact" class="link">Contact</A>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            class="p-2 rounded-lg hover:bg-eros-light/10 transition-colors"
            aria-label={isDarkMode() ? "Switch to light mode" : "Switch to dark mode"}
            title={isDarkMode() ? "Switch to light mode" : "Switch to dark mode"}
          >
            <Show when={isDarkMode()} fallback={
              <span class="text-lg">🌙</span>
            }>
              <span class="text-lg">☀️</span>
            </Show>
          </button>

          <A href="/admin" class="link text-xs opacity-60 hover:opacity-100">⚙️</A>
        </div>

        {/* Mobile Controls */}
        <div class="md:hidden flex items-center gap-2 mr-4">
          {/* Dark Mode Toggle - Mobile */}
          <button
            onClick={toggleDarkMode}
            class="p-2 rounded-lg hover:bg-eros-light/10 transition-colors"
            aria-label={isDarkMode() ? "Switch to light mode" : "Switch to dark mode"}
          >
            <Show when={isDarkMode()} fallback={
              <span class="text-lg">🌙</span>
            }>
              <span class="text-lg">☀️</span>
            </Show>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen())}
            class="p-2 text-eros hover:bg-eros-light/10 rounded-lg transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <Show when={!mobileMenuOpen()} fallback={
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              }>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </Show>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Show when={mobileMenuOpen()}>
        <div class="md:hidden border-t border-border bg-surface/95 backdrop-blur">
          <div class="flex flex-col p-4 space-y-3">
            <A href="/books" onClick={() => setMobileMenuOpen(false)} class="link py-2">Books</A>
            <A href="/about" onClick={() => setMobileMenuOpen(false)} class="link py-2">About</A>
            <A href="/newsletter" onClick={() => setMobileMenuOpen(false)} class="link py-2">Newsletter</A>
            <A href="/contact" onClick={() => setMobileMenuOpen(false)} class="link py-2">Contact</A>
          </div>
        </div>
      </Show>
    </header>
  );
}