import { A } from "@solidjs/router";
import { createResource, Show, For } from "solid-js";
import { getBookCoverUrl, getBookCoverUrlAuto, initializeAutoDiscovery } from "~/utils/firebase-images";

// Book data with Firebase image integration
const booksData: Record<string, any> = {
  "high-card-stud": {
    id: "high-card-stud",
    title: "High Card Stud Pokes Her",
    subtitle: "A Vegas Heat Novel",
    series: "Vegas Heat",
    seriesNumber: 1,
    author: "Ἔρως",
    description: "In the neon-lit nights of Vegas, where fortunes are won and lost with the turn of a card, Sophia deals more than just blackjack. When enigmatic billionaire Marcus Sterling sits at her table, the chemistry is undeniable.",
    coverImage: getBookCoverUrl("high-card-stud"),
    pageCount: 285,
    genre: ["Romance", "Contemporary Romance", "Erotic Fiction"],
    tags: ["Vegas", "Billionaire", "Poker", "Alpha Male", "Strong Female Lead"],
    steamLevel: 5,
    price: "0.99",
    rating: { value: 4.8, count: 127 }
  },
  "sloppy-jo": {
    id: "sloppy-jo",
    title: "Sloppy Jo",
    subtitle: "A Provocative Tale of Temptation",
    author: "Ἔρως",
    description: "During the town's mixed-league softball tournament, Jo makes a reckless bet with her best friend, Tabi—one she never expects to lose. But when Charlie, Jo's fiancé and teammate, drops a pop fly in the sun, their championship slips away, and the price of her wager comes due. The next Saturday, in the bottoms near the river, an old barn becomes the stage where Jo must pay up—and Charlie can do nothing but watch. What happens there will test the limits of pride, trust, and desire. Sloppy Jo is a provocative story of jealousy, temptation, and the risks of love when one mistake changes everything.",
    coverImage: getBookCoverUrl("sloppy-jo"),
    pageCount: 312,
    genre: ["Romance", "Contemporary Romance", "Erotic Fiction"],
    tags: ["Small Town", "Hotwife", "Voyeurism", "Cuckold", "Jealousy", "Temptation"],
    steamLevel: 5,
    status: "coming-soon",
    price: "Coming Soon",
    rating: null
  }
};

const getAllBooks = async () => {
  // Initialize auto-discovery to find any new book covers
  try {
    console.log('🔍 Checking for new book covers...');
    await initializeAutoDiscovery();
  } catch (error) {
    console.warn('Auto-discovery failed, using manual mappings:', error);
  }

  return Object.values(booksData);
};

export default function Books() {
  const [allBooks] = createResource(getAllBooks);

  return (
    <div class="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div class="text-center space-y-4">
        <h1 class="text-4xl md:text-5xl font-bold text-eros-dark dark:text-eros-300">
          Books by Ἔρως
        </h1>
        <p class="text-xl text-muted dark:text-slate-400 max-w-2xl mx-auto">
          Dive into bold adult-fantasy stories where passion meets adventure.
          Each tale is crafted to captivate and enthrall.
        </p>
      </div>

      {/* Books Grid */}
      <Show when={allBooks()} fallback={<div class="text-center dark:text-slate-300">Loading books...</div>}>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <For each={allBooks()}>
            {(bookItem: any) => (
              <div class="card group hover:shadow-lg transition-all duration-300">
                <A href={`/books/${bookItem.id}`} class="block">
                  {/* Cover Image */}
                  <div class="aspect-[2/3] mb-4 overflow-hidden rounded-lg">
                    <img
                      src={bookItem.coverImage}
                      alt={`${bookItem.title} cover`}
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Book Info */}
                  <div class="space-y-3">
                    <Show when={bookItem.series}>
                      <p class="text-xs text-eros font-semibold uppercase tracking-wider">
                        {bookItem.series} #{bookItem.seriesNumber}
                      </p>
                    </Show>

                    <h3 class="text-xl font-bold text-eros-dark group-hover:text-eros transition-colors">
                      {bookItem.title}
                    </h3>

                    <Show when={bookItem.subtitle}>
                      <p class="text-sm text-muted">{bookItem.subtitle}</p>
                    </Show>

                    <p class="text-sm text-text line-clamp-3">
                      {bookItem.description}
                    </p>

                    {/* Rating and Stats */}
                    <div class="flex items-center justify-between text-xs text-muted dark:text-slate-400">
                      <Show when={bookItem.rating} fallback={
                        <Show when={bookItem.status === "coming-soon"}>
                          <span class="text-eros dark:text-eros-300 font-medium">Coming Soon</span>
                        </Show>
                      }>
                        <div class="flex items-center gap-1">
                          <span class="text-yellow-500">⭐</span>
                          <span>{bookItem.rating.value}</span>
                          <span>({bookItem.rating.count})</span>
                        </div>
                      </Show>
                      <div class="text-eros dark:text-eros-300">
                        {"🔥".repeat(bookItem.steamLevel || 5)}
                      </div>
                    </div>

                    {/* Tags */}
                    <div class="flex flex-wrap gap-1">
                      <For each={bookItem.tags?.slice(0, 3)}>
                        {(tag: string) => (
                          <span class="text-xs px-2 py-1 bg-eros-rose rounded-full text-eros-dark">
                            {tag}
                          </span>
                        )}
                      </For>
                    </div>

                    {/* Price */}
                    <Show when={bookItem.price}>
                      <div class="text-lg font-bold text-eros dark:text-eros-300">
                        <Show when={bookItem.status === "coming-soon"} fallback={`$${bookItem.price}`}>
                          {bookItem.price}
                        </Show>
                      </div>
                    </Show>
                  </div>
                </A>
              </div>
            )}
          </For>
        </div>
      </Show>

      {/* Call to Action */}
      <div class="card bg-gradient-to-r from-eros-light/20 to-transparent text-center">
        <h2 class="text-2xl font-bold text-eros-dark mb-4">
          Stay Updated
        </h2>
        <p class="text-text mb-6">
          Be the first to know about new releases, exclusive content, and special offers.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <A href="/newsletter" class="btn-primary">Join Newsletter</A>
          <a
            href="https://www.patreon.com/c/authoreros"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-outline"
          >
            Support on Patreon
          </a>
        </div>
      </div>
    </div>
  );
}
