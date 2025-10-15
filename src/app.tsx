// src/app.tsx
import "./app.css";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router
      root={props => (
        <>
          <Nav />
          <main class="mx-auto max-w-5xl p-6">
            <Suspense>{props.children}</Suspense>
          </main>
          <Footer />
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
