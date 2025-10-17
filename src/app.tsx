// src/app.tsx
import "./app.css";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { MetaProvider } from "@solidjs/meta";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import AgeGate from "./components/AgeGate";

export default function App() {
  return (
    <MetaProvider>
      <AgeGate>
        <Router
          root={props => (
            <>
              <Nav />
              <main class="mx-auto max-w-5xl p-6 bg-bg dark:bg-slate-900 min-h-screen transition-colors">
                <Suspense>{props.children}</Suspense>
              </main>
              <Footer />
            </>
          )}
        >
          <FileRoutes />
        </Router>
      </AgeGate>
    </MetaProvider>
  );
}
