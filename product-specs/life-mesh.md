# Life Mesh

## The Cross-Domain Intelligence That Connects Your Swiggy Orders to Your Insurance Premium

---

**Product Type**: Consent-Driven Cross-Domain Financial Intelligence Layer

**The Problem It Solves**: Financial advice is systematically wrong because it looks only at financial data. The most important inputs to good financial decisions — your career trajectory, your health, your family situation, your ambitions — exist entirely outside financial apps. Life Mesh is the consent-driven integration layer that brings your life context into your financial intelligence.

---

## What Life Mesh Is

Life Mesh is a modular consent layer that connects voluntary, user-authorized data domains to the financial intelligence engine. It is not surveillance. It is not passive data collection. It is a series of explicit integrations, each offering a concrete financial benefit, each requiring separate user consent.

Users build their Life Mesh integration-by-integration, starting with whatever resonates. Each new connection makes the financial intelligence more accurate.

---

## The Integration Modules

### Module 1: Career Mesh
**What it connects**: LinkedIn profile data (via OAuth), employer data detected from salary source, salary trend from bank statements
**What it enables**:
- Income projection modeling (based on role, industry, seniority trajectory)
- Job change readiness assessment and buffer maintenance
- ESOP/equity compensation modeling for startup employees
- Entrepreneur transition financial modeling
- Automatic financial adjustment when job change is detected

**The user prompt**: *"Connect your LinkedIn to give your financial plan a career IQ upgrade. I'll model your income trajectory more accurately and prep you financially for your next career move — automatically."*

**Concrete benefit example**: System detects you've started following "product management" content on LinkedIn and applied to 3 companies (via email signals, with consent). Automatically increases liquid reserve by ₹30,000 over 2 months in case of income gap during transition. When you get the job offer, immediately models the financial difference and suggests the right answer to "should I accept lower salary for higher equity?"

---

### Module 2: Health Mesh
**What it connects**: ABDM health records (with ABDM consent), wearable data (Fitbit, Apple Health, Google Fit — via user-authorized export), pharmacy payment patterns (from UPI data already connected)
**What it enables**:
- Accurate health insurance adequacy assessment
- Top-up insurance recommendations calibrated to actual health situation
- Preventive health spend tracking and HSA-equivalent optimization
- Life insurance pricing optimization (health data → better underwriting)
- Long-term healthcare cost modeling for financial planning

**The user prompt**: *"Connect your health records to make sure your insurance actually covers what could happen to you — not just what the policy brochure says it does."*

**Concrete benefit example**: ABDM records show a diagnosis of Type 2 diabetes (well-managed, 2 years ago). System surfaces: your standard health policy has a 2-year waiting period for diabetes complications that has now expired — you're newly eligible for claims you couldn't make before. Also surfaces: your current insurer has raised premiums for your profile by 18% on renewal; here are two insurers who will renew at better rates given your current controlled HbA1c.

---

### Module 3: Family Mesh
**What it connects**: User-provided family member details, optional family member AA consents (for joint financial planning), dependent lifecycle events detected from spending
**What it enables**:
- Household financial health modeling (not just individual)
- Dependent cost trajectory (child education cost modeling, aging parent support modeling)
- Joint goal planning (home purchase, family vacation, joint retirement)
- Insurance gap assessment for the entire household
- Inter-generational wealth planning

**The user prompt**: *"Add your family to your financial picture so I can plan for your household — not just for you."*

**Concrete benefit example**: User's daughter just started at a private school (detected from new ₹8,500/month school fee payment). System automatically projects education cost escalation at 8%/year, calculates corpus needed for college, models required monthly investment, and surfaces a Sukanya Samriddhi Yojana account if daughter is under 10.

---

### Module 4: Lifestyle Mesh
**What it connects**: Already-connected UPI transaction data, re-analyzed for lifestyle signals beyond spending categories
**What it enables**:
- Lifestyle-adjusted financial planning (your actual lifestyle, not a generic assumption)
- Spending pattern → wellness signal analysis (restaurant frequency, gym payments, alcohol spend patterns relevant to health insurance underwriting)
- Geographic mobility detection (rental payments shifting location → possible relocation)
- Consumer preference signals for product personalization

