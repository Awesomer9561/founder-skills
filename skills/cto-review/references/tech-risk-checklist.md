# Technical Risk Checklist

Use this to find, score and rank the risks in a product idea, feature or initiative. Walk every category, keep the risks that apply, score them, and carry the top 5 into the review.

---

## 1. Scoring

Score each risk on two axes, 1–3.

| Score | Likelihood | Impact |
|-------|------------|--------|
| 1 | Unlikely; done many times before by teams like this one | Annoying; a few days of rework |
| 2 | Plausible; done before, but not by this team or not at this scale | Delays launch by weeks, or costs a meaningful slice of budget |
| 3 | Likely or unknown; no one has shown it works in this setting | Kills the product, a customer, the margin or the company's reputation |

**Risk score = likelihood × impact (1–9).**
- **7–9:** must be retired *before* committing the build budget. This is the spike target.
- **4–6:** needs a named mitigation and an owner in the plan.
- **1–3:** note it; revisit at the next milestone.

**Tiebreaker for the top spot:** pick the risk that, if it turns out badly, invalidates the most other work. That's the one the 2-week spike attacks.

---

## 2. Risk Categories

### A. Feasibility ("can it be built at all?")
| Signal | Mitigation |
|--------|------------|
| Core feature depends on an algorithm, model or integration nobody on the team has built before | Time-boxed spike that proves the hardest 10% end to end on real data |
| Requirement phrased as "real-time", "instant", "100% accurate", "works offline" with no numbers | Turn it into a measurable target (p95 latency, accuracy %, sync window) and test against it |
| Depends on a third-party API that is private, unofficial, rate-limited or recently changed terms (e.g. scraping, social platform APIs) | Confirm written terms and quotas; prototype against the real API; have a fallback data source |
| Hardware, device or OS-level access (Bluetooth, background location, browser extensions, app store rules) | Build a throwaway prototype on the target devices in week 1; check store policies |
| "Like X but…" where X took a large team years | Scope the smallest version that delivers the core value; cut the rest |

### B. Scalability & Performance
| Signal | Mitigation |
|--------|------------|
| Expected load is unknown or "could go viral" | Estimate peak requests/sec from users × actions × peak factor (3–10× average); load test at 3× that |
| Fan-out patterns: feeds, notifications to followers, multi-tenant reports | Precompute or queue; cap fan-out; measure with production-like data volumes |
| Large files, video, or heavy compute per request | Async processing with queues; direct-to-storage uploads; CDN |
| Single database doing OLTP + analytics | Read replica or a separate analytics store once reports slow down transactions |
| Per-request cost grows with usage (LLM calls, SMS, maps) | Model cost per active user per month at 1×, 10×, 100×; cache; rate-limit free tiers |

**Rule:** don't design for 100× before you've hit 10×. Do confirm that the path to 10× doesn't need a rewrite.

### C. Security & Privacy
| Signal | Mitigation |
|--------|------------|
| Handles PII, financial, health, children's or location data | Data map (what, where, who can see it); encryption at rest and in transit; least-privilege access; retention policy |
| Multi-tenant SaaS | Tenant isolation enforced in the data layer (row-level security or scoped queries), with tests that try cross-tenant access |
| Custom auth, file uploads, user-generated HTML, webhooks from third parties | Use a managed auth vendor; scan and sandbox uploads; sanitise HTML; verify webhook signatures |
| Selling to mid-market / enterprise | Expect security questionnaires and SOC 2 asks within the first 3–5 deals; budget 3–6 months to SOC 2 Type I |
| EU / UK users, health data (HIPAA), card data (PCI), kids (COPPA), regional residency laws | Name the regulation; use vendors that sign the DPA/BAA; keep card data out of scope with a hosted checkout |
| Secrets in code, shared admin accounts, no audit trail | Secret manager, SSO for internal tools, audit logs from day one for admin actions |

### D. Vendor Lock-in & Third-Party Dependency
| Signal | Mitigation |
|--------|------------|
| One vendor holds your users, data and business logic (e.g. no-code platform, BaaS with proprietary rules) | Wrap the vendor behind an internal interface; keep a copy of core data you own; test an export |
| Critical path depends on a vendor with no SLA, or a single model provider | Second provider ready behind a flag (especially for LLMs); graceful degradation when it's down |
| Vendor pricing is per-seat/per-MAU and you plan a free tier | Model the free tier's vendor cost; negotiate or pick usage-based alternatives |
| Platform risk: building on a marketplace, app store or social API you don't control | Diversify distribution; read policy history; avoid features that rely on gray-area access |

