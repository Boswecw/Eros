import { A } from "@solidjs/router";
import AdminProtected from "~/components/AdminProtected";

function AdminDashboardContent() {
  return (
    <div class="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div class="text-center space-y-4">
        <h1 class="text-4xl font-bold text-eros-dark">
          ⚙️ Admin Dashboard
        </h1>
        <p class="text-xl text-muted">
          Manage your Ἔρως website and book collection
        </p>
      </div>

      {/* Quick Stats */}
      <div class="grid md:grid-cols-3 gap-6">
        <div class="card text-center">
          <div class="text-3xl mb-2">📚</div>
          <div class="text-2xl font-bold text-eros-dark">2</div>
          <div class="text-muted">Published Books</div>
        </div>
        
        <div class="card text-center">
          <div class="text-3xl mb-2">🖼️</div>
          <div class="text-2xl font-bold text-eros-dark">4</div>
          <div class="text-muted">Images in Storage</div>
        </div>
        
        <div class="card text-center">
          <div class="text-3xl mb-2">🤖</div>
          <div class="text-2xl font-bold text-eros-dark">Auto</div>
          <div class="text-muted">Discovery Enabled</div>
        </div>
      </div>

      {/* Admin Tools */}
      <div class="card">
        <h2 class="text-2xl font-bold text-eros-dark mb-6">Admin Tools</h2>
        <div class="grid md:grid-cols-2 gap-6">
          
          {/* Book Management */}
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-eros-dark flex items-center gap-2">
              📚 Book Management
            </h3>
            <div class="space-y-3">
              <A href="/admin/books" class="block p-4 bg-surface hover:bg-eros-light/10 rounded-lg border transition-colors">
                <div class="font-medium text-eros-dark">Book Cover Admin</div>
                <div class="text-sm text-muted">Manage book covers and auto-discovery</div>
              </A>
              
              <A href="/test-auto" class="block p-4 bg-surface hover:bg-eros-light/10 rounded-lg border transition-colors">
                <div class="font-medium text-eros-dark">Test Auto-Discovery</div>
                <div class="text-sm text-muted">Test the automatic book cover detection</div>
              </A>
            </div>
          </div>

          {/* External Tools */}
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-eros-dark flex items-center gap-2">
              🔗 External Tools
            </h3>
            <div class="space-y-3">
              <a 
                href="https://console.firebase.google.com/project/endless-fire-467204-n2/storage" 
                target="_blank" 
                rel="noopener noreferrer"
                class="block p-4 bg-surface hover:bg-eros-light/10 rounded-lg border transition-colors"
              >
                <div class="font-medium text-eros-dark">Firebase Storage</div>
                <div class="text-sm text-muted">Upload and manage book cover images</div>
              </a>
              
              <a 
                href="https://console.firebase.google.com/project/endless-fire-467204-n2" 
                target="_blank" 
                rel="noopener noreferrer"
                class="block p-4 bg-surface hover:bg-eros-light/10 rounded-lg border transition-colors"
              >
                <div class="font-medium text-eros-dark">Firebase Console</div>
                <div class="text-sm text-muted">Full Firebase project management</div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Security Info */}
      <div class="card bg-gradient-to-r from-green-50 to-transparent border-green-200">
        <h2 class="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
          🔒 Security Status
        </h2>
        <div class="space-y-3 text-sm">
          <div class="flex items-center gap-2 text-green-700">
            <span>✅</span>
            <span>Password authentication with SHA-256 salted hashing</span>
          </div>
          <div class="flex items-center gap-2 text-green-700">
            <span>✅</span>
            <span>Session management with 24-hour expiration</span>
          </div>
          <div class="flex items-center gap-2 text-green-700">
            <span>✅</span>
            <span>Rate limiting: 5 attempts per 15 minutes</span>
          </div>
          <div class="flex items-center gap-2 text-green-700">
            <span>✅</span>
            <span>Secure client-side session storage</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div class="card">
        <h2 class="text-2xl font-bold text-eros-dark mb-4">Quick Actions</h2>
        <div class="flex flex-wrap gap-4">
          <A href="/books" class="btn-primary">
            📖 View Books Page
          </A>
          
          <A href="/" class="btn-outline">
            🏠 Go to Homepage
          </A>
          
          <button
            onClick={() => window.location.reload()}
            class="btn-outline"
          >
            🔄 Refresh Dashboard
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div class="card bg-gradient-to-r from-eros-light/20 to-transparent">
        <h2 class="text-2xl font-bold text-eros-dark mb-4">📖 Admin Guide</h2>
        <div class="space-y-3 text-sm">
          <div>
            <strong>Adding New Books:</strong> Upload cover images to Firebase Storage, then use Book Cover Admin to auto-discover them
          </div>
          <div>
            <strong>Security:</strong> Your session will expire in 24 hours. The system uses secure password hashing and rate limiting
          </div>
          <div>
            <strong>Auto-Discovery:</strong> The system automatically finds new book covers based on filename patterns
          </div>
          <div>
            <strong>Troubleshooting:</strong> Use the Test Auto-Discovery tool to verify the system is working correctly
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <AdminProtected>
      <AdminDashboardContent />
    </AdminProtected>
  );
}
