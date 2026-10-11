# Estimation Heuristics

How to produce honest effort and cost *bands* (not point estimates), design a 2-week spike, and adjust for the scale profile.

All figures are planning ranges for a competent team using mainstream tools and managed services. Always present a low–high band and the assumption that moves it.

---

## 1. Estimation Rules

1. **Bands, not points.** Give low and high. The ratio between them shows confidence: 1.5× = well understood, 2–3× = normal for new product work, > 3× = an unknown that needs a spike first.
2. **Estimate in person-weeks** (one person, one focused week ≈ 4 productive days). Convert to calendar time with the team size and the parallelism factor below.
3. **Decompose to capabilities,** estimate each, then add the overhead lines. Never estimate the whole product in one number.
4. **Add the overhead nobody lists:** integration and testing (+20–30%), deployment and environments (+5–10%), design/product back-and-forth (+10–20%), bug fixing after first users (+15–25%).
5. **Unknowns get a range of 3× or a spike,** not a guess.
6. **Brooks check:** doubling headcount does not halve calendar time. Two people ≈ 1.7×, four ≈ 2.8–3×, eight ≈ 4–5× the throughput of one, if work splits cleanly.
7. **AI coding assistants** speed up boilerplate, CRUD and tests (often 1.3–2× on those parts) but not unknowns, integration debugging, design decisions or reviews. Apply the speed-up only to the well-understood portion.

---

## 2. Effort Bands by Capability

Person-weeks for a first production version (not a demo), using managed services where available.

| Capability | Using a vendor / no-code | Custom build | What moves it to the high end |
|------------|--------------------------|--------------|-------------------------------|
| Auth (email + social login) | 0.5–1 | 2–4 | SSO/SAML, roles & permissions, multi-org accounts |
| Roles, permissions, multi-tenant orgs | 1–2 | 2–5 | Fine-grained permissions, audit log |
| Payments & subscriptions | 1–2 | 4–8 | Usage-based billing, proration, tax, invoicing, dunning |
| CRUD app core (5–10 entities, forms, lists) | 1–3 (no-code) | 3–6 | Complex validation, offline, real-time collaboration |
| Admin / back-office | 0.5–1 (Retool etc.) | 2–4 | Customer-facing admin, audit requirements |
| Transactional email & notifications | 0.5–1 | 1–3 | Preference centre, digests, multi-channel |
| Search | 0.5–1 (Postgres FTS / hosted) | 2–6 | Relevance tuning, facets, typo tolerance, personalisation |
| File upload & media processing | 0.5–1 | 2–4 | Video transcoding, large files, virus scanning |
| Third-party integration (one well-documented API) | 1–2 | 1–3 | OAuth, webhooks, sync conflicts, poor docs, rate limits |
| Legacy / enterprise integration (ERP, mainframe, SOAP) | — | 4–12 | Batch interfaces, no sandbox, change boards |
| Analytics events + basic dashboards | 0.5–1 | 2–4 | Customer-facing reporting, exports |
| Mobile app (cross-platform, wrapping existing API) | 3–6 (FlutterFlow etc.) | 6–12 | Offline, background tasks, native integrations, store review |
| LLM feature (single call, prompt + UI) | 1–2 | 2–4 | Evals, guardrails, streaming, cost controls |
| RAG over customer documents | 2–3 | 4–8 | Many file types, permissions-aware retrieval, citations, freshness |
| Agentic workflow (multi-step, tool use) | — | 6–14 | Reliability targets, human-in-the-loop, irreversible actions |
| Real-time collaboration (multiplayer editing) | 2–4 (Liveblocks etc.) | 8–20 | Conflict resolution, offline merge |
| Data pipeline / ETL to warehouse | 1–2 (Fivetran/Airbyte) | 3–8 | Many sources, transformations, data quality |
| SOC 2 readiness (with compliance automation) | 6–12 engineering weeks spread over 3–6 months | — | No existing policies, many vendors, on-prem components |
| CI/CD, environments, monitoring baseline | 0.5–1 | 1–3 | Multi-region, infra as code from scratch |

