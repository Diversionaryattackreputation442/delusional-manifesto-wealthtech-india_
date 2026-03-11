# What's Possible Today: The Honest Feasibility Map

## The Question This Document Answers

The manifesto paints a vision. This document asks: **how much of it can you actually build right now, in 2026, with existing infrastructure and AI capabilities?**

Not in 3 years. Not when AA is "fully rolled out." Today. With what's live, what's accessible, and what AI can realistically do. And where the gaps are — what's genuinely hard, what's waiting on infrastructure, and what AI can bridge to make the user's life easier than the current process even before the full vision arrives.

---

## The Verdict, Upfront

About 60-65% of the manifesto's core value can be delivered today. Not perfectly. Not with the full autonomous elegance described. But enough to be dramatically better than anything that currently exists in Indian wealthtech.

The remaining 35-40% is blocked by infrastructure gaps (AA adoption, ABDM maturity, regulatory evolution) — but AI can bridge roughly half of those gaps with intelligent workarounds that still deliver 70-80% of the intended user value.

---

## Feature-by-Feature Reality Check

### ORGANISM SCREEN: Financial Life Visualization

**What's possible today**: Almost everything.

The core organism view — net worth, 7 domains, breathing visualization, health scores — requires only data that's available right now via Account Aggregator (bank accounts, mutual funds, FDs, NPS) plus transaction inference from UPI descriptions.

| Component | Status | How |
|---|---|---|
| Net worth computation | Buildable today | AA bank + MF data (Tier 1). CAMS + KFintech cover 100% of mutual fund AMCs. All major banks are live FIPs. |
| 7 domain mapping | Buildable today | Income (salary credit detection), Spending (UPI categorization), Growth (MF + FD data), Protection (premium detection from transactions), Tax (computed from known income + deductions), Home (EMI/rent detection), Aspirations (user-volunteered goals) |
| Cash runway calculation | Buildable today | Average monthly income minus average monthly spend, computed from 3-6 months of AA bank data |
| Protection score | Partially buildable | Can detect insurance premium payments from transactions (Tier 4). Cannot yet read actual policy details to assess adequacy — that requires AA insurance FIPs (Tier 2, 6-18 months out) |
| Tax efficiency score | Buildable today | Section 80C (EPF detected from salary, ELSS from MF data, LIC premiums from transactions), 80D (health insurance premiums), HRA (rent detection + salary slip upload). Won't catch everything, but covers the big items |

**AI bridge for what's missing**: LLMs can analyze uploaded salary slips and Form 16s to extract tax component breakdowns that aren't available via API. A user uploads a photo of their salary slip, GPT-4/Claude extracts Basic, HRA, Special Allowance — and the system can compute HRA optimization, recommend regime choice, and identify unused deductions. This takes a manual 2-hour process with a CA and turns it into a 30-second conversation.

**Current process it replaces**: Manually logging into 4-5 apps (bank, Groww/Zerodha, insurance portal, NPS), mentally summing balances, having no idea what percentage of income goes where. The organism view replaces fragmented dashboards with a single living picture.

---

### COUNCIL MODE: Multi-Agent Financial Deliberation

**What's possible today**: Fully buildable.

This is the most immediately deliverable feature. It requires: (a) access to the user's financial data (AA + transaction inference), and (b) LLM reasoning with different system prompts representing different perspectives.

| Component | Status | How |
|---|---|---|
| Multi-agent debate | Buildable today | Each "council member" is an LLM call with a different system prompt (wealth maximizer, risk guardian, life optimizer, tax strategist), all grounded in the same user data context |
| Personalized with real data | Buildable today | The council uses actual net worth, salary, existing investments, EMIs, runway — all available from AA + Tier 4 |
| Verdict synthesis | Buildable today | A final LLM call that weighs all perspectives and produces a conditional recommendation |
| Specific scenario modeling | Buildable today | "Should I buy a 2BHK for ₹85L" — the system can model EMI (₹68L loan at current rates), opportunity cost (invest ₹17L down payment instead), tax implications (Section 24 deduction), and compare to current rent |

**AI's unique contribution**: No human financial advisor can simultaneously model from 4 distinct analytical frames using your actual numbers in real-time. They give you one opinion (usually biased by what they sell). Council Mode gives you structured disagreement — which is more honest than any single recommendation.

