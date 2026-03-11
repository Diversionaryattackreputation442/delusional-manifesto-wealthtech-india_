# Living Organism Prototype

A working React prototype that visualizes money as a breathing, living system — not a dashboard.

---

## What This Is

The prototype brings the manifesto to life. Instead of charts and tables, it shows your financial life as an organism: breathing, pulsing, connected — reacting to your real-world context.

Five screens. Zero dashboards. No bar charts.

| Screen | What It Shows |
|--------|---------------|
| **Organism** | Your financial life as a living system — 7 domains, real-time health, life events |
| **Council** | AI agents debating your financial decisions (buy vs. rent, ELSS vs. NPS, etc.) |
| **Converse** | Natural language financial interface — talk to your money |
| **Wrap** | Your Money Wrap — Spotify Wrapped for your financial year |
| **Sources** | Concentric ring visualization of all five data tiers |

---

## How to Run

### Option 1: Claude.ai (Fastest)

1. Open [claude.ai](https://claude.ai)
2. Start a new conversation
3. Upload `organism-prototype.jsx`
4. Ask: *"Render this React component"*
5. Claude renders it in-browser instantly — no setup required

### Option 2: Local Dev with Vite

```bash
npm create vite@latest organism-demo -- --template react
cd organism-demo
npm install
# Replace src/App.jsx contents with organism-prototype.jsx
npm run dev
```

Open `http://localhost:5173`

### Option 3: Deploy to Vercel (60 seconds)

```bash
npm create vite@latest organism-demo -- --template react
cd organism-demo
# Replace src/App.jsx with organism-prototype.jsx contents
npx vercel
```

Vercel gives you a shareable URL instantly.

---

## Dependencies

The prototype uses only:
- **React** (hooks: useState, useEffect) — included in Vite template
- **SVG** for all icons — no icon library needed
- **Inline CSS** — no Tailwind, no styled-components

No additional `npm install` required beyond a standard React setup.

---

## What to Look For

- **The breathing animation** — the organism pulses. This is intentional. Money is alive.
- **The Sources tab** — concentric rings showing Tier 1 through Tier 5 data. This is the system's awareness map.
- **Council Mode** — watch AI agents disagree. The tension is the feature.
- **Converse** — type a financial question. See how different it feels from a form or a filter.
- **Money Wrap** — see what "Spotify Wrapped for your money" actually looks like as an interface.

---

## Known Limitations

This is a prototype. Data is illustrative. The organism responds to simulated values, not a live AA connection. The Converse interface shows response stubs, not real LLM output.

The point is the *interaction model*, not the data.

---

*Part of [The Delusional Manifesto](../README.md)*
