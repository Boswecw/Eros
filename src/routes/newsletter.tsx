export default function Newsletter() {
  const handleSubmit = (e: Event) => {
    // Only handle client-side logic
    if (typeof window === 'undefined') return;

    // For local testing, prevent default and simulate
    if (window.location.hostname === 'localhost') {
      e.preventDefault();
      setTimeout(() => {
        window.location.href = "/newsletter-success";
      }, 1000);
      return;
    }

    // For production, don't prevent default - let the browser handle the form submission
    // Netlify will intercept and process the form
  };

  return (
    <div class="max-w-md mx-auto space-y-6">
      <form
        name="newsletter"
        method="POST"
        action="/newsletter-success"
        onSubmit={handleSubmit}
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        class="card space-y-4"
      >
          {/* Hidden fields for Netlify */}
          <input type="hidden" name="form-name" value="newsletter" />
          <div style="display: none;">
            <label>Don't fill this out if you're human: <input name="bot-field" /></label>
          </div>

          <div class="text-center">
            <h1 class="text-xl font-semibold text-eros-dark dark:text-eros-300">Join Ἔρως Newsletter</h1>
            <p class="text-sm text-muted dark:text-slate-400 mt-2">Get updates on new releases and exclusive content</p>
          </div>

          <div class="space-y-3">
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              class="w-full rounded-md border border-border bg-surface px-3 py-2 text-text
                     focus:border-eros focus:outline-none focus:ring-2 focus:ring-eros/20
                     dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200"
            />

            <input
              name="name"
              type="text"
              placeholder="Your name (optional)"
              class="w-full rounded-md border border-border bg-surface px-3 py-2 text-text
                     focus:border-eros focus:outline-none focus:ring-2 focus:ring-eros/20
                     dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200"
            />
          </div>

          <button
            type="submit"
            class="btn-primary w-full"
          >
            Subscribe
          </button>

          <p class="text-xs text-center text-muted dark:text-slate-400">No spam. Unsubscribe anytime.</p>
        </form>

      {/* Alternative Contact */}
      <div class="card text-center">
        <p class="text-sm text-muted mb-3">Or connect directly:</p>
        <div class="flex justify-center gap-4 text-sm">
          <a href="mailto:epwc@epwcauthor.com" class="link">Email</a>
          <a href="https://www.patreon.com/c/authoreros" target="_blank" rel="noopener noreferrer" class="link">Patreon</a>
          <a href="https://x.com/EPWCAuthor" target="_blank" rel="noopener noreferrer" class="link">Twitter</a>
        </div>
      </div>
    </div>
  );
}