**Current process it replaces**: Asking 3 friends (who don't know your finances), Googling "should I buy vs rent calculator" (which doesn't know your tax bracket), or paying a financial advisor ₹10-25K for a one-time consultation that takes 2 weeks.

---

### CONVERSE: Natural Language Financial Interface

**What's possible today**: Fully buildable with minor limitations.

The conversational interface ("Talk to your money") is straightforward LLM + RAG over the user's financial data. The hard part isn't the conversation — it's the data completeness behind the answers.

| Component | Status | How |
|---|---|---|
| Natural language query | Buildable today | LLM with structured financial data in context. "Can I afford a Goa trip?" triggers a cash flow computation |
| Scenario modeling | Buildable today | "What if I take a sabbatical?" — model income gap, runway depletion, recovery timeline from existing data |
| Idle money detection | Buildable today | Identify savings account balance consistently above 3-month average, suggest liquid fund deployment |
| Action execution | Partially buildable | Can recommend actions. Executing them (e.g., actually moving ₹40K to a liquid fund) requires BSE Star MF or MF Central API integration for mutual funds. Bank transfers require user action |

**AI bridge**: LLMs today are strong enough to understand financial intent from casual language. "I got a raise" triggers automatic recalculation of savings capacity, tax bracket changes, and investment reallocation suggestions. "My wife is pregnant" triggers insurance review, hospital cost estimation, and maternity benefit check — from a single sentence.

**Current process it replaces**: Opening a calculator app, pulling up Excel sheets, googling "sabbatical financial planning," reading 5 blog posts, still not having an answer specific to your situation.

---

### MONEY WRAP: Spotify Wrapped for Finance

**What's possible today**: 90% buildable.

The annual/monthly financial review is pure data analysis + visualization. All the data needed comes from AA bank transactions.

| Wrap Slide | Status | How |
|---|---|---|
| Total money flow (₹28.42L) | Buildable today | Sum of all bank credits over the period from AA data |
| Spending breakdown (₹100 split) | Buildable today | UPI transaction categorization (Tier 4). Rent, food delivery, EMIs, subscriptions — all detectable from transaction descriptions |
| Subscription leak (₹38K wasted) | Mostly buildable | Detect recurring same-amount debits to known subscription merchants. Flag based on amount pattern. Can't verify "usage" without app-specific APIs, but can flag "you're paying for 8 subscriptions totaling ₹X/month" |
| Stress spending detection | Buildable today | Timestamp analysis of food delivery transactions (2 AM orders), correlation with spending spikes during specific periods (month-end, appraisal season) |
| Financial health score | Buildable today | Composite of runway (months of expenses in liquid assets), protection coverage (detected premiums vs income), tax efficiency (deductions used vs available), cash velocity (how quickly money moves from income to productive allocation) |

**AI bridge**: LLMs can generate the narrative layer — turning raw data into "You spent ₹47K on 2 AM Swiggy orders. That's a round trip to Bali." This storytelling is what makes Spotify Wrapped viral. Raw numbers are boring. Contextual, slightly provocative comparisons make people share.

**Current process it replaces**: Literally nothing. No Indian wealthtech app does this today. The closest thing is CRED's year-end summary, which covers only credit card spend. A full financial wrap across all accounts doesn't exist.

---

### SOURCES SCREEN: Data Tier Visualization

**What's possible today**: Fully buildable (it's informational).

The Sources screen is a transparency layer showing users where their data comes from. It's a visualization of the data-topology.md tier model.

**Why it matters**: It builds trust. Users can see exactly what the system knows and doesn't know. "Your protection coverage estimate is 55% confident because we're inferring insurance from transaction patterns — connect your actual policies for 95% accuracy." This honesty is a feature.

---

### GHOST MODE: Financial Autopilot

**What's possible today**: The detection and recommendation layer — yes. The autonomous execution layer — partially.

