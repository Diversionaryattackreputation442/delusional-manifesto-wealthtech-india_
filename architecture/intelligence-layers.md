# Intelligence Layers

## The Seven Layers of Financial AI

---

The autonomous financial nervous system is not a monolithic AI. It is a layered architecture — seven distinct intelligence layers, each with a specific function, each feeding into the layers above and below it. Understanding the layers separately is essential for building them correctly.

---

## Layer 1: Data Ingestion and Normalization

**Function**: Transform raw financial data from diverse sources into a clean, consistent, queryable internal representation.

**Inputs**:
- Account Aggregator data feeds (bank statements, MF holdings, insurance policies, tax data)
- UPI transaction streams (real-time payment data)
- DigiLocker document data (identity, income, property records)
- External market data (NAV feeds, interest rates, insurance premium databases)
- User-provided context (goals, preferences, life events entered directly)

**Processing**:
- Schema normalization: Every bank has different CSV/JSON formats for statement data. Layer 1 normalizes these into a consistent internal schema.
- Entity resolution: Recognizing that "AMAZON INDIA" in a bank statement and "Amazon" in an expense category are the same entity.
- Merchant categorization: Classifying UPI transactions by merchant category (food delivery, utilities, healthcare, education, rent, etc.)
- Anomaly flagging: Unusual transactions (large amounts, new payees, atypical patterns) are flagged for Layer 3 attention.
- Temporal indexing: All data is timestamped and indexed for efficient time-series queries.

**Output**: A clean, normalized, timestamped financial event stream and point-in-time state snapshots, stored in the Financial State Model.

**Technology**: Primarily deterministic (rule-based normalization, ML-based categorization). LLMs used only for ambiguous merchant categorization and unstructured document parsing.

---

## Layer 2: Financial State Model

**Function**: Maintain a complete, consistent model of the user's financial state at any point in time.

**The model contains**:

*Assets*
- Liquid: Savings accounts, current accounts, FDs (maturing within 90 days)
- Invested: Mutual funds (by fund, units, current NAV), direct equity (by stock, shares, current price), NPS, PPF, other
- Physical: Gold, real estate (if declared)
- Deferred: PF, gratuity, unvested ESOPs

*Liabilities*
- Active loans: Home loan, car loan, personal loan, education loan (outstanding principal, EMI, rate, remaining tenure)
- Credit card outstanding
- Other obligations

*Insurance*
- Life: Sum assured, premium, expiry, nominee
- Health: Coverage amount, family members covered, sub-limits, exclusions
- Critical illness, disability, property (if any)

*Cash flow*
- Income: Salary (after tax), freelance income, rental income, investment returns
- Fixed obligations: EMIs, rent, insurance premiums, school fees
- Variable spending: By category, by month (12-month trailing)
- Surplus/deficit: After fixed obligations and target savings

*Goals*
- Each goal: Name, target amount, target date, current progress, required monthly contribution, probability of achievement

*Tax state*
- Current year investment (80C utilized, remaining)
- Capital gains (short-term, long-term, by asset class)
- TDS credits
- Advance tax paid/due

**Update frequency**: Near-real-time for connected accounts, daily batch for others.

**Output**: A queryable, consistent snapshot of financial state that every other layer queries.

---

## Layer 3: Event Detection and Signal Processing

**Function**: Identify meaningful financial events and signals from the normalized data stream.

**Event types**:

*Threshold events*: Savings account below emergency fund floor. SIP payment failed. Loan EMI bounced. Insurance renewal due in 30 days. Goal progress below required pace.

*Pattern events*: Spending in a category has increased by >20% vs. 3-month average. Income irregularity detected (salary late or variable). Unusual payee detected. Merchant pattern suggesting a life event (hospital payments, school fee payments, new rent).

*External events*: Significant market move (portfolio value change >5% in a day). Interest rate change from RBI. Tax deadline approaching. Regulatory change affecting user's products.

*Life event signals*: New employer detected from salary source change. New location from merchant geography shift. New family member signals (pediatric hospital, baby products, maternity-related spending).

**Processing**: Rule-based for threshold events. ML-based for pattern detection. LLM-assisted for life event inference from unstructured signals.

**Output**: Event log with type, confidence, timestamp, and recommended action priority. Fed to Layer 4 for reasoning.

---

## Layer 4: Contextual Reasoning

**Function**: Interpret events in context and determine appropriate responses.

This is the primary LLM layer. Layer 4 takes:
- Current Financial State Model (from Layer 2)
- Recent events (from Layer 3)
- User goals and preferences
- Long-term memory of user history, patterns, and past interactions
- External context (market conditions, regulatory environment, product availability)

And reasons about:
- What does this event mean for this specific user's financial situation?
- What actions, if any, are appropriate in response?
- What is the appropriate urgency and communication tone?
- Are there competing priorities that need to be balanced?
- Does this event change the probability of any goal being achieved?

**Example reasoning chain** (triggered by salary increase event):
```
Event: Salary increased from ₹18L to ₹24L (detected from Account Aggregator)
Current state: Emergency fund at 4 months (below 6-month target). Retirement goal 8% ahead of schedule. Health insurance coverage adequate. Term insurance undercoverage.
User preference: Conservative risk tolerance, prefers being told before action on amounts > ₹5,000.
Reasoning:
- ₹6L increase in gross salary → ~₹4.8L net annual increase → ₹40,000/month more
- Priority 1: Build emergency fund to 6-month target (₹28,000 shortfall over ~3 months)
- Priority 2: Close term insurance gap (₹1.5Cr recommended, ₹1Cr current → additional ₹1,200/month premium)
- Priority 3: Increase retirement SIP by ₹10,000/month (maintains 30% savings rate)
- Communication: Non-urgent, positive framing. User will feel good about this event. Surface the opportunity.
Output: Recommendation to user with two options + one-tap execution paths.
```

