# SitePulse

Paste a website link. Get an instant, honest report on its SEO, performance, and accessibility, Plus a side-by-side comparison mode to see how two sites stack up.

Built as my frontend capstone project for my internship at FlyRank.ai.

**Live demo:** https://seo-app-phi-six.vercel.app/

---

## What it does

- **Instant site check** — paste any URL and get 4 scores (Performance, SEO, Accessibility, Best Practices), pulled live from Google's PageSpeed Insights API.
- **Plain-English issue list** — instead of raw technical audit data, you get a numbered, readable list of what's actually wrong and why it matters.
- **Compare two sites** — run two websites side by side, see which one is ahead on each metric, and compare real-world Core Web Vitals (LCP, INP, CLS).
- **Mobile vs Desktop toggle** — check how a site performs differently across devices.
- **Share your results** — copy a clean summary of any report to share elsewhere.
- **Blog** — write-ups on SEO and performance, built from real data pulled using the tool itself.

## Tech stack

- **React** (Vite) — no separate backend; the app calls Google's PageSpeed Insights API directly.
- **Tailwind CSS v4** — for styling, using a small custom design system 
- **React Router** — for the Check / Compare / Blog pages.
- **react-markdown** — renders blog posts from clean Markdown content.
- **lucide-react** — icons.

## Why no backend?

The PageSpeed Insights API is free, public, and CORS-friendly, so the whole app runs as a static frontend — no server to host or pay for. Keeps the project genuinely "frontend," which was the point of the capstone.

## Running it locally

```bash
git clone <your-repo-url>
cd sitepulse
npm install
```

Create a `.env` file in the root with your own free PageSpeed Insights API key:
```
VITE_PAGESPEED_API_KEY=your_key_here
```

Then:
```bash
npm run dev
```

## Project structure

```
src/
├── components/   # UrlInputForm, ScoreRing, ReportCard, IssueList, ShareButton, Nav...
├── hooks/         # usePageSpeed.js — handles the API call, loading, retry, and errors
├── lib/           # parseReport.js (raw API → clean data), posts.js (blog content)
├── pages/         # Home, CompareSites, Blog, BlogPost
└── styles/        # Tailwind theme tokens
```

## Design philosophy

Built to feel like a diagnostic report, not a marketing landing page — calm colors, mono type for data/numbers, minimal animation. 
## What I'd add next

- Save-and-compare history (no login, just local storage)
- PDF export of a report
- More blog posts, generated from real data pulled by the tool on real sites


