import { createSignal, Show } from "solid-js";
import { useAdminAuth } from "~/utils/auth";

interface AdminLoginProps {
  onSuccess?: () => void;
}

export default function AdminLogin(props: AdminLoginProps) {
  const [password, setPassword] = createSignal("");
  const [isLoading, setIsLoading] = createSignal(false);
  const [error, setError] = createSignal("");
  const [showPassword, setShowPassword] = createSignal(false);
  
  const auth = useAdminAuth();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const success = await auth.login(password());
      
      if (success) {
        setPassword("");
        props.onSuccess?.();
      } else {
        setError("Invalid password. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-eros-light/20 to-eros/10">
      <div class="card max-w-md w-full mx-4">
        <div class="text-center mb-6">
          <div class="text-4xl mb-2">🔐</div>
          <h1 class="text-2xl font-bold text-eros-dark">Admin Access</h1>
          <p class="text-muted">Enter your password to access admin features</p>
        </div>

        <Show when={auth.isLocked()}>
          <div class="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
            <div class="flex items-center gap-2 text-red-800">
              <span>🚫</span>
              <span class="font-semibold">Account Locked</span>
            </div>
            <p class="text-red-700 text-sm mt-1">
              Too many failed attempts. Try again in {formatTime(auth.getLockoutTime())}
            </p>
          </div>
        </Show>

        <form onSubmit={handleSubmit} class="space-y-4">
          <div>
            <label for="password" class="block text-sm font-medium text-eros-dark mb-2">
              Password
            </label>
            <div class="relative">
              <input
                id="password"
                type={showPassword() ? "text" : "password"}
                value={password()}
                onInput={(e) => setPassword(e.currentTarget.value)}
                disabled={isLoading() || auth.isLocked()}
                class="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-eros focus:border-eros disabled:opacity-50 disabled:cursor-not-allowed pr-12"
                placeholder="Enter admin password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword())}
                disabled={isLoading() || auth.isLocked()}
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted hover:text-eros-dark disabled:opacity-50"
              >
                {showPassword() ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <Show when={error()}>
            <div class="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p class="text-red-700 text-sm">{error()}</p>
            </div>
          </Show>

          <button
            type="submit"
            disabled={isLoading() || !password() || auth.isLocked()}
            class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading() ? (
              <span class="flex items-center justify-center gap-2">
                <span class="animate-spin">⏳</span>
                Verifying...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div class="mt-6 pt-4 border-t border-border">
          <div class="text-xs text-muted space-y-1">
            <div>🔒 Secure authentication with salted password hashing</div>
            <div>⏱️ Session expires in 24 hours</div>
            <div>🛡️ Rate limiting: 5 attempts per 15 minutes</div>
          </div>
        </div>

        <div class="mt-4 p-3 bg-eros-light/10 rounded-lg">
          <div class="text-xs text-eros-dark">
            <div class="font-semibold mb-1">Default Password:</div>
            <div class="font-mono bg-white px-2 py-1 rounded border">
              ErosAdmin2025!
            </div>
            <div class="text-muted mt-1">
              Change this in <code>src/utils/auth.ts</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
