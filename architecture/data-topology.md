# Data Topology

## From Account Aggregator to Ambient Financial Awareness

---

Understanding how data flows through the autonomous financial nervous system is essential for building it correctly and for building it with appropriate privacy protections.

This document maps the complete data topology: sources, flows, transformations, storage, and use.

---

## The Data Sources

### Tier 1: Core Financial Data (via Account Aggregator)

These data sources are available through the regulated AA framework, with user consent.

| Source | Data Available | Update Frequency | AA Category |
|--------|----------------|-----------------|-------------|
| Savings accounts (all banks) | Balance, transaction history | Near-real-time | Bank |
| Current accounts | Balance, transaction history | Near-real-time | Bank |
| Fixed deposits | Principal, interest rate, maturity | Daily | Bank |
| Mutual funds | Holdings (units, current NAV), SIP details, transaction history | Daily | MF |
| NPS | Tier 1 & 2 balance, contribution history | Daily | Pension |
| PPF | Balance, contribution history | Monthly | Pension |
| Insurance policies | Policy details, premium, coverage, nominee | Per-event | Insurance |
| GSTN | GST filing data, turnover (for business users) | Monthly | GSTN |
| IT Returns | Filed returns, income, deductions | Annual | ITR |
| Form 26AS | TDS, advance tax, refunds | Real-time | IT |
| Equities/DEMAT | Holdings (shares, current price), transaction history | Daily | Securities |

**Access model**: Consent-based, time-bounded. Each consent specifies: purpose, data range, access frequency, expiry. User can revoke at any time.

**Privacy note**: AA data flows through a regulated intermediary (licensed AA Operator). The financial product company (FIU) never holds the raw data from the source institution — it receives it via the AA pipe and stores only what's necessary for the specified purpose.

---

### Tier 2: Payment Behavioral Data (via UPI/Bank Statement)

This data is available via Account Aggregator bank statement data or direct UPI data partnerships.

| Data Type | Source | Value for Financial Intelligence |
|-----------|--------|----------------------------------|
| UPI transactions | AA Bank / Direct UPI | Spending categorization, income detection, merchant patterns |
| Standing instructions | AA Bank | Fixed commitments, loan EMIs |
| Credit card statements | AA Bank | Credit utilization, spending patterns |
| IMPS/NEFT/RTGS | AA Bank | Large transfers, rent payments, irregular transactions |

**Key processing**: UPI transactions are the richest behavioral data source. Merchant categorization (distinguishing a Swiggy payment from a hospital payment from a school fee payment) is the most valuable Layer 1 processing step.

**Privacy note**: Transaction data processed for categorization purposes; raw transaction records retained only as required for user access and audit, not for behavioral profiling beyond financial management use.

---

### Tier 3: Identity and Document Data (via DigiLocker)

Available with user consent via DigiLocker APIs.

| Document | Data Available | Use Case |
|----------|----------------|----------|
| Aadhaar | Name, DOB, gender, address | KYC, identity verification |
| PAN | PAN number, name | Tax filing, investment KYC |
| Form 16 | Employer details, salary, TDS | Income verification, tax planning |
| Driving License | Identity, address | Address verification |
| Property documents | Property details | Asset modeling |

**Access model**: Document-specific consent. Each document access requires separate user authorization.

---

### Tier 4: Cross-Domain Data (with Extended Consent)

These data sources are outside the AA framework and require separate consent mechanisms.

| Domain | Data Source | Data Type | Consent Mechanism |
|--------|-------------|-----------|-------------------|
| Health | ABDM (Ayushman Bharat Digital Mission) | Health records, prescriptions, lab reports | ABDM consent framework |
| Employment | LinkedIn API / user-provided | Job title, employer, seniority changes | User-authorized OAuth |
| Wellness | Wearables / health apps | Activity data, vitals | Wearable/app consent |
| Commerce | ONDC data (aggregated) | Purchase patterns | ONDC consent |

**Privacy note**: Cross-domain data is the most sensitive tier. It is processed only with explicit, granular, purpose-limited consent. User can grant Tier 1-3 access without granting Tier 4. Tier 4 data is processed in the context of the specific financial calculation it was consented for; it is not retained in the general financial state model unless the user has specifically authorized this.

---

## Data Flow Architecture

### Ingestion Flow

```
Source Institution
        ↓ (AA encrypted pipe / direct API)
AA Operator (Finvu / OneMoney / etc.)
        ↓ (consent-validated data delivery)
FIU (our platform) — Raw Data Landing Zone
        ↓ (Layer 1: parsing, normalization, categorization)
Normalized Data Store
        ↓ (Layer 2: state model computation)
Financial State Model
```

**Security at each step**:
- AA pipe: TLS + data signing. AA Operator verifies consent before data delivery
- Raw Data Landing Zone: Encrypted at rest, access-logged, short retention (24-48 hours before processed data replaces raw)
- Normalized Data Store: Encrypted, user-partitioned, access via service accounts only
- Financial State Model: Encrypted, in-memory query layer for latency-sensitive operations

---

### Consent Data Model

Every piece of data in the system is tagged with its consent lineage:

```json
{
  "data_id": "txn_2024_03_01_001",
  "source": "HDFC_BANK_AA",
  "consent_id": "consent_ABC123",
  "consent_purpose": "financial_planning",
  "consent_granted_at": "2024-01-15T10:30:00Z",
  "consent_expires_at": "2025-01-15T10:30:00Z",
  "processing_allowed_for": ["financial_planning", "goal_tracking"],
  "sharing_allowed": false,
  "retention_until": "2025-01-15T10:30:00Z"
}
```

