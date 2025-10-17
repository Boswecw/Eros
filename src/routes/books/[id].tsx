import { useParams, A } from "@solidjs/router";
import { createResource, Show, For } from "solid-js";
// import { SEO } from "~/components/SEO";
// import { BookSchema } from "~/components/StructuredData";
import { getBookCoverUrl } from "~/utils/firebase-images";

// This would normally come from a database or API
const booksData: Record<string, any> = {
  "high-card-stud": {
    id: "high-card-stud",
    title: "High Card Stud Pokes Her",
    subtitle: "A Vegas Heat Novel",
    series: "Vegas Heat",
    seriesNumber: 1,
    author: "Ἔρως",
    isbn: "978-0-00000-000-0",
    description: "In the neon-lit nights of Vegas, where fortunes are won and lost with the turn of a card, Sophia deals more than just blackjack. When enigmatic billionaire Marcus Sterling sits at her table, the chemistry is undeniable. But in a city built on secrets and seduction, nothing is as it seems.",
    fullDescription: `In the neon-lit nights of Vegas, where fortunes are won and lost with the turn of a card, Sophia deals more than just blackjack. When enigmatic billionaire Marcus Sterling sits at her table, the chemistry is undeniable.

But in a city built on secrets and seduction, nothing is as it seems. Marcus isn't just another high-roller looking for thrills—he's playing a much more dangerous game, and Sophia finds herself as both the dealer and the prize.

As the stakes rise higher than any pot on the table, Sophia must decide if she's willing to go all-in on a love that could cost her everything. In a city where everyone's running a con, can she trust the man who holds all the cards?

This scorching hot romance will leave you breathless as passion ignites against the glittering backdrop of Sin City, where the only sure bet is that nothing is ever as it seems.`,
    coverImage: getBookCoverUrl("high-card-stud"),
    datePublished: "2024-11-15",
    pageCount: 285,
    genre: ["Romance", "Contemporary Romance", "Erotic Fiction"],
    tags: ["Vegas", "Billionaire", "Poker", "Alpha Male", "Strong Female Lead"],
    steamLevel: 5,
    buyLinks: {
      amazon: "https://amazon.com/dp/B0000000001",
      kobo: "#",
      apple: "#",
      patreon: "https://www.patreon.com/c/authoreros"
    },
    price: "0.99",
    rating: { value: 4.8, count: 127 }
  },
  "sloppy-jo": {
    id: "sloppy-jo",
    title: "Sloppy Jo",
    subtitle: "A Provocative Tale of Temptation",
    author: "Ἔρως",
    description: "During the town's mixed-league softball tournament, Jo makes a reckless bet with her best friend, Tabi—one she never expects to lose. But when Charlie, Jo's fiancé and teammate, drops a pop fly in the sun, their championship slips away, and the price of her wager comes due. The next Saturday, in the bottoms near the river, an old barn becomes the stage where Jo must pay up—and Charlie can do nothing but watch. What happens there will test the limits of pride, trust, and desire. Sloppy Jo is a provocative story of jealousy, temptation, and the risks of love when one mistake changes everything.",
    fullDescription: `During the town's mixed-league softball tournament, Jo makes a reckless bet with her best friend, Tabi—one she never expects to lose.
But when Charlie, Jo's fiancé and teammate, drops a pop fly in the sun, their championship slips away, and the price of her wager comes due.

The next Saturday, in the bottoms near the river, an old barn becomes the stage where Jo must pay up—and Charlie can do nothing but watch. What happens there will test the limits of pride, trust, and desire.

Sloppy Jo is a provocative story of jealousy, temptation, and the risks of love when one mistake changes everything.`,
    coverImage: getBookCoverUrl("sloppy-jo"),
    datePublished: "2024-10-01",
    pageCount: 312,
    genre: ["Romance", "Contemporary Romance", "Erotic Fiction"],
    tags: ["Small Town", "Hotwife", "Voyeurism", "Cuckold", "Jealousy", "Temptation"],
    steamLevel: 5,
    buyLinks: {
      patreon: "https://www.patreon.com/c/authoreros"
    },
    status: "coming-soon",
    price: "Coming Soon",
    rating: null
  }
};

const getBookById = async (id: string) => {
  return booksData[id] || null;
};