**Technology**: Fine-tuned LLM with financial domain knowledge, integrated with retrieval-augmented generation (RAG) over the user's financial history and the product/regulation knowledge base.

---

## Layer 5: Action Planning and Execution

**Function**: Translate Layer 4 decisions into concrete, executable action plans.

For each decided action, Layer 5 generates:
- **Action specification**: What exactly should be done (e.g., "Increase Axis Flexi Cap SIP from ₹5,000 to ₹8,000 effective next month")
- **Execution path**: Which API call achieves this action (BSE StarMF SIP modification API, with specific parameters)
- **Pre-conditions**: What must be true before executing (e.g., sufficient bank balance for increased mandate)
- **Post-conditions**: What should be verified after execution (e.g., confirmation SMS, updated SIP status in next AA pull)
- **Rollback plan**: If execution fails, what's the fallback

**Autonomy tier assignment**: Layer 5 assigns each action to an autonomy tier (from Chapter 05):
- Tier 1 (execute immediately, no notification)
- Tier 2 (execute, then notify)
- Tier 3 (notify, execute on one-tap approval)
- Tier 4 (notify, wait for explicit human decision)

**Multi-step planning**: Some actions require sequencing. E.g., "Redeem liquid funds to cover emergency expense, then top up liquid funds from next month's surplus, then notify." Layer 5 plans the complete sequence.

**Output**: Ordered action queue with execution specifications and autonomy tiers.

---

## Layer 6: Execution Engine

**Function**: Execute planned actions via financial APIs, handle failures, and confirm outcomes.

**API integrations**:
- BSE StarMF / MF Central (mutual fund transactions)
- UPI AutoPay (standing instructions, mandate management)
- Direct bank APIs (fund transfers, FD management)
- Insurance APIs / Bima Sugam (policy purchase, renewal)
- Broker APIs (equity orders, if applicable)
- GSTN, Income Tax Portal (tax filing, if authorized)

**Execution principles**:
- **Idempotency**: Every action is designed to be safely retried if the first attempt fails
- **Bounded impact**: Per-transaction and per-day limits enforced at this layer, regardless of Layer 4/5 decisions
- **Confirmation-first for irreversible actions**: Before any irreversible action (selling equity, surrendering insurance), Layer 6 enforces a confirmation step even if Layer 5 designated it Tier 1
- **Failure handling**: API failures are logged, retried with backoff, and escalated to Layer 7 if unresolved

**Output**: Execution results (success/failure/pending), confirmation data, and updated Financial State Model triggers.

---

## Layer 7: Communication and User Interface

**Function**: Translate the system's state, decisions, and actions into appropriate user communications.

This is the layer the user actually interacts with.

**Communication types**:

*Weekly pulse*: Sunday evening. One message. Covers: what happened financially this week, what the system did autonomously, anything that needs your attention. Never more than 3 sentences + optional detail drill-down.

*Event-triggered notification*: When Layer 3 detects something significant and Layer 4 decides it warrants user awareness. Tone calibrated to event type (urgent for fraud suspicion, calm for routine rebalancing, positive for goal milestone).

*Recommendation card*: A specific action being surfaced for user approval (Tier 3 actions). Must include: what's being recommended, why, expected outcome, cost/benefit, and one-tap execute button.

*Conversation interface*: The natural language Q&A layer. User can ask any question about their financial state and get an accurate, contextual answer in plain language (or their preferred Indian language).

*Annual review*: Comprehensive summary of the year's financial progress. Every goal, every metric, every autonomous action, with plain-language narrative of what changed and why.

**Design principles**:
- **Minimize cognitive load**: Never more information than needed for the decision at hand
- **Plain language always**: No jargon unless the user has demonstrated comfort with it
- **Action-oriented**: Every communication either informs (no action needed) or offers a specific, easy action
- **Tone calibration**: Financial communication has emotional weight. The system should recognize when a user is stressed (detected from query patterns, spending anomalies) and adjust tone accordingly

---

## Cross-Layer Principles

**Privacy by architecture**: Sensitive data (health records, family information from cross-domain layer) never traverses Layer 6 (execution). It informs Layer 4 (reasoning) within a consent-bounded processing environment.

**Explainability requirement**: Every Layer 4 decision must produce an explanation that Layer 7 can communicate to the user in plain language. "Why did you do this?" must always have an answer.

**Human override at every layer**: At any point, the user can pause autonomous operation, review the queue, modify or cancel any pending action, and reset to manual control. The override is always one action, never buried in settings.

**Continuous learning**: Layer 4 maintains a feedback model. When users override autonomous actions, modify recommendations, or express dissatisfaction, this updates the user's preference model for future decisions.

---

## The Layers in Relation to Each Other

```
User ←→ Layer 7 (Communication)
              ↕
         Layer 4 (Contextual Reasoning)
              ↕
Layer 2 ←→ Layer 3          Layer 5 → Layer 6 → Financial APIs
(State)   (Events)         (Planning)  (Execution)
              ↑
         Layer 1 (Ingestion)
              ↑
    India Stack Data Sources
    (AA, UPI, DigiLocker, etc.)
```

The architecture is not a pipeline. It's a continuous loop: ingestion updates the state model, the state model feeds event detection, events trigger reasoning, reasoning generates plans, plans execute via APIs, execution results update the state model, and the loop continues.

The user sits above Layer 7, touching the system only when meaningful input or decision is needed.

---

*[Back to README](../README.md) | [System Architecture](system-architecture.md) | [Data Topology](data-topology.md)*
