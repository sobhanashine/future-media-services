"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <main className="state-page">
          <span>FMS</span>
          <h1>Something interrupted the experience.</h1>
          <p>Try this page again. If the problem continues, use the official Instagram profile to get in touch.</p>
          <button type="button" className="button" onClick={() => reset()}>Try again</button>
        </main>
      </body>
    </html>
  );
}
