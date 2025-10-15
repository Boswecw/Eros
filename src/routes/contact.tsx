export default function Contact() {
  return (
    <form action="https://formspree.io/f/yourFormId" method="post" class="card mx-auto max-w-md space-y-4">
      <h1 class="text-xl font-semibold text-eros-dark">Contact</h1>
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
        placeholder="How can I help?"
        class="w-full rounded-md border border-border bg-surface px-3 py-2 text-text focus:border-eros focus:outline-none focus:ring-2 focus:ring-eros/20"
      />
      <button type="submit" class="btn-primary w-full">Send</button>
    </form>
  );
}
