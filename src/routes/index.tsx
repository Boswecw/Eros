import { A } from "@solidjs/router";

export default function Home() {
  return (
    <section class="card bg-gradient-to-br from-eros-light/30 to-eros-rose/20">
      <div class="header-gradient -m-6 mb-6 rounded-t-2xl p-8">
        <h1 class="text-4xl font-extrabold">High Heat. High Stakes. High Story.</h1>
        <p class="mt-3 text-lg text-white/90">
          Welcome to the world of <strong>Ἔρως</strong>, where bold adult-fantasy comes to life.
        </p>
      </div>

      <div class="flex flex-wrap gap-3">
        <A href="/books" class="btn-primary">Browse Books</A>
        <A href="/newsletter" class="btn-outline">Join Newsletter</A>
      </div>
    </section>
  );
}
