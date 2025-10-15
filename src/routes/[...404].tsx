import { HttpStatusCode } from "@solidjs/start";
import { A } from "@solidjs/router";

export default function NotFound() {
  return (
    <>
      <HttpStatusCode code={404} />
      <div class="card max-w-md mx-auto text-center">
        <h1 class="text-3xl font-bold text-eros-dark mb-4">Page Not Found</h1>
        <p class="text-muted mb-6">
          The page you're looking for doesn't exist.
        </p>
        <A href="/" class="btn-primary">
          ← Go back home
        </A>
      </div>
    </>
  );
}
