import { For } from "solid-js";

export default function Books() {
  const items = [
    { id: 1, title: "High Card Stud Pokes Her", blurb: "Vegas romance/erotica novella.", status: "Available now" },
  ];

  return (
    <section class="grid gap-6 md:grid-cols-2">
      <For each={items}>
        {(book) => (
          <article class="card hover:shadow-md transition-shadow">
            <h2 class="text-lg font-semibold text-eros-dark mt-0">{book.title}</h2>
            <p class="text-sm text-muted mt-2">{book.blurb}</p>
            <div class="mt-4">
              <span class="chip">{book.status}</span>
            </div>
          </article>
        )}
      </For>
    </section>
  );
}
