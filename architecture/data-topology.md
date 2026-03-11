# Data Topology: The Five Tiers of Financial Awareness

## The Core Insight

The manifesto's vision — an autonomous financial nervous system — depends entirely on one thing: **can the system actually see your financial life?**

Not theoretically. Not "if all APIs existed." Right now, today, what can an AI system actually access, from where, through what mechanism, with what reliability?

This document answers that question with brutal specificity. No hand-waving. Every platform named. Every access method documented. Every gap acknowledged.

## The Tier Model

Data sources are organized by **how the system gets the data**, from most automated to most manual:

```
┌─────────────────────────────────────────────┐
│          TIER 1: AA NATIVE                   │
│     Standardized. Consent-based. Live.       │
│     The system reads directly via protocol.  │
├─────────────────────────────────────────────┤
│          TIER 2: AA EMERGING                 │
│     Standard exists. FIP adoption underway.  │
│     Available for some users, not all.       │
├─────────────────────────────────────────────┤
│          TIER 3: PLATFORM APIs               │
│     Direct API from the platform.            │
│     Requires per-platform integration.       │
├─────────────────────────────────────────────┤
│          TIER 4: TRANSACTION INFERENCE       │
│     No direct API. But detectable through    │
│     UPI/bank transaction descriptions.       │
│     This is where 80% of the magic lives.   │
├─────────────────────────────────────────────┤
│          TIER 5: USER-VOLUNTEERED            │
│     No automated path. Comes from            │
│     conversation, onboarding, documents.     │
└─────────────────────────────────────────────┘
```

## Tier 1: AA Native

**Access method**: Account Aggregator protocol via licensed FIU (Financial Information User). Single consent flow. Standardized FI data schema. Encrypted end-to-end.

**Reliability**: High. Regulated. Data comes directly from the institution.

**Refresh frequency**: Recurring consent allows daily/weekly pulls. Most FIPs serve data within 1-24 hour lag.

| Data Source | What You Get | Key Institutions Live | Coverage |
|---|---|---|---|
| **Savings Accounts** | Balance, full transaction history, interest earned | SBI, HDFC, ICICI, Axis, Kotak, PNB, BOB, Canara, Union, IndusInd, Yes, IDFC | ~85% of urban banking |
| **Current Accounts** | Balance, transaction history | Same as above | Same |
| **Fixed Deposits** | FD details, maturity dates, interest rates, auto-renewal status | Same as above | Same |
| **Recurring Deposits** | RD installment history, maturity projections | Same as above | Same |
| **Mutual Funds** | Complete folio-level holdings across ALL AMCs, NAV, purchase dates, SIP details, capital gains | CAMS + KFintech (together cover 100% of AMCs) | ~100% of MF holdings |
| **NPS (Pension)** | Balance, contribution history, fund allocation, projected corpus | NSDL (CRA), KFintech | ~100% of NPS accounts |
| **EPF** | Balance, employer + employee contributions, interest accrued | EPFO (via AA — emerging) | Limited — EPFO integration is early |
| **PPF** | Balance, contribution history, maturity | SBI, post offices (via AA — emerging) | Limited |

**What this gives Ghost Mode**: Complete bank account visibility, full mutual fund portfolio across all platforms (even if user has holdings across Groww, Zerodha, CAMS direct), FD/RD maturity calendar, pension trajectory. This alone enables: net worth computation, cash flow analysis, investment rebalancing decisions, idle cash detection, SIP monitoring.

## Tier 2: AA Emerging

**Access method**: Same AA protocol. FI type definitions exist in the standard. But FIP (institution) adoption is still rolling out.

**Reliability**: Medium. Standards are defined but not all institutions have built the pipes yet.

| Data Source | What You Get | Status | Timeline |
|---|---|---|---|
| **Insurance Policies** | Policy details, coverage amounts, premium schedule, riders, claim history | LIC + private insurers are onboarding. IRDAI pushing adoption via Bima Sugam. | 6-18 months for broad coverage |
| **Securities (Demat)** | Stock holdings, bond holdings, ETFs, transaction history | CDSL and NSDL as FIPs — live in pilot | 6-12 months |
| **Tax (26AS / AIS)** | Income reported by employers, TDS details, advance tax paid, refunds, high-value transactions | Income Tax department as FIP — pilot stage | 12-18 months |
| **GST (for freelancers/business owners)** | Invoice data, GST compliance status, turnover | GST Network as FIP — early | 12-24 months |
| **Credit Cards** | Statements, outstanding, limit, transactions | Banks as FIPs for credit card data — emerging | 6-12 months |

