import { createSignal, createResource, Show, For } from "solid-js";
import {
  scanFirebaseFolder,
  initializeAutoDiscovery,
  getBookCoverUrl,
  getActualFirebaseUrl,
  addBookCoverMapping,
  getAvailableBookCovers,
  BOOK_COVER_MAPPINGS,
  BOOK_COVER_TOKENS
} from "~/utils/firebase-images";
import AdminProtected from "~/components/AdminProtected";

function AdminBooksContent() {
  const [isScanning, setIsScanning] = createSignal(false);
  const [scanResults, setScanResults] = createSignal<any>(null);
  const [discoveryResults, setDiscoveryResults] = createSignal<any>(null);

  // Load current mappings
  const [currentMappings] = createResource(() => getAvailableBookCovers());

  const handleScanFolder = async () => {
    setIsScanning(true);
    try {
      const results = await scanFirebaseFolder();
      setScanResults(results);
    } catch (error) {
      console.error('Scan failed:', error);
    } finally {
      setIsScanning(false);
    }
  };

  const handleAutoDiscovery = async () => {
    setIsScanning(true);
    try {
      const results = await initializeAutoDiscovery();
      setDiscoveryResults(results);
    } catch (error) {
      console.error('Auto-discovery failed:', error);
    } finally {
      setIsScanning(false);
    }
  };

  const testImageUrl = async (bookId: string) => {
    try {
      const url = getBookCoverUrl(bookId);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Failed to get image URL:', error);
    }
  };

  return (
    <div class="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div class="text-center space-y-4">
        <h1 class="text-4xl font-bold text-eros-dark">
          📚 Book Cover Admin
        </h1>
        <p class="text-xl text-muted">
          Manage and auto-discover book cover images from Firebase Storage
        </p>
      </div>

      {/* Action Buttons */}
      <div class="card">
        <h2 class="text-2xl font-bold text-eros-dark mb-4">Quick Actions</h2>
        <div class="flex flex-wrap gap-4">
          <button
            onClick={handleScanFolder}
            disabled={isScanning()}
            class="btn-primary disabled:opacity-50"
          >
            {isScanning() ? '🔍 Scanning...' : '🔍 Scan Firebase Folder'}
          </button>
          
          <button
            onClick={handleAutoDiscovery}
            disabled={isScanning()}
            class="btn-outline disabled:opacity-50"
          >
            {isScanning() ? '🤖 Discovering...' : '🤖 Auto-Discovery'}
          </button>
          
          <button
            onClick={() => window.open('https://console.firebase.google.com/project/endless-fire-467204-n2/storage', '_blank')}
            class="btn-outline"
          >
            🔗 Open Firebase Console
          </button>
        </div>
      </div>

      {/* Current Mappings */}
      <div class="card">
        <h2 class="text-2xl font-bold text-eros-dark mb-4">Current Book Mappings</h2>
        <Show when={currentMappings()} fallback={<div>Loading mappings...</div>}>
          <div class="space-y-4">
            <For each={Object.entries(currentMappings() || {})}>
              {([bookId, fileName]) => (
                <div class="flex items-center justify-between p-4 bg-surface rounded-lg border">
                  <div class="flex-1">
                    <div class="font-semibold text-eros-dark">{bookId}</div>
                    <div class="text-sm text-muted">{fileName}</div>
                    <div class="text-xs text-muted">
                      Token: {BOOK_COVER_TOKENS[bookId] ? '✅ Available' : '❌ Missing'}
                    </div>
                  </div>
                  <div class="flex gap-2">
                    <button
                      onClick={() => testImageUrl(bookId)}
                      class="btn-sm btn-outline"
                    >
                      🖼️ View Image
                    </button>
                  </div>
                </div>
              )}
            </For>
          </div>
        </Show>
      </div>

      {/* Scan Results */}
      <Show when={scanResults()}>
        <div class="card">
          <h2 class="text-2xl font-bold text-eros-dark mb-4">📋 Scan Results</h2>
          <div class="space-y-4">
            <div class="text-sm text-muted">
              Found {scanResults()?.files?.length || 0} book cover files
            </div>
            
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <h3 class="font-semibold text-eros-dark mb-2">Discovered Files:</h3>
                <div class="space-y-1">
                  <For each={scanResults()?.files || []}>
                    {(file) => (
                      <div class="text-sm p-2 bg-surface rounded border">
                        {file}
                      </div>
                    )}
                  </For>
                </div>
              </div>
              
              <div>
                <h3 class="font-semibold text-eros-dark mb-2">Auto-Generated Mappings:</h3>
                <div class="space-y-1">
                  <For each={Object.entries(scanResults()?.mappings || {})}>
                    {([bookId, fileName]) => (
                      <div class="text-sm p-2 bg-surface rounded border">
                        <div class="font-medium">{bookId}</div>
                        <div class="text-muted">→ {fileName}</div>
                      </div>
                    )}
                  </For>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Show>

      {/* Auto-Discovery Results */}
      <Show when={discoveryResults()}>
        <div class="card">
          <h2 class="text-2xl font-bold text-eros-dark mb-4">🤖 Auto-Discovery Results</h2>
          <div class="space-y-4">
            <div class="text-sm text-muted">
              Discovered {discoveryResults()?.discovered || 0} new book covers
            </div>
            
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <h3 class="font-semibold text-eros-dark mb-2">Final Mappings:</h3>
                <div class="space-y-1">
                  <For each={Object.entries(discoveryResults()?.mappings || {})}>
                    {([bookId, fileName]) => (
                      <div class="text-sm p-2 bg-surface rounded border">
                        <div class="font-medium">{bookId}</div>
                        <div class="text-muted">→ {fileName}</div>
                      </div>
                    )}
                  </For>
                </div>
              </div>
              
              <div>
                <h3 class="font-semibold text-eros-dark mb-2">Auto-Detected Tokens:</h3>
                <div class="space-y-1">
                  <For each={Object.entries(discoveryResults()?.tokens || {})}>
                    {([bookId, token]) => (
                      <div class="text-sm p-2 bg-surface rounded border">
                        <div class="font-medium">{bookId}</div>
                        <div class="text-muted font-mono text-xs">
                          {token.substring(0, 20)}...
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Show>

      {/* Instructions */}
      <div class="card bg-gradient-to-r from-eros-light/20 to-transparent">
        <h2 class="text-2xl font-bold text-eros-dark mb-4">📖 How to Use</h2>
        <div class="space-y-3 text-sm">
          <div>
            <strong>1. Upload Images:</strong> Go to Firebase Console and upload book cover images to the "Eros/" folder
          </div>
          <div>
            <strong>2. Auto-Discovery:</strong> Click "Auto-Discovery" to automatically find and map new images
          </div>
          <div>
            <strong>3. Filename Convention:</strong> Use descriptive names like "Book_Title_Cover.png" for best results
          </div>
          <div>
            <strong>4. Test Images:</strong> Use "View Image" buttons to verify images load correctly
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminBooks() {
  return (
    <AdminProtected>
      <AdminBooksContent />
    </AdminProtected>
  );
}
