import { A } from "@solidjs/router";

export default function NewsletterSuccess() {
  return (
    <div class="max-w-md mx-auto space-y-6">
      <div class="card text-center space-y-6">
        <div class="text-6xl">✨</div>
        
        <div class="space-y-3">
          <h1 class="text-2xl font-bold text-eros-dark dark:text-eros-300">
            Welcome to the Ἔρως Newsletter!
          </h1>
          <p class="text-muted dark:text-slate-400 leading-relaxed">
            Thank you for subscribing. You'll be the first to know about new releases, 
            exclusive content, and behind-the-scenes updates from the Eros Collection.
          </p>
        </div>

        <div class="space-y-4">
          <div class="bg-eros-rose dark:bg-slate-800 rounded-lg p-4">
            <h3 class="font-semibold text-eros-dark dark:text-eros-300 mb-2">What to expect:</h3>
            <ul class="text-sm text-muted dark:text-slate-400 space-y-1 text-left">
              <li>• Early access to new book announcements</li>
              <li>• Exclusive excerpts and sneak peeks</li>
              <li>• Special promotions and discounts</li>
              <li>• Behind-the-scenes writing updates</li>
            </ul>
          </div>

          <div class="flex flex-col sm:flex-row gap-3">
            <A href="/books" class="btn-primary flex-1">
              Browse Books
            </A>
            <A href="/" class="btn-outline flex-1">
              Back to Home
            </A>
          </div>
        </div>

        <p class="text-xs text-muted dark:text-slate-400">
          Check your email for a confirmation message. 
          Don't forget to check your spam folder!
        </p>
      </div>

      {/* Social Links */}
      <div class="card text-center">
        <p class="text-sm text-muted dark:text-slate-400 mb-3">Connect with Ἔρως:</p>
        <div class="flex justify-center gap-4 text-sm">
          <a href="mailto:epwc@epwcauthor.com" class="link">Email</a>
          <a href="https://www.patreon.com/c/authoreros" target="_blank" rel="noopener noreferrer" class="link">Patreon</a>
          <a href="https://x.com/EPWCAuthor" target="_blank" rel="noopener noreferrer" class="link">Twitter</a>
        </div>
      </div>
    </div>
  );
}
