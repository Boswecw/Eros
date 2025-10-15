export default function Footer() {
  return (
    <footer class="border-t border-border bg-surface/50">
      <div class="mx-auto max-w-5xl p-6">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="text-xs text-muted">
            © {new Date().getFullYear()} <span class="text-eros">Ἔρως</span>. All rights reserved.
          </div>
          <div class="flex gap-4 text-xs">
            <a href="mailto:epwc@epwcauthor.com" class="link">Email</a>
            <a href="https://www.patreon.com/c/authoreros" target="_blank" rel="noopener noreferrer" class="link">Patreon</a>
            <a href="https://x.com/EPWCAuthor" target="_blank" rel="noopener noreferrer" class="link">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