export default function BookDetail() {
  const params = useParams();
  const [book] = createResource(() => params.id, getBookById);

  return (
    <Show when={book()} fallback={<div>Loading...</div>}>
      {(bookData) => (
        <>
          {/* <SEO
            title={bookData().title}
            description={bookData().description}
            image={bookData().coverImage}
            type="book"
          />

          <BookSchema
            title={bookData().title}
            author={bookData().author}
            isbn={bookData().isbn}
            description={bookData().description}
            image={bookData().coverImage}
            datePublished={bookData().datePublished}
            genre={bookData().genre}
            numberOfPages={bookData().pageCount}
            aggregateRating={
              bookData().rating ? {
                ratingValue: bookData().rating.value,
                reviewCount: bookData().rating.count
              } : undefined
            }
            offers={
              bookData().buyLinks?.amazon ? [{
                price: bookData().price || "4.99",
                priceCurrency: "USD",
                availability: "InStock",
                url: bookData().buyLinks.amazon
              }] : undefined
            }
          /> */}

          <div class="max-w-6xl mx-auto space-y-8">
            {/* Book Header */}
            <div class="card">
              <div class="flex flex-col md:flex-row gap-8">
                {/* Cover Image */}
                <div class="md:w-1/3">
                  <img 
                    src={bookData().coverImage}
                    alt={`${bookData().title} cover`}
                    class="w-full rounded-lg shadow-xl"
                  />
                </div>

                {/* Book Info */}
                <div class="md:w-2/3 space-y-6">
                  <div>
                    <Show when={bookData().series}>
                      <p class="text-sm text-eros font-semibold uppercase tracking-wider mb-2">
                        {bookData().series} #{bookData().seriesNumber}
                      </p>
                    </Show>
                    <h1 class="text-3xl md:text-4xl font-bold text-eros-dark">
                      {bookData().title}
                    </h1>
                    <Show when={bookData().subtitle}>
                      <p class="text-xl text-muted mt-2">{bookData().subtitle}</p>
                    </Show>
                    <p class="text-sm text-muted mt-3">by {bookData().author}</p>
                  </div>

                  {/* Rating and Stats */}
                  <div class="flex flex-wrap gap-6 text-sm">
                    <Show when={bookData().rating}>
                      <div class="flex items-center gap-2">
                        <span class="text-yellow-500">⭐</span>
                        <span class="font-semibold">{bookData().rating.value}</span>
                        <span class="text-muted">({bookData().rating.count} reviews)</span>
                      </div>
                    </Show>
                    <Show when={bookData().pageCount}>
                      <div class="text-muted">
                        📖 {bookData().pageCount} pages
                      </div>
                    </Show>
                    <div class="text-eros">
                      {"🔥".repeat(bookData().steamLevel || 5)}
                    </div>
                  </div>

                  {/* Quick Description */}
                  <p class="text-text dark:text-slate-200 leading-relaxed">
                    {bookData().description}
                  </p>

                  {/* Buy Buttons */}
                  <div class="space-y-3">
                    <Show when={bookData().buyLinks?.amazon}>
                      <a 
                        href={bookData().buyLinks.amazon}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn-primary inline-flex items-center gap-2"
                      >
                        <span>Buy on Amazon</span>
                        <Show when={bookData().price}>
                          <span class="opacity-80">• ${bookData().price}</span>
                        </Show>
                      </a>
                    </Show>
                    <Show when={bookData().buyLinks?.patreon}>
                      <a 
                        href={bookData().buyLinks.patreon}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn-outline inline-flex items-center gap-2 ml-3"
                      >
                        Read on Patreon
                      </a>
                    </Show>
                  </div>

                  {/* Tags */}
                  <div class="flex flex-wrap gap-2">
                    <For each={bookData().tags}>
                      {(tag) => (
                        <span class="text-xs px-3 py-1 bg-eros-rose rounded-full text-eros-dark">
                          {tag}
                        </span>
                      )}
                    </For>
                  </div>
                </div>
              </div>
            </div>

            {/* Full Description */}
            <Show when={bookData().fullDescription}>
              <div class="card">
                <h2 class="text-2xl font-bold text-eros-dark dark:text-eros-300 mb-4">About This Book</h2>
                <div class="prose prose-lg max-w-none">
                  {bookData().fullDescription.split('\n\n').map((paragraph: string) => (
                    <p class="text-text dark:text-slate-200 leading-relaxed mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>
            </Show>

            {/* Other Books in Series */}
            <Show when={bookData().series}>
              <div class="card bg-gradient-to-r from-eros-light/20 to-transparent">
                <h2 class="text-2xl font-bold text-eros-dark mb-4">
                  More in the {bookData().series} Series
                </h2>
                <p class="text-text mb-6">
                  Can't get enough? Continue the journey with the complete series.
                </p>
                <div class="flex gap-3">
                  <A href="/books" class="btn-primary">View All Books</A>
                  <A href="/newsletter" class="btn-outline">Get Series Updates</A>
                </div>
              </div>
            </Show>
          </div>
        </>
      )}
    </Show>
  );
}
