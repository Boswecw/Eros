import { A } from "@solidjs/router";
import { getBookCoverUrl } from "~/utils/firebase-images";
import { SEO } from "~/components/SEO";
import { WebsiteSchema } from "~/components/StructuredData";

export default function Home() {
  return (
    <>
      <SEO
        title="Home"
        description="Welcome to Ἔρως - where passion becomes story and fantasy has no limits. Discover bold adult-fantasy romance novels that blend adventure with desire."
        type="website"
      />
      <WebsiteSchema />

      <div class="space-y-14 md:space-y-16">

      {/* BANNER IMAGE — top of page */}
      <section class="w-full">
        <picture>
          <source
            srcset="https://firebasestorage.googleapis.com/v0/b/endless-fire-467204-n2.firebasestorage.app/o/Eros%2FHero_Banner.png?alt=media&token=dcf8616a-2cdf-47a4-9ec6-eb7fa54713a5"
            type="image/png"
          />
          <img
            src="https://firebasestorage.googleapis.com/v0/b/endless-fire-467204-n2.firebasestorage.app/o/Eros%2FHero_Banner.png?alt=media&token=dcf8616a-2cdf-47a4-9ec6-eb7fa54713a5"
            alt="Ἔρως Author - Welcome to the World of Eros - Bold Adult Fantasy Romance"
            class="w-full h-auto rounded-3xl shadow-lg"
            loading="eager"
            decoding="async"
            width="1200"
            height="400"
            fetchpriority="high"
          />
        </picture>
      </section>

      {/* INTRO COPY — separated under banner */}
      <section class="max-w-4xl mx-auto text-center space-y-8 px-6">
        <div>
          <h1 class="text-4xl md:text-6xl font-extrabold leading-tight text-eros-dark mb-4">
            Welcome to the World of Ἔρως
          </h1>
          <p class="text-xl md:text-2xl text-eros-600 font-medium dark:text-eros-300">
            Where passion becomes story—and fantasy has no limits.
          </p>
        </div>

        <div class="text-lg md:text-xl leading-relaxed text-foreground/90 dark:text-slate-200 space-y-5 text-left md:text-center">
          <p>
            Desire is more than heat. It’s a force that drives heroes, tests hearts, and bends destiny itself.
            At <span class="text-eros-dark font-semibold dark:text-eros-300">Ἔρως</span>, every tale is built on that pulse—erotic
            adventure written for readers who crave danger, depth, and devotion.
          </p>
          <p>
            These are stories where warriors fight beside enchantresses, where lovers test fate, and where every moment
            burns with tension that can only be released one way: <span class="italic">surrender.</span>
          </p>
        </div>

        {/* CTAs */}
        <div class="flex flex-wrap justify-center gap-4" role="group" aria-label="Main navigation actions">
          <A
            href="/books"
            class="inline-flex items-center justify-center rounded-xl px-8 py-3 text-lg font-semibold
                   bg-eros-500 hover:bg-eros-600 text-white shadow-md shadow-eros-400/40 transition
                   focus:outline-none focus:ring-2 focus:ring-eros-400 focus:ring-offset-2"
            aria-label="Browse all books by Ἔρως"
          >
            Browse Books
          </A>
          <A
            href="/newsletter"
            class="inline-flex items-center justify-center rounded-xl px-8 py-3 text-lg font-semibold
                   border border-eros-300 text-eros-700 hover:bg-eros-100 transition
                   focus:outline-none focus:ring-2 focus:ring-eros-400 focus:ring-offset-2"
            aria-label="Subscribe to newsletter for updates"
          >
            Join Newsletter
          </A>
        </div>
      </section>

      {/* EROS VISION — high contrast */}
      <section
        class="rounded-2xl bg-white p-6 sm:p-8 border shadow-xl
               border-slate-200
               dark:bg-slate-900 dark:border-slate-700"
        aria-labelledby="eros-vision-heading"
      >
        <div class="flex items-center gap-2 mb-3">
          <span class="text-2xl" aria-hidden="true">💫</span>
          <h2 id="eros-vision-heading"
              class="text-3xl font-extrabold tracking-tight"
              style="color:#4C1D95">
            The Eros Vision
          </h2>
        </div>

        <p class="text-xl font-semibold mb-4
                  text-slate-800 dark:text-slate-100">
          Bold. Intimate. Heroic. Human.
        </p>

        <div class="space-y-4">
          <p class="leading-relaxed text-slate-700 dark:text-slate-200">
            At Ἔρως, stories blend the thrill of adventure with the heat of desire.
            They celebrate courage, connection, and the kind of passion that changes
            the world—and the people brave enough to feel it.
          </p>
          <p class="leading-relaxed text-slate-700 dark:text-slate-200">
            No shame. No apologies. Just power and pleasure written with heart.
          </p>
        </div>
      </section>

      {/* FEATURED BOOK */}
      <section class="card mt-12" aria-labelledby="featured-book-heading">
        <div class="flex items-start gap-2 mb-6">
          <span class="text-2xl" aria-hidden="true">🔥</span>
          <h2 id="featured-book-heading" class="text-3xl font-bold text-eros-dark dark:text-eros-300">The Debut Title</h2>
        </div>

        <div class="grid md:grid-cols-2 gap-8 items-start">
          <div class="flex justify-center md:justify-start">
            <img
              src={getBookCoverUrl("high-card-stud")}
              alt="Book Cover: High Card Stud Pokes Her - Erotic Romance Novel by Ἔρως"
              class="w-72 h-auto rounded-xl shadow-2xl ring-1 ring-black/10"
              loading="lazy"
              decoding="async"
              width="288"
              height="432"
            />
          </div>

          <div class="space-y-6">
            <div>
              <h3 class="text-2xl font-bold text-eros-dark dark:text-eros-300 mb-2">
                High Card Stud Pokes Her
              </h3>
              <p class="text-lg text-muted dark:text-slate-400 italic mb-4">
                Vegas always plays for keeps.
              </p>
            </div>

            <div class="prose max-w-none text-foreground dark:text-slate-200">
              <p>
                When Toni and his fiancée Amy head to Sin City, a friendly bet turns into something far more daring.
                Luck, lust, and loyalty collide in a game that no one truly wins—but everyone remembers.
              </p>
              <p>
                If you love fast-paced erotic drama with high-stakes temptation, this is your first step into the
                Eros Collection.
              </p>
            </div>

            {/* Price */}
            <div class="mb-4">
              <span class="text-3xl font-bold text-eros dark:text-eros-300">$0.99</span>
              <span class="text-lg text-muted dark:text-slate-400 ml-2">Special Launch Price!</span>
            </div>

            <div class="flex flex-wrap gap-3">
              <a
                href="https://www.amazon.com/High-Card-Stud-Pokes-Her-ebook/dp/B0FTSGBPXY/ref=sr_1_1?crid=1KW95KN20UBJ0&dib=eyJ2IjoiMSJ9.7_gwuMKCgAVGn1iJBzA22A.MLQwzC6abiz65gU2LZ9I7R4buUZKuaJW7bBurZtpiTw&dib_tag=se&keywords=High+card+stud+pokes+her&qid=1760656743&s=books&sprefix=high+card+stud+pokes+her%2Cstripbooks%2C162&sr=1-1"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary"
              >
                📖 Read Now on Amazon →
              </a>
              <A href="/books/high-card-stud" class="btn-outline">
                View Details
              </A>
            </div>
          </div>
        </div>
      </section>

      {/* COMING SOON BOOK */}
      <section class="card mt-12" aria-labelledby="coming-soon-heading">
        <div class="flex items-start gap-2 mb-6">
          <span class="text-2xl" aria-hidden="true">📅</span>
          <h2 id="coming-soon-heading" class="text-3xl font-bold text-eros-dark dark:text-eros-300">Coming Soon</h2>
        </div>

        <div class="grid md:grid-cols-2 gap-8 items-start">
          <div class="flex justify-center md:justify-start">
            <img
              src={getBookCoverUrl("sloppy-jo")}
              alt="Book Cover: Sloppy Jo - Coming Soon Erotic Romance Novel by Ἔρως"
              class="w-72 h-auto rounded-xl shadow-2xl ring-1 ring-black/10"
              loading="lazy"
              decoding="async"
              width="288"
              height="432"
            />
          </div>

          <div class="space-y-6">
            <div>
              <h3 class="text-2xl font-bold text-eros-dark dark:text-eros-300 mb-2">
                Sloppy Jo
              </h3>
              <p class="text-lg text-muted dark:text-slate-400 italic mb-4">
                A Provocative Tale of Temptation
              </p>
            </div>

            <div class="prose max-w-none text-foreground dark:text-slate-200">
              <p>
                During the town's mixed-league softball tournament, Jo makes a reckless bet with her best friend, Tabi—one she never expects to lose.
                But when Charlie, Jo's fiancé and teammate, drops a pop fly in the sun, their championship slips away, and the price of her wager comes due.
              </p>
              <p>
                The next Saturday, in the bottoms near the river, an old barn becomes the stage where Jo must pay up—and Charlie can do nothing but watch.
                What happens there will test the limits of pride, trust, and desire.
              </p>
              <p>
                Sloppy Jo is a provocative story of jealousy, temptation, and the risks of love when one mistake changes everything.
              </p>
            </div>

            {/* Coming Soon Status */}
            <div class="mb-4">
              <span class="text-3xl font-bold text-eros dark:text-eros-300">Coming Soon</span>
              <span class="text-lg text-muted dark:text-slate-400 ml-2">Stay tuned for release!</span>
            </div>

            <div class="flex flex-wrap gap-3">
              <A href="/books/sloppy-jo" class="btn-outline">
                View Details
              </A>
              <A href="/newsletter" class="btn-primary">
                Get Notified
              </A>
            </div>
          </div>
        </div>
      </section>

      {/* EROS VISION */}
      <section class="card space-y-6">
        <div class="flex items-start gap-2">
          <span class="text-2xl">💫</span>
          <h2 class="text-3xl font-bold text-eros-dark">The Eros Vision</h2>
        </div>

        <p class="text-xl font-semibold tracking-wide text-eros-dark">
          Bold. Intimate. Heroic. Human.
        </p>

        <p class="text-foreground leading-relaxed">
          At Ἔρως, stories blend the thrill of adventure with the heat of desire.
          They celebrate courage, connection, and the kind of passion that changes the world—and the people brave enough
          to feel it.
        </p>

        <p class="text-foreground leading-relaxed">
          No shame. No apologies. Just power and pleasure written with heart.
        </p>
      </section>
      </div>
    </>
  );
}
