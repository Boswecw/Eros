import { createSignal, createEffect, Show, JSX } from "solid-js";
import { useAdminAuth } from "~/utils/auth";
import AdminLogin from "./AdminLogin";

interface AdminProtectedProps {
  children: JSX.Element;
}

export default function AdminProtected(props: AdminProtectedProps) {
  const [isAuthenticated, setIsAuthenticated] = createSignal(false);
  const [isLoading, setIsLoading] = createSignal(true);
  const [sessionTime, setSessionTime] = createSignal(0);
  
  const auth = useAdminAuth();

  // Check authentication status on mount and periodically
  createEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(auth.isAuthenticated());
      setSessionTime(auth.getRemainingTime());
      setIsLoading(false);
    };

    // Initial check
    checkAuth();

    // Check every 30 seconds
    const interval = setInterval(checkAuth, 30000);

    return () => clearInterval(interval);
  });

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setSessionTime(auth.getRemainingTime());
  };

  const handleLogout = () => {
    auth.logout();
    setIsAuthenticated(false);
    setSessionTime(0);
  };

  const formatTime = (ms: number): string => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  return (
    <Show when={!isLoading()} fallback={
      <div class="min-h-screen flex items-center justify-center">
        <div class="text-center">
          <div class="text-4xl mb-4">⏳</div>
          <div class="text-xl text-muted">Loading...</div>
        </div>
      </div>
    }>
      <Show when={isAuthenticated()} fallback={
        <AdminLogin onSuccess={handleLoginSuccess} />
      }>
        {/* Admin Header */}
        <div class="sticky top-0 z-50 bg-eros text-white shadow-lg">
          <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="text-xl">⚙️</span>
              <div>
                <div class="font-semibold">Admin Panel</div>
                <div class="text-xs opacity-80">Authenticated Access</div>
              </div>
            </div>
            
            <div class="flex items-center gap-4 text-sm">
              <div class="hidden sm:block">
                <div class="opacity-80">Session expires in:</div>
                <div class="font-mono">{formatTime(sessionTime())}</div>
              </div>
              
              <button
                onClick={handleLogout}
                class="px-3 py-1 bg-white/20 hover:bg-white/30 rounded transition-colors"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>

        {/* Admin Content */}
        <div class="min-h-screen bg-gray-50">
          <div class="py-6">
            {props.children}
          </div>
        </div>

        {/* Session Warning */}
        <Show when={sessionTime() < 300000}> {/* 5 minutes */}
          <div class="fixed bottom-4 right-4 p-4 bg-yellow-100 border border-yellow-300 rounded-lg shadow-lg max-w-sm">
            <div class="flex items-center gap-2 text-yellow-800">
              <span>⚠️</span>
              <span class="font-semibold">Session Expiring Soon</span>
            </div>
            <p class="text-yellow-700 text-sm mt-1">
              Your session will expire in {formatTime(sessionTime())}
            </p>
            <button
              onClick={() => window.location.reload()}
              class="mt-2 text-xs bg-yellow-200 hover:bg-yellow-300 px-2 py-1 rounded transition-colors"
            >
              Refresh Session
            </button>
          </div>
        </Show>
      </Show>
    </Show>
  );
}