**What this unlocks when live**: Insurance gap analysis (the system can SEE your actual policies, not guess), demat portfolio (complete equity picture), real-time tax liability computation from actual 26AS data, credit card spend analysis.

**The workaround TODAY**: Until these FIPs are live on AA, the system uses Tier 4 (transaction inference) to detect insurance premium debits, stock purchases, credit card payments from bank transaction data. Less precise, but functional.

## Tier 3: Platform APIs

**Access method**: Direct API integration with specific platforms. Requires OAuth/API key per user per platform. Not standardized — each platform has its own schema.

**Reliability**: Varies wildly. Some APIs are production-grade, others break regularly.

| Platform | API | What You Get | Quality | Notes |
|---|---|---|---|---|
| **Zerodha** | Kite Connect API | Portfolio, positions, orders, trades, margins, instruments | Excellent — best broker API in India | Requires Kite Connect subscription (₹2,000/month for developer access) |
| **Groww** | No public API | Nothing directly | N/A | Groww has no developer API. All data via AA or transaction inference |
| **INDMoney** | No public API | Nothing directly | N/A | Same — no developer API |
| **CAMS/KFintech** | MF Central (investor login) | MF holdings, CAS statement | Medium — not a real-time API, more batch | Available via AA (Tier 1) which is better |
| **BSE Star MF** | Order API | MF purchase/redemption/switch execution | Good — production-grade execution | This is the execution pipe, not data. Used by Ghost Mode to ACT, not to SEE |
| **MF Central** | Transaction API | MF execution across all AMCs | Good | Alternative execution pipe to BSE Star |
| **Google Fit** | REST API | Steps, heart rate, sleep, weight, activity | Good | Requires user OAuth consent. Free |
| **Apple Health** | HealthKit (iOS only) | Steps, heart rate, sleep, HRV, VO2 max | Excellent | On-device only. Requires iOS app |
| **Google Calendar** | Calendar API | Events, meetings, travel, appointments | Excellent | Free with OAuth. Rich structured data |
| **CIBIL** | Bureau API | Credit score, factors, report | Good but expensive | ₹30-50 per pull. Used sparingly |
| **Experian/Equifax** | Bureau API | Credit score, report | Good | Alternative to CIBIL |
| **WhatsApp** | Business API (WABA) | Send/receive messages | Good | For the conversational interface. Not a data source per se |

**The key insight about Tier 3**: You don't need most of these. AA (Tier 1) already gives you mutual fund and bank data better than any platform API. The Tier 3 sources that actually matter are: execution APIs (BSE Star, MF Central) for Ghost Mode to act, health APIs (Google Fit, Apple Health) for Life Mesh, and calendar for event detection. Everything else is either redundant to AA or unavailable.

## Tier 4: Transaction Inference

**This is where 80% of the cross-domain intelligence comes from.**

**Access method**: Parse UPI and bank transaction descriptions from AA Tier 1 data. No additional consent or integration needed. If you have bank access, you have this.

**How it works**: Every UPI transaction has a description like `UPI/DR/407283/SWIGGY/ORDER938271` or `UPI/CR/SALARY/TECHCORP`. A categorization model maps these to merchants, categories, and behavioral signals.

