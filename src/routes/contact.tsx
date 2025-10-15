export default function Contact() {
  return (
    <div class="max-w-2xl mx-auto space-y-8">
      {/* Contact Form */}
      <form action="https://formspree.io/f/yourFormId" method="post" class="card space-y-4">
        <h1 class="text-xl font-semibold text-eros-dark">Contact Ἔρως</h1>
        <input
          name="name"
          placeholder="Your name"
          class="w-full rounded-md border border-border bg-surface px-3 py-2 text-text focus:border-eros focus:outline-none focus:ring-2 focus:ring-eros/20"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          class="w-full rounded-md border border-border bg-surface px-3 py-2 text-text focus:border-eros focus:outline-none focus:ring-2 focus:ring-eros/20"
        />
        <textarea
          name="message"
          rows={5}
          placeholder="Your message..."
          class="w-full rounded-md border border-border bg-surface px-3 py-2 text-text focus:border-eros focus:outline-none focus:ring-2 focus:ring-eros/20"
        />
        <button type="submit" class="btn-primary w-full">Send Message</button>
      </form>

      {/* Direct Contact & Social Links */}
      <div class="card space-y-6">
        <h2 class="text-lg font-semibold text-eros-dark">Connect with Ἔρως</h2>

        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <span class="text-sm font-medium text-muted">Email:</span>
            <a href="mailto:epwc@epwcauthor.com" class="link">epwc@epwcauthor.com</a>
          </div>

          <div class="flex items-center gap-3">
            <span class="text-sm font-medium text-muted">Patreon:</span>
            <a href="https://www.patreon.com/c/authoreros" target="_blank" rel="noopener noreferrer" class="link">
              Support on Patreon
            </a>
          </div>

          <div class="flex items-center gap-3">
            <span class="text-sm font-medium text-muted">Twitter/X:</span>
            <a href="https://x.com/EPWCAuthor" target="_blank" rel="noopener noreferrer" class="link">
              @EPWCAuthor
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
