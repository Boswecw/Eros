export default function Newsletter() {
  return (
    <div class="max-w-md mx-auto space-y-6">
      <form action="https://formspree.io/f/yourFormId" method="post" class="card space-y-4">
        <div class="text-center">
          <h1 class="text-xl font-semibold text-eros-dark">Join Ἔρως Newsletter</h1>
          <p class="text-sm text-muted mt-2">Get updates on new releases and exclusive content</p>
        </div>
        <input
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          class="w-full rounded-md border border-border bg-surface px-3 py-2 text-text focus:border-eros focus:outline-none focus:ring-2 focus:ring-eros/20"
        />
        <button type="submit" class="btn-primary w-full">Subscribe</button>
        <p class="text-xs text-center text-muted">No spam. Unsubscribe anytime.</p>
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