| Inference Category | Transaction Pattern | What You Learn | Accuracy |
|---|---|---|---|
| **Food Delivery** | `SWIGGY`, `ZOMATO`, `DOMINOS`, `EATSURE` in UPI description | Frequency, average order value, time-of-day patterns (2 AM stress ordering), monthly food delivery spend | 95%+ for major platforms |
| **Ride Hailing** | `UBER`, `OLA`, `RAPIDO` in description + amount range | Commute frequency, average trip cost, commute patterns, daily/weekly regularity | 95%+ |
| **E-commerce** | `AMAZON`, `FLIPKART`, `MYNTRA`, `AJIO`, `MEESHO` | Shopping frequency, average purchase, category inference from amount patterns | 90%+ for platform detection, 60% for category |
| **Subscriptions** | Recurring same-amount debits to `NETFLIX`, `SPOTIFY`, `HOTSTAR`, `YOUTUBE`, `APPLE`, `GOOGLE` | Active subscriptions, monthly subscription burn, unused detection (subscription exists but content platform login frequency can't be measured — flag based on amount alone) | 95%+ for detection |
| **Rent** | Large monthly recurring debit, same recipient, 1st-5th of month | Monthly rent, landlord, payment regularity | 85%+ (needs validation — some large recurring debits aren't rent) |
| **EMI** | Fixed recurring debits to `HDFC`, `BAJAJ`, `ICICI`, `TATA CAPITAL`, `AXISBANK` loan accounts | Loan existence, EMI amount, remaining tenure (inferred from pattern duration) | 90%+ |
| **Insurance Premiums** | Annual/quarterly debits to `LIC`, `MAXLIFE`, `HDFCLIFE`, `ICICIPRU`, `STAR HEALTH`, `CARE HEALTH` | Policy existence, premium amount, renewal dates | 85%+ |
| **Salary** | Largest monthly credit, same source, consistent date | Employer, salary amount, pay date, increments (year-over-year comparison) | 95%+ |
| **Freelance/Side Income** | Irregular credits from varied sources, amount variation | Additional income streams, volatility, seasonality | 70% (harder to distinguish from reimbursements) |
| **Investments** | Debits to `GROWW`, `ZERODHA`, `ICICIDIRECT`, `KUVERA`, `COIN` | Investment platform usage, approximate investment amounts, frequency | 85%+ for platform detection |
| **Medical** | Debits to hospitals, pharmacies, diagnostic labs (`APOLLO`, `FORTIS`, `MAX`, `1MG`, `PHARMEASY`) | Health events, medical spend, pharmacy patterns | 80%+ |
| **Education** | Debits to `COURSERA`, `UPGRAD`, `UNACADEMY`, `BYJUS`, school/college names | Education spend, upskilling activity | 80%+ |
| **Utilities** | `ELECTRICITY`, `GAS`, `BROADBAND`, `JIO`, `AIRTEL`, `VI` | Utility costs, potential optimization (plan comparison) | 90%+ |
| **Groceries** | `BIGBASKET`, `BLINKIT`, `ZEPTO`, `DMART`, `JIOMART` | Grocery spend, delivery vs in-store patterns | 90%+ |
| **Dining Out** | Restaurant names, `DINEOUT`, `EAZYDINER`, `RESERVE` | Dining frequency and spend | 75%+ (restaurant names are less standardized) |

**Why this tier is the real moat**: Every wealthtech app asks users to manually categorize expenses or uses basic rules. Transaction inference with modern ML categorization gives you spending intelligence *without any user effort*. The user connects AA once, and the system immediately knows their rent, subscriptions, food delivery habits, commute costs, medical spending — all from reading what's already in their bank statements.

**The Swiggy → Insurance connection isn't magic. It's this**: Parse UPI transactions → detect Swiggy frequency increasing → correlate with transaction timestamps (late night) → flag as stress-eating pattern → compute health risk implication → surface to insurance coverage model. Every step uses data already available in Tier 1.

## Tier 5: User-Volunteered

**Access method**: Conversation, onboarding questionnaire, document upload, manual input.

**Reliability**: High (it's self-reported) but incomplete and potentially biased.

| Data Type | How Collected | What You Learn | Why No Automated Path |
|---|---|---|---|
| **Life Goals** | Onboarding questions: "What matters most financially?" | Goal prioritization, time horizons, aspiration mapping | Goals are subjective — only the user knows them |
| **Career Trajectory** | "What do you do? Where do you see yourself in 3 years?" | Industry risk, income trajectory, career stage | LinkedIn API is too limited. Career intent requires conversation |
| **Family Structure** | "Who depends on you?" | Dependents, protection needs, education planning triggers | Dependent information isn't in any financial database |
| **Risk Tolerance (stated)** | "How would you feel if your portfolio dropped 30%?" | Starting point for risk modeling (refined over time by revealed behavior in Tier 4) | Subjective preference. But the system overrides stated tolerance with REVEALED tolerance from actual decisions |
| **Property Details** | "Do you own a home? What's the approximate value?" | Real estate allocation, home loan potential, property tax implications | Property records aren't accessible via API in India |
| **Health Conditions** | "Any chronic conditions or family health history?" | Insurance needs, healthcare cost projection, emergency fund sizing | ABDM is years from being usable for this. Self-report is the only path today |
| **Salary Structure** | Upload salary slip (photo/PDF) | Component breakdown (basic, HRA, special allowance), HRA optimization potential, PF contribution accuracy | Salary credits show the NET number. Components require the slip |
| **Tax Documents** | Upload Form 16, previous ITR | Precise tax history, deduction utilization, regime comparison | Until AA gets 26AS/AIS data (Tier 2), manual upload is the fallback |

## The Coverage Map

When you combine all five tiers, here's what the system can see:

```
COMPLETE PICTURE (Tier 1-5 combined):

INCOME           ██████████████████████████████████████ 95%
  ├─ Salary:        Tier 1 (bank credit) + Tier 5 (slip upload)
  ├─ Freelance:     Tier 4 (transaction inference)
  └─ Investments:   Tier 1 (MF dividends, FD interest)

SPENDING         ██████████████████████████████████░░░░ 85%
  ├─ Rent:          Tier 4 (recurring large debit)
  ├─ Food:          Tier 4 (Swiggy/Zomato/grocery detection)
  ├─ Transport:     Tier 4 (Uber/Ola detection)
  ├─ Subscriptions: Tier 4 (recurring same-amount)
  ├─ Shopping:      Tier 4 (Amazon/Flipkart detection)
  ├─ EMIs:          Tier 4 (recurring bank debits)
  └─ Utilities:     Tier 4 (provider detection)

INVESTMENTS      ██████████████████████████████████████ 98%
  ├─ Mutual Funds:  Tier 1 (AA — CAMS/KFintech, 100% coverage)
  ├─ Stocks:        Tier 2 (AA — CDSL/NSDL, emerging)
  ├─ FD/RD:         Tier 1 (AA — bank data)
  └─ NPS/PPF/EPF:   Tier 1-2 (AA — partial)

PROTECTION       ██████████████████████░░░░░░░░░░░░░░░ 55%
  ├─ Health Ins:    Tier 2 (AA — emerging) + Tier 4 (premium detection)
  ├─ Life Ins:      Tier 2 (AA — emerging) + Tier 4 (premium detection)
  └─ General Ins:   Tier 4 (premium detection only)

TAX              ██████████████████████████░░░░░░░░░░░ 65%
  ├─ Income:        Tier 1 (salary credit) + Tier 5 (Form 16)
  ├─ Deductions:    Computed from Tier 1+4 data
  └─ 26AS/AIS:      Tier 2 (AA — pilot) + Tier 5 (manual upload)

HEALTH           ██████████████░░░░░░░░░░░░░░░░░░░░░░ 35%
  ├─ Wearables:     Tier 3 (Google Fit/Apple Health)
  ├─ Medical spend: Tier 4 (hospital/pharmacy transaction detection)
  └─ Conditions:    Tier 5 (self-reported)

LIFE CONTEXT     ████████████░░░░░░░░░░░░░░░░░░░░░░░░ 30%
  ├─ Career:        Tier 5 (conversation)
  ├─ Family:        Tier 5 (onboarding)
  ├─ Goals:         Tier 5 (conversation)
  └─ Calendar:      Tier 3 (Google Calendar API)
```

## The 80/20 Insight

**Tier 1 + Tier 4 alone gives you ~75% of what you need to deliver Ghost Mode, Money Wrap, and Council Mode.** You don't need a Swiggy partnership. You don't need a Zerodha API. You don't need health data. Bank account data via AA, intelligently parsed, covers income, spending, investments, EMIs, insurance premiums, subscriptions, and lifestyle patterns.

The other 25% (health, career, goals, family) comes from Tier 3 (wearables, calendar) and Tier 5 (conversation). These enrich the experience but aren't required for the core product to deliver value.

**Build order based on tiers:**
- **Month 0**: Tier 1 (AA bank + MF) + Tier 4 (transaction inference) → Money Wrap, Ghost Mode Level 1
- **Month 3**: Add Tier 5 (onboarding questions) → Council Mode, goal trajectory
- **Month 6**: Add Tier 3 (Google Fit, Calendar) → Life Mesh
- **Month 9+**: Tier 2 comes online (insurance, securities, tax via AA) → Full Ghost Mode

Each tier expands the organism's awareness. The system gets smarter over time without the user doing anything additional.

---

*Return to [Table of Contents](../README.md)*