**The user prompt**: *"Let me look deeper at your spending patterns to give you financial advice that fits your actual life — not a generic profile."*

**Concrete benefit example**: UPI data shows 12 Zomato/Swiggy transactions per week averaging ₹450 each — ₹21,600/month on food delivery. System surfaces: "You spend ₹2.6L/year on food delivery. If that's intentional, great — I've modeled it. If you'd like to redirect even ₹8,000/month to your emergency fund, you'd reach your 6-month target 4 months earlier." No judgment. Just the trade-off, clearly stated, for the user to decide.

---

### Module 5: Ambition Mesh
**What it connects**: User conversations (within the platform), goal statements, direct user input on future plans
**What it enables**:
- Long-horizon financial modeling from ambitions, not just current trajectory
- Scenario planning ("what if I start a company in 2 years?")
- Life path comparison ("here's what your finances look like if you take the Singapore job vs. stay in Pune")
- Dream articulation support ("I want to retire at 45 — here's exactly what that requires")

**The user prompt**: *"Tell me what you want your life to look like. I'll tell you what your finances need to do to get you there."*

**Concrete benefit example**: User mentions in a conversation: "I'm thinking about moving to Europe in the next 5 years." System immediately models: which investments are portable vs. India-specific, what the tax implications of leaving India are, what FY-end timeline matters for capital gains optimization, and what financial milestones you'd want to hit before leaving. Builds a "Europe readiness score" that updates quarterly.

---

## The Consent Architecture

Life Mesh is built on a granular, module-level consent architecture:

**Per-module consent**: Granting Career Mesh does not grant Health Mesh. Each module is separate.

**Purpose-bounded processing**: Career data is used only for financial modeling. It is not used for credit scoring. Health data is used only for insurance adequacy assessment. It is not used to price loans.

**No cross-domain inference without consent**: The system does not infer health information from spending patterns (though it could). It does not infer career information from location patterns. Cross-domain inferences require explicit module consent.

**Deletion cascades properly**: Revoking Health Mesh consent deletes all health-derived data and recalculates all recommendations that were based on health context without it.

**Transparent inference log**: Users can see every inference the system made from cross-domain data. "I inferred you might be considering a career change based on these signals. Was I right?"

---

## The Rollout Strategy

Life Mesh modules do not launch simultaneously. Rollout order follows user value clarity and regulatory readiness:

**Phase 1 (Launch)**: Lifestyle Mesh (already available from UPI data, no new consents needed) + Ambition Mesh (conversation-based, no external data needed)

**Phase 2 (6 months post-launch)**: Career Mesh (LinkedIn OAuth, employer detection). Requires career data partnership agreements.

**Phase 3 (12 months post-launch)**: Family Mesh (dependent lifecycle detection + optional family member onboarding)

**Phase 4 (18–24 months post-launch)**: Health Mesh (ABDM integration). Requires ABDM FIU status and explicit regulatory framework for health-finance integration.

---

## The Privacy-Usefulness Trade-off Dialogue

Life Mesh should be explicit about the trade-off it's asking users to make. Every onboarding prompt should frame it honestly:

*"Connecting [Career Mesh] means I'll know more about your professional life. I'll use this to give you better financial advice — specifically, better income projections and better job change preparation. I won't share this data with anyone. You can disconnect at any time and I'll delete the data within 24 hours. The more you tell me about your life, the better I can help with your money. But you decide what you're comfortable sharing."*

This is not a legal disclaimer. It's a genuine description of the trade-off. Users who understand it clearly make better consent decisions — and users who've consciously chosen to share data trust the system more with what they've shared.

---

## Why Life Mesh Is a Moat

The cross-domain data integrations in Life Mesh create a switching cost that pure financial product competitors cannot replicate.

If a user has connected Career Mesh, Health Mesh, and Family Mesh — and the system has built up 2 years of context about their financial life — switching to a competitor means:
- Losing all the cross-domain context
- Starting the trust-building process from scratch
- Re-granting all the consents (which is cognitive friction)
- Getting less accurate advice for 6–12 months while the new system learns

The Life Mesh is the deepest competitive moat in the product — not because it locks users in by force, but because it creates genuine switching costs through accumulated value.

---

*[Back to README](../README.md)*
