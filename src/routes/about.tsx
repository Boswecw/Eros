export default function About() {
  return (
    <div class="max-w-2xl mx-auto space-y-8">
      <article class="card">
        <h1 class="text-3xl font-bold text-eros-dark mb-4">About Ἔρως</h1>
        <div class="prose prose-lg max-w-none">
          <p class="text-text leading-relaxed">
            <span class="text-eros font-semibold">Ἔρως</span> is an author dedicated to crafting bold adult-fantasy stories that captivate and enthrall.
          </p>
          <p class="text-muted mt-4">
            Bringing passion, adventure, and compelling characters to life through immersive storytelling that pushes boundaries and explores the depths of desire.
          </p>
        </div>
      </article>

      {/* Connect Section */}
      <div class="card">
        <h2 class="text-xl font-semibold text-eros-dark mb-4">Connect & Support</h2>
        <div class="grid gap-4 md:grid-cols-3">
          <a href="mailto:epwc@epwcauthor.com" class="flex flex-col items-center p-4 rounded-lg border border-border hover:bg-eros-light/10 transition-colors">
            <span class="text-sm font-medium text-eros">Email</span>
            <span class="text-xs text-muted mt-1">Direct contact</span>
          </a>
          <a href="https://www.patreon.com/c/authoreros" target="_blank" rel="noopener noreferrer" class="flex flex-col items-center p-4 rounded-lg border border-border hover:bg-eros-light/10 transition-colors">
            <span class="text-sm font-medium text-eros">Patreon</span>
            <span class="text-xs text-muted mt-1">Support the work</span>
          </a>
          <a href="https://x.com/EPWCAuthor" target="_blank" rel="noopener noreferrer" class="flex flex-col items-center p-4 rounded-lg border border-border hover:bg-eros-light/10 transition-colors">
            <span class="text-sm font-medium text-eros">Twitter</span>
            <span class="text-xs text-muted mt-1">Latest updates</span>
          </a>
        </div>
      </div>
    </div>
  );
}
