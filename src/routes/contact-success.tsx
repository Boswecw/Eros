import { A } from "@solidjs/router";

export default function ContactSuccess() {
  return (
    <div class="max-w-md mx-auto space-y-6">
      <div class="card text-center space-y-6">
        <div class="text-6xl">📧</div>
        
        <div class="space-y-3">
          <h1 class="text-2xl font-bold text-eros-dark dark:text-eros-300">
            Message Sent!
          </h1>
          <p class="text-muted dark:text-slate-400 leading-relaxed">
            Thank you for reaching out. Your message has been received and I'll get back to you as soon as possible.
          </p>
        </div>

        <div class="space-y-4">
          <div class="bg-eros-rose dark:bg-slate-800 rounded-lg p-4">
            <h3 class="font-semibold text-eros-dark dark:text-eros-300 mb-2">What happens next:</h3>
            <ul class="text-sm text-muted dark:text-slate-400 space-y-1 text-left">
              <li>• I'll review your message within 24-48 hours</li>
              <li>• You'll receive a personal response to your email</li>
              <li>• For urgent matters, try the direct email link below</li>
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
          Didn't receive a confirmation? Check your spam folder or contact directly.
        </p>
      </div>

      {/* Direct Contact */}
      <div class="card text-center">
        <p class="text-sm text-muted dark:text-slate-400 mb-3">Need immediate assistance?</p>
        <div class="flex justify-center gap-4 text-sm">
          <a href="mailto:epwc@epwcauthor.com" class="link">Direct Email</a>
          <a href="https://www.patreon.com/c/authoreros" target="_blank" rel="noopener noreferrer" class="link">Patreon</a>
          <a href="https://x.com/EPWCAuthor" target="_blank" rel="noopener noreferrer" class="link">Twitter</a>
        </div>
      </div>
    </div>
  );
}
