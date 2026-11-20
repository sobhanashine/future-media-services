"use client";

import { yekanBakh } from "./fonts/studio";
import s from "@/components/layout/SiteState.module.css";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en" className={yekanBakh.variable}>
      <body className={s.document}>
        <title>Future Media Services</title>
        <main className={s.state}>
          <span className={s.code}>FMS</span>
          <h1>Something interrupted the experience.</h1>
          <p>Try this page again. If the problem continues, use the official Instagram profile to get in touch.</p>
          <div className={s.actions}><button type="button" onClick={() => reset()}>Try again</button>
            <a href="https://www.instagram.com/future.m.services/">Instagram</a>
          </div>
        </main>
      </body>
    </html>
  );
}
