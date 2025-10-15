import { A } from "@solidjs/router";

export default function Nav() {
  return (
    <header class="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur">
      <nav class="mx-auto flex max-w-5xl items-center justify-between p-4">
        <A href="/" class="text-xl font-extrabold tracking-tight text-eros">Ἔρως</A>
        <div class="flex gap-4 text-sm">
          <A href="/books" class="link">Books</A>
          <A href="/about" class="link">About</A>
          <A href="/newsletter" class="link">Newsletter</A>
          <A href="/contact" class="link">Contact</A>
        </div>
      </nav>
    </header>
  );
}
