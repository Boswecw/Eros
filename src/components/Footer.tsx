export default function Footer() {
  return (
    <footer class="border-t border-border bg-surface/50 text-center">
      <div class="mx-auto max-w-5xl p-6 text-xs text-muted">
        © {new Date().getFullYear()} Charles Boswell — <span class="text-eros">Eros</span> Imprint. All rights reserved.
      </div>
    </footer>
  );
}