| Component | Status | How |
|---|---|---|
| Idle cash detection | Buildable today | Monitor savings balance via AA, flag when consistently above threshold |
| SIP monitoring and optimization | Buildable today | MF data from CAMS/KFintech via AA shows all active SIPs. Can recommend rebalancing |
| Insurance gap detection | Partially buildable | Can detect premium payments and estimate coverage from amount + insurer. Full policy analysis requires AA insurance FIPs (6-18 months) or manual policy upload |
| Tax-loss harvesting alerts | Buildable today | MF capital gains data is available via AA. Can compute unrealized losses and suggest harvesting before financial year end |
| Autonomous SIP execution | Buildable today | BSE Star MF and MF Central APIs allow programmatic MF purchase/redemption/switch |
| Autonomous insurance purchase | Not yet buildable | No API for insurance purchase exists. Bima Sugam (India's insurance marketplace) is expected to enable this, but isn't live for API-driven purchase |
| Autonomous loan refinancing | Not yet buildable | No programmatic loan origination API exists on OCEN at consumer scale yet |

**AI bridge for what's missing**: Where autonomous execution isn't possible, AI can do 90% of the work and hand off the last mile. For insurance: the system researches, compares 5 insurers, pre-fills the application, and presents a single "approve and buy" step to the user. Instead of the user spending 6 hours comparing policies on PolicyBazaar, they spend 30 seconds reviewing a recommendation backed by their actual data. The AI reduces a 6-hour process to 30 seconds + 1 approval tap.

**Current process it replaces**: Setting calendar reminders for SIP reviews, manually checking if FDs have matured, forgetting to claim tax deductions, never shopping for better insurance because it's too tedious.

---

### NEGOTIATION ENGINE: Automated Financial Advocacy

**What's possible today**: The detection and preparation layer. Not the automated negotiation itself.

| Component | Status | How |
|---|---|---|
| Rate improvement opportunity detection | Buildable today | CIBIL score trend + loan tenure + market rate comparison. "Your home loan is at 9.2% but current rates are 8.5% and your CIBIL has improved 40 points" |
| Insurance renewal optimization | Mostly buildable | Detect renewal date from transaction pattern (annual premium debit). Compare across insurers via publicly available premium calculators |
| Multi-lender comparison | Partially buildable | OCEN is live but adoption is limited. For home loans, can aggregate rates from lender websites. Not yet a real-time auction |
| Automated negotiation execution | Not yet buildable | No bank or insurer accepts automated rate-reduction requests via API. This requires a human-like interaction (call, email, portal) |

**AI bridge**: This is where AI creates the most dramatic improvement over current processes. Today, negotiating a home loan rate reduction means: calling your bank, waiting on hold for 40 minutes, being transferred 3 times, explaining your case, being told "we'll get back to you," following up 4 times. AI can draft the perfect negotiation letter, backed by verified data (CIBIL score, payment history, competing offers), and the user just sends it. The AI does 95% of the work; the user presses send. Converting a 4-hour multi-call ordeal into a 2-minute review-and-send.

---

### LIFE MESH: Cross-Domain Intelligence

**What's possible today**: 3 out of 5 core connections.

| Connection | Status | How |
|---|---|---|
| Swiggy/Zomato spending to health risk | Buildable today | Pure transaction inference (Tier 4). No external API needed. Detect frequency, amount, time-of-day patterns from UPI descriptions |
| Uber/Ola commute to relocation ROI | Buildable today | Transaction inference for ride frequency + cost. Compute annual commute spend and compare to rent differential for closer locations |
| Calendar events to cash flow | Buildable today | Google Calendar API (Tier 3) with user OAuth consent. Detect weddings, travel, large events and pre-build cash buffers |
| Apple Watch/Google Fit to insurance | Partially buildable | Health APIs are accessible (Tier 3). But no Indian insurer currently offers API-driven premium discounts for health data. The insight is available; the automated action isn't |
| LinkedIn career signals to financial prep | Limited | LinkedIn API is extremely restricted. Career signals mostly come from user conversation (Tier 5) or salary change detection from bank data (Tier 4). Full LinkedIn integration isn't feasible today |

**AI bridge**: Even without LinkedIn API access, the Converse interface can have a natural career conversation. "I'm thinking of switching from engineering to product management" — and the LLM can model typical PM salaries at the user's experience level, estimate the income change, and adjust financial plans accordingly. The insight quality is 80% of what a full LinkedIn integration would provide, through conversation alone.

---

## The Implementation Priority Matrix

Based on what's buildable today and what delivers the most user value:

**Phase 1 — Buildable now, high impact (Month 0-3)**:
Money Wrap (viral acquisition wedge — nothing like it exists), Organism screen (differentiated dashboard replacement), Converse (natural language financial Q&A), Council Mode (decision support for big financial questions)

**Phase 2 — Buildable now, needs execution APIs (Month 3-6)**:
Ghost Mode Level 1 (detection + recommendations, not autonomous execution), basic Life Mesh (Swiggy/Uber/Calendar connections via transaction inference), Sources transparency screen

**Phase 3 — Waiting on infrastructure (Month 6-12)**:
Ghost Mode Level 2 (autonomous MF execution via BSE Star), Negotiation Engine (detection + letter drafting, not automated negotiation), Insurance gap analysis (improves dramatically when AA insurance FIPs go live)

**Phase 4 — Full vision (Month 12+)**:
Ghost Mode Level 3 (autonomous insurance, credit), full Negotiation Engine with OCEN integration, collective intelligence (Chapter 08 — requires scale), regulatory sandbox participation

---

## What AI Changes About the User Experience, Right Now

Forget the full autonomous vision for a moment. Even with today's limitations, AI fundamentally changes 5 things:

**1. From "data scattered across 8 apps" to "one living view"**
Account Aggregator exists today. No Indian app uses it to its full potential. AA + transaction inference + an LLM that can synthesize = a complete financial picture that currently requires manually checking HDFC, Groww, Zerodha, CAMS, LIC, NPS, and a spreadsheet.

**2. From "generic advice" to "advice computed from your actual numbers"**
Current robo-advisors ask your age and risk tolerance, then recommend the same 5 funds to everyone. Council Mode uses your actual salary, spending pattern, existing investments, EMIs, and tax situation to generate recommendations that are genuinely personal.

**3. From "you do the research" to "research done, just approve"**
Comparing health insurance today means: visiting PolicyBazaar, entering your details 8 times, reading 40 policy documents, understanding sub-limits and co-pays, and still not knowing if the coverage is adequate for your specific health situation. AI can do all of this in seconds and present one recommendation with a clear explanation of why.

**4. From "annual CA visit" to "continuous tax optimization"**
Most Indians interact with tax planning in January (panic), March (more panic), and July (filing). AI with access to your financial data can continuously compute your tax liability, flag unused deductions in real-time, and recommend regime choice based on actual numbers — not a generic "old vs new regime calculator."

**5. From "money is stressful" to "money is handled"**
The psychological value is underestimated. The constant low-grade anxiety of "am I saving enough? Is my insurance adequate? Am I overpaying on my loan?" — AI can replace that with a concrete score, a clear status, and specific actions. Not because the AI is perfect, but because having any structured assessment is infinitely better than the current default of vague worry.

---

## The Honest Gaps

Some things genuinely can't be bridged by AI today:

**Autonomous execution across all financial products**: AI can recommend, but executing insurance purchases, loan refinancing, and bank account switches still requires human action. This is a regulatory and infrastructure gap, not an AI gap.

**Real-time insurance policy analysis**: Until AA insurance FIPs go live, the system can detect that you pay ₹18,000/year to Star Health — but can't tell if your coverage is ₹5L or ₹15L, whether you have a no-claim bonus, or what your sub-limits are. Workaround: ask the user to upload their policy PDF, and use AI to extract the details.

**Collective bargaining at scale**: Chapter 08's vision of 50,000 borrowers negotiating collectively requires scale that doesn't exist at launch. This is a network effect, not a technical limitation.

**Full career trajectory modeling**: Without deep LinkedIn integration, career modeling relies on user self-report and salary trend detection. Accurate, but not as rich as the vision describes.

---

## The Bottom Line

The manifesto isn't a 2036 fantasy. About two-thirds of it is buildable in 2026. The remaining third is blocked by infrastructure that's actively being built (AA insurance FIPs, OCEN scaling, Bima Sugam), not by any fundamental technical impossibility.

More importantly: even the 60-65% that's buildable today is so dramatically better than what exists in Indian wealthtech that it constitutes a category-defining product. No Indian app does Money Wrap. No Indian app does Council Mode. No Indian app uses AA data for transaction-level spending intelligence. No Indian app offers a conversational financial interface grounded in real data.

The gap between "what's possible today" and "what anyone has built" is the real opportunity. The manifesto's full vision is the north star. But the product you can ship in 3 months is already better than anything on the market.

---

*Return to [Table of Contents](../README.md)*
