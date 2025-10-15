export default function Newsletter() {
  return (
    <form action="https://formspree.io/f/yourFormId" method="post" class="card mx-auto max-w-md space-y-4">
      <div class="text-center">
        <h1 class="text-xl font-semibold text-eros-dark">Join the Newsletter</h1>
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
  );
}
