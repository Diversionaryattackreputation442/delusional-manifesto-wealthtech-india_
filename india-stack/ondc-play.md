# The ONDC Play

## Open Commerce Meets Autonomous Finance

---

> *"UPI made payments a utility. ONDC will make commerce a utility. Financial products are next."*

---

Most fintech builders think of ONDC as a retail commerce play — competing with Amazon and Flipkart for grocery and apparel. They're not wrong, but they're missing the bigger picture.

ONDC is a protocol — like UPI, like HTTP, like SMTP. It defines how buyers and sellers find each other and transact, without requiring them to be on the same platform. For retail commerce, this means a Jio Mart seller can sell to a Magicpin buyer without either being on the same app.

For financial products, it means something much more significant: **the distribution of financial products becomes open, interoperable, and competitively priced for the first time.**

---

## What Financial Products on ONDC Looks Like

ONDC's financial services layer is being built to cover:

**Insurance**: IRDAI has been actively integrating with ONDC. A term insurance policy from HDFC Life, underwritten for a specific user's profile, can be discovered and purchased through any ONDC-compliant buyer app — a payment app, a financial planning app, a grocery app, an employer portal.

**Mutual Funds**: MF Central integration with ONDC allows any buyer app to initiate a mutual fund purchase, with the transaction routing through the ONDC network to the relevant AMC and custodian.

**Credit Products**: OCEN (Open Credit Enablement Network) functions similarly to ONDC for lending — any lender's credit product can be surfaced to any borrower through any embedded finance interface.

**Government Schemes**: Jan Suraksha products (PMJJBY life insurance, PMSBY accident insurance, APY pension) can be distributed through any ONDC-compliant interface, dramatically expanding reach beyond current bank-branch distribution.

---

## Why This Changes Distribution Economics

The current financial product distribution model in India has a fundamental structural problem: **the distributor's incentives are misaligned with the buyer's interests.**

A bank sells you its own FD (not necessarily the best rate). An insurance agent sells you the insurer who pays the highest commission. A mutual fund distributor recommends funds from AMCs with whom they have volume agreements. The buyer doesn't know any of this.

ONDC doesn't eliminate commissions automatically — but it creates the conditions for a different model:

**Transparent comparison**: When a financial product is discoverable on an open network, comparison is automatic. Any buyer app can surface 8 term insurance options side-by-side, ranked by price for equivalent coverage. The opacity that enables high-commission product sales collapses.

**Buyer app competition**: In an ONDC world, buyer apps compete on user experience and recommendation quality, not on captive product relationships. The buyer app that consistently recommends the best product (not the highest-commission product) builds user trust faster. This creates a commercial incentive for buyer apps to be honest — which doesn't exist in the current captive distribution model.

**Smaller distribution overhead**: When product distribution is automated through an open protocol, the cost of distributing a financial product falls dramatically. A term insurance policy that currently requires an agent's visit, documentation collection, and a 15-day underwriting process can be completed in minutes on ONDC, with AA-powered data. Lower distribution cost = lower premium = better value for the user.

---

## The Autonomous Finance + ONDC Architecture

For an autonomous financial agent, ONDC integration is the execution layer for financial product selection and purchase.

Here's how it works end-to-end:

**Scenario**: The agent's Insurance Module detects a coverage gap. The user's term cover is ₹50L but their income and liabilities suggest they need ₹1.5Cr.

1. The agent runs a query against the ONDC financial services network: "Term insurance, ₹1Cr sum assured, male, 34 years, non-smoker, 20 year term, verified income ₹18L, verified health status [from ABDM consent]."

2. Multiple insurers on the ONDC network respond with offers: premium, exclusions, claim settlement ratio, waiting periods.

3. The agent's selection algorithm ranks offers by: premium-adjusted-for-coverage, insurer's claim settlement ratio, exclusion scope, renewal terms.

4. The agent surfaces the top 3 options to the user with a plain-language comparison. "Option 1 saves ₹800/year vs. Option 2 but has a 12-month waiting period for critical illness riders. Option 2 is slightly pricier but has the best claim settlement ratio in the category."

5. User selects Option 2. One tap.

6. The agent initiates the ONDC transaction. AA-powered eKYC completes the application in 90 seconds. Premium is debited via UPI AutoPay.

7. The policy is active. The Insurance Module updates the coverage status. The gap is closed.

Total time from detection to resolution: 5 minutes. Total user cognitive load: choosing from 3 well-characterized options. Total agent actions: 8 autonomous steps.

This is what ONDC makes possible for financial products — not just a better comparison website, but a fully orchestrated, automated financial product acquisition process.

---

## The Network Effects of ONDC Financial Products

ONDC's value in commerce comes from network effects: more sellers on the network → better selection for buyers → more buyers → more sellers. The same network effects apply to financial products, with one additional dimension: **data-driven personalization at scale.**

In ONDC commerce, a buyer's purchase history can influence product recommendations. In ONDC financial products, with AA consent, a buyer's complete financial profile can influence product offers in real-time.

Imagine: a user consents to share their verified financial profile with the ONDC financial services network. Insurers, lenders, and investment product providers in the network compete to offer the best terms for that specific, verified profile. The buyer isn't filling out applications for each product — one consent, one profile, multiple competitive offers.

This is the reverse auction model for financial products. Instead of the buyer applying to each provider separately (and getting opaque, take-it-or-leave-it offers), the provider competes for the buyer's verified, qualified business.

This reverses the information asymmetry that has characterized financial product sales since the beginning of the industry.

---

## What Needs to Be True for This to Work

The ONDC financial products vision requires several things to come together:

**FIP coverage**: AA needs to cover enough of a user's financial life to make verified profile-based offers meaningful. Currently at 60–70% coverage; needs to reach 90%+.

**ONDC protocol maturity for financial products**: The retail commerce ONDC protocol is stable. The financial products protocol is still being built. Expect 18–24 months before it's production-ready for all product categories.

**Insurer/lender onboarding**: The ONDC network is only as good as its seller coverage. Getting all major insurers and lenders to onboard their products requires regulatory nudging (which IRDAI and RBI are providing) and operational integration work (which takes time).

**Regulator alignment**: The SEBI/IRDAI oversight frameworks for ONDC-distributed financial products need to be explicitly designed. The good news: IRDAI has been an active participant in Bima Sugam (the insurance-specific open marketplace) which has many of the same properties as ONDC for insurance.

**Trust in the buyer app**: On ONDC, the buyer app is responsible for the user's trust. A buyer app that pushes high-commission products over better-value ones will lose users. Regulatory guidelines for buyer app behavior in financial product distribution are being developed.

---

## The Builder's Opportunity in ONDC Financial Products

For a company building autonomous finance today, the ONDC financial products layer is an opportunity to get ahead of the curve:

**Become an early ONDC financial products buyer app**: Register as an ONDC buyer app for insurance and credit products. Be the first to integrate ONDC financial product discovery into a financial planning product. First mover advantage in ONDC-native financial product distribution is significant.

**Contribute to the protocol**: The ONDC financial products protocol is being written now. Companies that participate in its design influence its structure in ways that favor their use cases.

**Build the selection algorithm**: ONDC democratizes access to products. The selection algorithm — which product to recommend from the competitive set — is where value is created and where differentiation lives. Build the best selection algorithm and ONDC amplifies its impact.

**Design the consent flow**: The user experience of granting AA consent to enable ONDC financial product personalization is being invented now. The company that gets this UX right will set the standard.

ONDC is 2–3 years from being the default distribution mechanism for retail financial products in India. The companies that are building on it today will be well-positioned when that becomes true.

---

*[Back to README](../README.md)*