### Typical totals (first launchable version)
| Scope | Bootstrapped (no-code / managed) | Startup (small team, custom code) | Corporate (incl. reviews & integration) |
|-------|----------------------------------|-----------------------------------|------------------------------------------|
| Landing page + waitlist + payments | 0.5–1 pw | 1–2 pw | 3–6 pw |
| Simple SaaS MVP (auth, core CRUD, billing, email) | 3–6 pw | 8–16 pw | 20–40 pw |
| Marketplace (two-sided, payments, search, messaging) | 6–10 pw | 16–30 pw | 40–80 pw |
| AI-first product (RAG or agent + app shell) | 4–8 pw | 12–24 pw | 30–60 pw |
| New feature in an existing product | 1–3 pw | 2–8 pw | 6–20 pw |

Calendar time = person-weeks ÷ (team size × parallelism factor from section 1) + review/approval waits.

---

## 3. Infrastructure Cost Bands ($/month)

For a typical web SaaS on managed services. Excludes salaries and per-transaction fees (payments, SMS).

| Scale | Users (MAU) | Typical stack | Infra $/month | Main cost drivers |
|-------|-------------|---------------|---------------|-------------------|
| **Prototype** | < 100 | Free tiers (Vercel/Netlify, Supabase/Neon, Resend, PostHog) | $0–$50 | Domain, one paid tool |
| **Early** | 100–1K | Paid hobby/pro tiers, one managed DB | $50–$300 | DB, hosting, monitoring, auth beyond free tier |
| **Traction** | 1K–10K | Production DB with backups/HA, queue, CDN, error tracking | $300–$2,000 | DB size/HA, logs, vendor per-MAU pricing |
| **Growth** | 10K–100K | Read replicas, caching, separate workers, analytics store | $2,000–$15,000 | Compute, data transfer, observability, per-seat vendor tools |
| **Scale** | 100K+ | Multi-region or dedicated infra, platform team | $15,000–$100,000+ | Everything; negotiate committed-use discounts |

**Multipliers:**
| Factor | Multiply infra band by |
|--------|------------------------|
| Heavy media (video, large images) | 2–5× (storage, transcoding, egress) |
| Real-time features (websockets, presence) | 1.5–2× |
| Enterprise requirements (SSO tier, audit logs, dedicated tenancy, residency) | 1.5–3× for vendor tiers |
| Kubernetes / self-managed infra instead of PaaS | 0.5–0.7× raw cost, but + 0.5–1 FTE to run it |
| No-code platform at traction scale | 1.5–3× vs equivalent custom stack (per-task / per-row pricing) |

### AI / LLM cost model
Never quote a flat number. Compute:
```
monthly LLM cost = active users × tasks per user per month × (input tokens + output tokens per task) × price per token × retry/overhead factor (1.3–2×)
```
- A short chat turn is roughly 1–3K tokens in, 200–800 out; a RAG answer with retrieved context 4–15K in; an agent task can be 20–200K+ tokens across steps.
- Express the result as **AI cost per active user per month** and compare it to price per user. Target AI cost ≤ 10–20% of revenue per user for healthy SaaS gross margin (70%+).
- Model the same at a cheaper/smaller model and with caching; most products route simple steps to a smaller model.
- Use the provider's current published prices at the time of the review; they change often.

### Unit-economics check
**Infra + vendor cost per paying customer should be ≤ 10–20% of price per customer** for a SaaS business. If it's higher at expected usage, flag it to `pricing-strategist` (usage limits, tiers or metering) before building.

---

## 4. People Cost Bands

Use to turn person-weeks into money. Fully loaded = salary + taxes + benefits + equipment, roughly 1.2–1.4× base salary.

| Resource | Weekly cost band (USD) | Notes |
|----------|------------------------|-------|
| Founder's own time (bootstrapped) | $0 cash, but count the weeks | The real cost is months of runway |
| Freelancer / contractor (offshore) | $800–$2,500 | Needs a clear spec and an in-house reviewer |
| Freelancer / contractor (US/EU senior) | $3,000–$7,500 | |
| Agency | $4,000–$12,000 per person-week | Includes PM overhead; watch for scope creep change orders |
| In-house engineer (US, fully loaded) | $3,000–$5,000 | $150–250K/year |
| In-house engineer (EU / other markets) | $1,500–$3,500 | Varies widely by country |
| Corporate internal cost rate | $2,500–$6,000 | Use the company's internal day rate if known |

Adjust to the user's market if `PRODUCT_CONTEXT.md` or the user says where the team is.

---

## 5. Designing the 2-Week Spike

