
export default function Footer() {
  return (
    <footer class="border-t border-border bg-surface/50 mt-12 dark:bg-slate-800/50 dark:border-slate-700">
      <div class="w-full">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6 py-6">
          {/* Copyright and Social Links - Left Side */}
          <div class="flex flex-col md:flex-row items-center gap-6 pl-6">
            <div class="text-xs text-muted dark:text-slate-400">
              © {new Date().getFullYear()} <span class="text-eros font-semibold dark:text-eros-300">Ἔρως</span>. All rights reserved.
            </div>

            {/* Social Links */}
            <div class="flex gap-4 text-xs">
              <a href="mailto:epwc@epwcauthor.com" class="link">Email</a>
              <a href="https://www.patreon.com/c/authoreros" target="_blank" rel="noopener noreferrer" class="link">
                Patreon
              </a>
              <a href="https://x.com/EPWCAuthor" target="_blank" rel="noopener noreferrer" class="link">
                Twitter
              </a>
            </div>
          </div>

          {/* Signature Icon - Far Right Edge */}
          <div class="pr-6">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/endless-fire-467204-n2.firebasestorage.app/o/Eros%2FEros_Signature_GoldFoil.png?alt=media&token=e2ab0b7a-6a84-494f-b744-0e08b190df39"
              alt="Ἔρως"
              class="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}