When consent is revoked, all data tagged with that consent_id is deleted within 24 hours.

---

### The Financial State Model Schema

The Financial State Model is the central data structure. It is:
- User-partitioned (each user's state is isolated)
- Point-in-time queryable (can reconstruct state at any past date)
- Encryption-at-rest with user-specific keys
- Access-logged (every query logged with purpose)

**High-level schema**:

```
User {
  id: UUID
  created_at: Timestamp

  identity {
    kyc_status: Enum
    pan: Encrypted
    aadhaar_reference: Encrypted (not raw number)
  }

  accounts [
    Account {
      institution: String
      type: Enum (savings, current, FD, etc.)
      balance: Amount
      last_updated: Timestamp
      transactions: [Transaction]
    }
  ]

  investments [
    Investment {
      type: Enum (MF, equity, NPS, PPF, etc.)
      instrument_id: String
      quantity: Decimal
      current_value: Amount
      cost_basis: Amount
      last_updated: Timestamp
    }
  ]

  insurance [
    Policy {
      type: Enum (life, health, CI, etc.)
      insurer: String
      sum_assured: Amount
      premium: Amount
      expiry: Date
      coverage_details: JSON
    }
  ]

  liabilities [
    Loan {
      type: Enum (home, car, personal, education)
      lender: String
      outstanding: Amount
      emi: Amount
      rate: Decimal
      maturity: Date
    }
  ]

  goals [
    Goal {
      name: String
      target_amount: Amount
      target_date: Date
      current_corpus: Amount
      monthly_contribution: Amount
      probability_of_achievement: Decimal
      last_updated: Timestamp
    }
  ]

  tax_state {
    fy: String
    section_80c_utilized: Amount
    ltcg_accumulated: Amount
    stcg_accumulated: Amount
    advance_tax_paid: Amount
    tds_credited: Amount
  }

  spending_model {
    categories: Map<Category, MonthlyAmount>
    fixed_obligations: [FixedObligation]
    monthly_surplus_estimate: Amount
    last_updated: Timestamp
  }

  financial_health_score {
    overall: Integer (0-100)
    emergency_fund_score: Integer
    investment_score: Integer
    insurance_score: Integer
    debt_score: Integer
    tax_efficiency_score: Integer
    computed_at: Timestamp
  }
}
```

---

## Data Residency and Sovereignty

All user financial data resides in India. No cross-border data transfer of financial data. This is both a regulatory requirement (RBI data localization norms) and a user trust commitment.

Specific requirements:
- Primary data storage: Indian cloud regions (AWS Mumbai, GCP Mumbai, Azure India)
- Backup/DR: Indian regions only
- LLM processing: Where LLM inference requires sending data to a US-based model API, only anonymized or aggregated data leaves India. Raw financial data is processed locally or via Indian-based inference endpoints.

---

## Data Minimization Principles

The system stores only what is necessary for the financial management function. Specifically:

**Not stored**:
- Raw document images (DigiLocker documents are processed and specific fields extracted; originals not stored)
- Full transaction descriptions (merchant name and category extracted; raw narrative strings not retained beyond 30 days)
- Health record contents (ABDM health records are processed for insurance relevance signals; actual medical record content is not stored in the financial system)
- Cross-domain behavioral data beyond what directly informs a current financial decision

**Retained with time limits**:
- Transaction history: 36 months (required for tax purposes)
- Goal contribution history: For the life of the goal + 2 years
- Advice/action logs: 7 years (SEBI IA record-keeping requirement)

---

## The Ambient Awareness Layer

Beyond the structured data model, the autonomous financial system maintains what we call an **ambient awareness layer** — a continuously updated qualitative model of the user's financial context that isn't represented in structured data.

This is maintained as a vector embedding store, updated by the LLM layer as it processes new information:

- "User mentioned they might switch jobs next year" (from a conversation 3 months ago)
- "User expressed concern about parents' health" (from a conversation last week)
- "User has consistently declined insurance recommendations" (pattern from 8 months of interactions)
- "User's spending increased sharply in March — possibly related to child starting school" (inferred from transaction patterns)

This ambient context informs Layer 4 reasoning without being stored as structured data fields. It is part of the LLM's long-term memory for the user — queryable but not directly exported (protecting against context being used outside its intended purpose).

**Privacy consideration**: The ambient awareness layer is the most sensitive part of the data model. It contains inferences, not just facts. Clear user communication about what the system infers and how it uses inferences is essential to maintaining trust. Users can clear their ambient context at any time.

---

## Data Access for the User

Users should have complete visibility into their own data:

**What I can see**:
- All data held about me (structured data export in human-readable format)
- All consents I've granted (current and historical)
- All data access events (who accessed what, when, for what purpose)
- All autonomous actions taken (with reasoning)
- All inferences in my ambient context

**What I can do**:
- Export all my data in machine-readable format (portability)
- Revoke any consent (with immediate effect on data deletion)
- Request deletion of specific data categories
- Clear my ambient context
- Dispute an incorrect inference

This transparency is not just a legal requirement. It is the foundation of the trust that makes everything else possible.

---

*[Back to README](../README.md) | [System Architecture](system-architecture.md) | [Intelligence Layers](intelligence-layers.md)*