A spike is a time-boxed experiment that retires one risk. It produces a decision, not production code.

### Structure
| Element | What to write |
|---------|---------------|
| **Risk it retires** | One risk from the top-5 list, quoted |
| **Question** | A yes/no or numeric question: "Can we get p95 answer latency < 4s with citations on 200 real customer documents?" |
| **Success threshold** | The number that means "go": "≥ 85% of eval answers rated correct; p95 < 4s; cost < $0.03/answer" |
| **Kill / pivot threshold** | The number that means "change approach": "< 70% correct after two prompt/retrieval iterations" |
| **Scope** | Thinnest end-to-end slice on real (or realistic) data; no polish, no auth, no UI beyond what the test needs |
| **Who** | Named people and % time; one owner |
| **Days 1–2** | Setup, data, eval harness or load-test rig; write down the thresholds before building |
| **Days 3–7** | Build the slice; first measurement by day 5 |
| **Days 8–9** | Iterate on the weakest result; try the fallback approach if the main one is below threshold |
| **Day 10** | Write-up: results vs thresholds, decision (go / change approach / stop), updated effort band |
| **Cost** | Person-weeks × weekly rate + any vendor/API spend (usually small; cap it) |

### Spike rules
- **One risk per spike.** If two risks are tied, pick the one that invalidates more work if it goes badly.
- **Thresholds written before day 3.** Otherwise the result gets rationalised.
- **Throw the code away** or explicitly label it prototype. Don't let a spike become production by default.
- **Output narrows the effort band.** A good spike turns a 3× range into a 1.5× range.
- **No spike needed** when every top risk scores ≤ 4; say so and go straight to build.

### Spike templates by risk type
| Risk type | Spike shape |
|-----------|-------------|
| AI quality | Eval set of 50–200 real examples, baseline prompt, 2–3 iterations, measure pass rate, latency, cost per task |
| Performance / scale | Load test the critical path at 3× expected peak with production-like data volume |
| Third-party API | End-to-end integration against the real API: auth, rate limits, webhooks, error cases; confirm terms |
| Legacy integration | Read and write one real record through the legacy interface in a sandbox; measure data freshness |
| Data availability | Acquire and clean a sample of the data for the first 10 customers; measure coverage and quality |
| Cost | Instrument a prototype; run a realistic usage script; compute cost per active user per month |
| Team skill | Pair the team with a contractor or advisor on the slice; judge whether the team can own it after |
| Demand (non-technical but blocks everything) | Fake-door or concierge test instead of building; hand back to `go-to-market-plan` |

---

## 6. Profile Adjustments

| Dimension | Bootstrapped | Startup | Corporate |
|-----------|--------------|---------|-----------|
| **Who builds** | Founder + no-code/low-code, maybe one freelancer | 2–6 engineers, maybe a contractor | Internal team or approved vendor, plus platform/security/IT |
| **Estimation unit** | Founder weekends/weeks and $ of tools per month | Person-weeks and burn | Person-weeks, internal cost rate, and TCO over 3 years |
| **Optimise for** | Lowest monthly bill and fastest path to first revenue | Speed to learning and next funding milestone, with tech debt you can pay down | Integration fit, compliance, risk and total cost of ownership |
| **Overhead to add** | +10–20% (context switching, learning tools) | +30–50% (integration, testing, bug fixes, hiring/onboarding drag) | +60–150% (reviews, procurement, change boards, environments, documentation) |
| **Approval waits** | None | Investor or co-founder alignment | Architecture review 2–8 weeks, security 2–6 weeks, procurement 4–12 weeks per new vendor |
| **Acceptable tech debt** | High; rewrite after revenue | Moderate; logged, with a paydown trigger | Low; must meet standards before go-live |
| **Infra budget signal** | Keep under $100–$300/mo until revenue | Infra ≤ 10–15% of burn early; ≤ 20% of revenue later | Fit to the cost centre's budget; prefer existing enterprise agreements |
| **Spike staffing** | Founder 2 weeks, or $2–5K freelancer | 1–2 engineers for 2 weeks | Small cross-functional team incl. security/architecture reviewer |
| **"Not now" usually means** | Costs more per month than it earns, or needs skills the founder can't buy | Doesn't move the next milestone, or needs a platform rebuild first | Can't pass review in the window, or duplicates an existing system |
