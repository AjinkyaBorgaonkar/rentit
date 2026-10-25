# RENTit

**Live site: https://ajinkyaborgaonkar.github.io/rentit/**

A rental network for everyday equipment inside one neighbourhood. This repository holds the marketing site — three static pages, no build step, no dependencies.

## Pages

| File | What it does |
|---|---|
| `index.html` | What RENTit is, what it costs, the record |
| `how-it-works.html` | The handover protocol, grading scale, cover matrix, claim clock |
| `for-owners.html` | The owner maths, with a working earnings calculator |

## Running it

Double-click `index.html`. It opens in a browser with no server, no install and no internet connection — the fonts are in `assets/fonts`.

Keep the `assets` folder next to the three HTML files. The pages need it for styling, fonts and the calculator.

## Notes

- The calculator is halfway down `for-owners.html`, or reachable from the button in the hero. It runs entirely client-side: day rate, days per month, upkeep, delivery.
- Every figure on the site comes from one business model document. The numbers are not decoration.
- The site is a storefront for a pilot that has not launched. Nothing is listed for rent yet, and the pages say so.

## Stack

Plain HTML, CSS and a single small JS file. No framework, no bundler, no analytics, no third-party requests. Fonts are self-hosted.

Design direction: warm paper ground, ink panels, one signal orange per screen, blueprint accents.

## Case study

The reasoning behind the site — the gap, the model, the pilot plan — is in [CASE-STUDY.md](CASE-STUDY.md).

---

Ketan · 2026
