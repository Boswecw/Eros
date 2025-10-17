
import { A } from "@solidjs/router";
import { SEO } from "~/components/SEO";
import { AuthorSchema } from "~/components/StructuredData";

export default function About() {
  return (
    <>
      <SEO
        title="About"
        description="Meet Ἔρως, author of bold adult-fantasy romance. Bringing passion, adventure, and compelling characters to life through immersive storytelling."
      />

      <AuthorSchema
        name="Ἔρως"
        url="https://epwcauthor.com"
        image="https://firebasestorage.googleapis.com/v0/b/endless-fire-467204-n2.firebasestorage.app/o/Eros%2FEros_Signature_GoldFoil.png?alt=media&token=e2ab0b7a-6a84-494f-b744-0e08b190df39"
        sameAs={[
          "https://twitter.com/EPWCAuthor",
          "https://www.patreon.com/c/authoreros"
        ]}
        description="Author of bold adult-fantasy stories that captivate and enthrall."
      />

      <div class="max-w-4xl mx-auto space-y-8">
        {/* Author Introduction */}
        <article class="card bg-gradient-to-br from-eros-light/20 to-eros-rose/10">
          <div class="flex justify-center mb-6">
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/endless-fire-467204-n2.firebasestorage.app/o/Eros%2FEros_Signature_GoldFoil.png?alt=media&token=e2ab0b7a-6a84-494f-b744-0e08b190df39"
              alt="Ἔρως Signature"
              class="h-20 w-auto"
            />
          </div>
          
          <h1 class="text-3xl font-bold text-eros-dark dark:text-eros-300 mb-6 text-center">About Ἔρως</h1>
          
          <div class="prose prose-lg max-w-none space-y-4">
            <p class="text-text dark:text-slate-200 leading-relaxed">
              <span class="text-eros font-semibold text-xl dark:text-eros-300">Ἔρως</span> writes the stories
              that keep you up at night—and not just because you can't put them down.
              Specializing in high-heat adult romance that doesn't shy away from complexity,
              each book is a journey into passion, danger, and desire.
            </p>
            
            <p class="text-text leading-relaxed">
              From the glittering casinos of Vegas to the sultry streets of New Orleans, 
              these stories transport readers into worlds where love is never simple, 
              stakes are always high, and the heat is guaranteed to scorch.
            </p>
            
            <p class="text-text leading-relaxed">
              When not crafting steamy scenes that fog up e-readers everywhere, 
              Ἔρως can be found researching the perfect cocktail recipe (for the books, of course), 
              people-watching in interesting locations, and plotting the next romance 
              that will leave readers breathless.
            </p>
          </div>
        </article>

        {/* Writing Philosophy */}
        <div class="card">
          <h2 class="text-2xl font-semibold text-eros-dark mb-4">Writing Philosophy</h2>
          <div class="space-y-6">
            <div class="flex gap-4">
              <span class="text-2xl">🔥</span>
              <div>
                <h3 class="font-semibold text-eros mb-2">Heat Without Compromise</h3>
                <p class="text-sm text-text">
                  Every scene earns its place in the story. The steam isn't just hot—it's 
                  meaningful, moving the plot and deepening character connections.
                </p>
              </div>
            </div>
            
            <div class="flex gap-4">
              <span class="text-2xl">💪</span>
              <div>
                <h3 class="font-semibold text-eros mb-2">Strong Characters, Real Emotions</h3>
                <p class="text-sm text-text">
                  Heroes and heroines who are flawed, complex, and irresistibly human. 
                  No damsels in distress here—just real people finding extraordinary love.
                </p>
              </div>
            </div>
            
            <div class="flex gap-4">
              <span class="text-2xl">⚡</span>
              <div>
                <h3 class="font-semibold text-eros mb-2">Plot That Grips</h3>
                <p class="text-sm text-text">
                  Romance doesn't mean sacrificing story. Every book delivers twists, 
                  tension, and the kind of plot that keeps pages turning until dawn.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Connect Section */}
        <div class="card">
          <h2 class="text-xl font-semibold text-eros-dark mb-4">Connect with Ἔρως</h2>
          <p class="text-text mb-6">
            Join the conversation, get exclusive content, and be the first to know about new releases.
          </p>
          <div class="grid gap-4 md:grid-cols-3">
            <a href="mailto:epwc@epwcauthor.com" 
               class="flex flex-col items-center p-4 rounded-lg border border-border 
                      hover:bg-eros-light/10 hover:border-eros transition-all">
              <span class="text-2xl mb-2">✉️</span>
              <span class="text-sm font-medium text-eros">Email</span>
              <span class="text-xs text-muted mt-1">Direct contact</span>
            </a>
            
            <a href="https://www.patreon.com/c/authoreros" 
               target="_blank" 
               rel="noopener noreferrer" 
               class="flex flex-col items-center p-4 rounded-lg border border-border 
                      hover:bg-eros-light/10 hover:border-eros transition-all">
              <span class="text-2xl mb-2">💜</span>
              <span class="text-sm font-medium text-eros">Patreon</span>
              <span class="text-xs text-muted mt-1">Exclusive content</span>
            </a>
            
            <a href="https://x.com/EPWCAuthor" 
               target="_blank" 
               rel="noopener noreferrer" 
               class="flex flex-col items-center p-4 rounded-lg border border-border 
                      hover:bg-eros-light/10 hover:border-eros transition-all">
              <span class="text-2xl mb-2">𝕏</span>
              <span class="text-sm font-medium text-eros">Twitter</span>
              <span class="text-xs text-muted mt-1">Latest updates</span>
            </a>
          </div>
        </div>

        {/* Newsletter CTA */}
        <div class="card bg-gradient-to-r from-eros/10 to-eros-rose/20 text-center">
          <h2 class="text-2xl font-bold text-eros-dark mb-3">
            Want More Heat?
          </h2>
          <p class="text-text mb-6">
            Join the Inner Circle for exclusive bonus scenes, early releases, 
            and content too hot for regular publication.
          </p>
          <A href="/newsletter" class="btn-primary">
            Join the Inner Circle
          </A>
        </div>
      </div>
    </>
  );
}