### E. Data
| Signal | Mitigation |
|--------|------------|
| Product needs data you don't have yet (training data, listings, catalog, benchmarks) | Identify the source and licence; seed manually for the first cohort; treat data acquisition as its own workstream |
| Data quality from users or integrations is unknown | Validate on ingest; sample real data in the spike; define what "good enough" means |
| Migration from a legacy system or spreadsheets | Trial migration on a full copy early; plan dual-running and reconciliation |
| Schema expected to change a lot | Keep it in a relational DB with migrations; avoid premature event sourcing or NoSQL for "flexibility" |
| No backups / untested restores | Automated backups with point-in-time recovery; do one restore drill before launch |

### F. Team & Skills
| Signal | Mitigation |
|--------|------------|
| Non-technical founder, or one engineer doing everything | Bias to managed services and no-code; get a fractional CTO or senior advisor to review architecture once |
| Stack chosen for novelty, not team experience | Use what the team already ships fastest in, unless there's a hard reason not to |
| Key skill missing (ML, mobile, security, data engineering) | Contract the specialist for a bounded piece; pair so knowledge stays |
| Bus factor of 1 on a critical system | Documentation, a second owner, runbooks |
| Hiring plan depends on a niche stack | Prefer mainstream languages and frameworks (TypeScript, Python, Go, Postgres) |
| Agency or offshore build with no in-house owner | Keep architecture and code ownership in-house; require repo access, CI and tests from day one |

### G. AI-Specific Risks
| Signal | Mitigation |
|--------|------------|
| Output quality is "it seemed good in the demo" | Build an eval set (50–200 real examples with expected outputs) before building features; track pass rate per change |
| Hallucination would cause real harm (legal, medical, financial, customer-facing claims) | Ground with retrieval and citations; constrain output format; human review for high-stakes actions; refuse when unsure |
| Latency: multi-step agent or long-context calls | Measure p95 end-to-end; stream responses; cache; use a smaller model for simple steps |
| Unit cost: tokens per task × tasks per user unknown | Instrument token usage per feature from the first prototype; set per-user budgets; model margins at current and 50% lower prices |
| Prompt injection via user content, documents, web pages or tool outputs | Treat model inputs from third parties as untrusted; limit tool permissions; require confirmation for destructive or external actions |
| Model/provider changes break behaviour | Pin model versions; re-run evals before upgrading; keep a fallback model |
| Customer data used for training, or sent to a provider the customer hasn't approved | Use API tiers with no training on inputs; document subprocessors; offer regional or private deployment for enterprise |
| "Wrapper" risk: the model provider ships your feature | Differentiate on proprietary data, workflow integration and distribution, not on the prompt |

### H. Delivery & Integration (often missed)
| Signal | Mitigation |
|--------|------------|
| Depends on another team's or customer's system (ERP, CRM, SSO, legacy APIs) | Get sandbox access before committing dates; one integration end to end first |
| Fixed launch date with unknown scope | Fix the date, flex the scope; agree the cut list up front |
| Promised custom features to close a deal | Generalise into the product or charge for it as services; never fork the codebase per customer |
| No staging environment, no CI, no automated tests on money or data paths | Minimum: CI with tests on auth, billing and data writes; staging that mirrors production config |

---

## 3. Corporate Overlay

For the corporate profile, add these risks by default and check each:
- **Security & architecture review board:** 2–8 weeks; needs a data-flow diagram, threat model and vendor list.
- **Procurement:** new vendor onboarding 4–12 weeks; prefer vendors already on the approved list.
- **Legacy integration:** mainframe, ERP or on-prem systems with batch-only interfaces; data freshness limited to the batch window.
- **Change management:** internal users and support teams need training; adoption is a risk, not just delivery.
- **Data residency and retention policies** set by group IT or legal, not the product team.

---

## 4. Red Flags That Change the Verdict

Any one of these moves the verdict to **feasible with conditions** at best; two or more usually mean **not now**:
1. The core value depends on an unproven technical capability with no spike planned.
2. Infra or vendor cost per user exceeds the planned price per user at expected usage.
3. Regulated data with no compliance owner or budget.
4. A single external API the company doesn't control is the whole product, and its terms prohibit or restrict the use.
5. Team has none of the critical skills and no budget to hire or contract them.
6. Required timeline is less than half the low end of the effort band.
