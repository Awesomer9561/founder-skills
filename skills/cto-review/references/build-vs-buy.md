# Build vs Buy

How to decide, capability by capability, whether to build in-house, buy a managed service, integrate open source, or skip the capability for now.

Vendor names and prices below are reference points, not endorsements. Prices are approximate list prices at small scale and change often: quote them as bands and tell the user to confirm current pricing before committing.

---

## 1. The Default Rule

**Buy everything that isn't the reason customers pay you.** Build only the capability that is the product's differentiator, and only once you've proven customers want it.

Ask of every capability: *"If a competitor used the same vendor for this, would customers notice?"* If no, buy it.

---

## 2. Decision Matrix

Score each capability 1 (low) to 3 (high) on the six criteria. Add the scores.

| Criterion | 1 | 2 | 3 |
|-----------|---|---|---|
| **Differentiation:** is this why customers choose us? | Commodity, nobody notices | Shapes UX but not the core promise | It *is* the core promise |
| **Fit of off-the-shelf options** (inverted: 3 = poor fit) | A vendor does 90%+ of what we need | Vendor does 60–90%, workarounds needed | Nothing fits; we'd fight the vendor |
| **Data sensitivity / control** | Public or low-risk data | Customer PII, standard compliance | Regulated data (health, payments, children), residency rules, or data is the moat |
| **Unit economics at target scale** | Vendor cost < 5% of revenue | 5–15% of revenue | > 15% of revenue, or cost grows faster than revenue |
| **Team ability to build and run it** | No one has done it before | Someone has done it adjacent | Team has shipped and operated this before |
| **Change rate** | Stable, rarely changes | Changes quarterly | Changes weekly as we learn |

| Total | Recommendation |
|-------|----------------|
| 6–9 | **Buy** (managed SaaS or API) |
| 10–13 | **Integrate** (open source, self-hosted or a vendor with an escape hatch) or **buy now, plan to build** with a named trigger |
| 14–18 | **Build**, but start from proven libraries, not a blank file |

**Override rules (these beat the score):**
- Pre-product-market-fit: buy unless the capability is the product. Speed of learning beats cost.
- Compliance-heavy capability (payments card data, auth credentials, HIPAA storage): buy from a certified vendor unless the team has done the certification before. Never store raw card numbers.
- If the vendor's cost would exceed one engineer's fully loaded salary per year (~$150–250K in the US), re-run the matrix with a build estimate.
- If a single vendor outage takes the whole product down, require an exit plan (see section 5) even when the answer is "buy".

---

## 3. Options by Capability

| Capability | Buy (managed) | Integrate (OSS / self-host) | Build when… | Small-scale cost band |
|------------|---------------|-----------------------------|-------------|------------------------|
| **Auth & identity** | Clerk, Auth0, WorkOS (enterprise SSO), Supabase Auth, Firebase Auth, AWS Cognito | Keycloak, Ory, Authentik, Lucia/Auth.js libraries | Almost never. Only if identity is the product. | $0–$100/mo to ~10K MAU; enterprise SSO $100–$500+/mo per connection tier |
| **Payments & billing** | Stripe (Billing, Checkout), Paddle / Lemon Squeezy (merchant of record, handles VAT/sales tax), Chargebee | Kill Bill, Lago (usage billing) | Never build card processing. Build only custom usage metering on top of a billing vendor. | 2.9% + 30¢ per card txn (US); MoR ~5% + fees; billing add-ons 0.5–0.8% |
| **Email (transactional)** | Postmark, Resend, SendGrid, Amazon SES | Postal (self-host, hard to keep deliverable) | Never. Deliverability is a full-time job. | $0–$20/mo to ~50K emails; SES ~$0.10 per 1K |
| **Email (marketing)** | Customer.io, Loops, Mailchimp, Kit (ConvertKit) | Listmonk | Never. | $0–$150/mo for <10K contacts |
| **Search** | Algolia, Typesense Cloud, Elastic Cloud, Meilisearch Cloud | Postgres full-text / pg_trgm, Meilisearch, Typesense, OpenSearch | Search ranking *is* the product (marketplaces, discovery). | Postgres FTS free to ~1M rows; managed $0–$300/mo at small scale |
| **Product analytics** | PostHog, Mixpanel, Amplitude | PostHog self-host, Plausible / Umami (web) | Never for event plumbing; build only custom in-product reporting customers see. | Free tiers to ~1M events/mo; then $0.00005–$0.0003 per event |
| **Error & performance monitoring** | Sentry, Datadog, Better Stack, Grafana Cloud | GlitchTip, self-hosted Grafana stack | Never. | $0–$100/mo small; Datadog grows fast with hosts and logs |
| **AI / LLM** | Hosted model APIs (Anthropic, OpenAI, Google), cloud-hosted (Bedrock, Vertex, Azure) | Open-weight models on managed GPU (Together, Fireworks, Replicate) or self-hosted vLLM | Fine-tuning or self-hosting only when volume makes API cost > 15% of revenue, or data cannot leave your network. Build the prompts, evals and orchestration; buy the model. | Highly variable: estimate tokens per task × tasks per month × current per-token price; budget a 2–3× buffer for retries and context growth |
| **Vector search / RAG store** | Pinecone, Turbopuffer, managed Weaviate/Qdrant | pgvector on existing Postgres, Qdrant, Chroma | Rarely. pgvector covers most needs under ~5M vectors. | pgvector free on existing DB; managed $0–$100/mo small |
| **File storage & media** | S3 / R2 / GCS + CDN, Cloudinary, Mux (video), Uploadthing | MinIO, imgproxy | Never for storage; build only domain-specific processing. | Object storage ~$0.015–0.023/GB/mo; R2 has no egress fees; video $ per minute delivered |
| **Notifications (push/SMS/in-app)** | Twilio, OneSignal, Knock, Novu Cloud | Novu self-host | Never for delivery; build the preference logic if it's unusual. | SMS ~$0.008–0.05 per message (US, varies hugely by country); push free–$100/mo |
| **Background jobs & workflows** | Inngest, Trigger.dev, Temporal Cloud, cloud queues (SQS, Cloud Tasks) | BullMQ, Sidekiq, Celery, Temporal OSS | Simple cron/queue: use the framework's built-in. Build orchestration only if it's the product. | $0–$50/mo small |
| **Database** | Managed Postgres (Supabase, Neon, RDS, Cloud SQL), PlanetScale, Firebase/Firestore | Self-host Postgres on a VM | Never self-manage a production DB before you have someone on call. | $0–$50/mo hobby; $50–$500/mo production with HA |
| **Hosting & deploy** | Vercel, Netlify, Render, Railway, Fly.io, Cloud Run, Heroku | Kubernetes, Coolify, Dokku on VMs | Kubernetes only with a platform engineer and a real multi-service need. | $0–$100/mo small; PaaS premium is ~2–4× raw compute at scale |
| **Feature flags & experiments** | LaunchDarkly, Statsig, PostHog flags, GrowthBook Cloud | GrowthBook, Unleash, Flagsmith | Simple boolean flags in config are fine early. | $0–$100/mo small; LaunchDarkly gets expensive per seat |
| **Customer support / chat** | Intercom, Zendesk, Help Scout, Crisp, Plain | Chatwoot | Never. | $0–$100/mo per few seats |
| **CMS / content** | Sanity, Contentful, Webflow, Framer | Strapi, Payload, Directus | Only for unusual content models. | $0–$100/mo small |
| **Admin / internal tools** | Retool, Appsmith Cloud, Airtable interfaces, Supabase Studio | Appsmith, Tooljet | When admin is customer-facing or needs strict audit. | $0–$50 per builder/mo |
| **Maps & geo** | Google Maps Platform, Mapbox | OpenStreetMap + MapLibre, PostGIS | Routing/geo logic that is the product. | Free monthly credit, then $ per 1K loads |
| **Documents / e-signature / PDF** | DocuSign, Dropbox Sign, PandaDoc, DocRaptor | Gotenberg, Puppeteer, react-pdf | Simple PDF generation is fine in-house. | $0–$100/mo small |
| **Compliance automation (SOC 2 etc.)** | Vanta, Drata, Secureframe | — | Never. | ~$7–25K/yr plus auditor $10–40K |

**No-code / low-code stack for bootstrapped builders:** Bubble, Softr, Glide, FlutterFlow, Webflow + Memberstack, Airtable, Zapier / Make / n8n. Good to prove demand and serve the first 100–1,000 users. Plan the exit when: per-task automation cost passes ~$300/mo, page load or workflow limits hurt conversion, or a buyer asks for SSO / data export / audit logs the platform can't give.

---

## 4. Hidden Costs

Vendor sticker price is rarely the real cost. Check each of these before saying "buy" or "build".

### When buying
| Hidden cost | What to check | Rule of thumb |
|-------------|---------------|---------------|
| **Price cliffs** | Free tier limits, per-MAU / per-seat / per-event pricing, "contact sales" thresholds | Model cost at 1×, 10× and 100× current volume. If 100× costs more than 10% of revenue at that scale, flag it. |
| **Integration effort** | SDK quality, webhooks, data model mismatch | Even a "drop-in" vendor takes 2–10 engineer-days to integrate properly (errors, retries, tests). |
| **Egress & data export** | Can you export all your data in a usable format? Egress fees? | No bulk export = lock-in. Treat it as a risk. |
| **Enterprise tax** | SSO, audit logs, SLAs, data residency often locked behind top tiers | The first enterprise customer can 3–10× a vendor bill overnight. |
| **Compliance scope** | Does the vendor have SOC 2 / ISO 27001 / HIPAA BAA / GDPR DPA? | Every vendor touching customer data appears in your own security questionnaires. |
| **Rate limits & quotas** | Requests per second, concurrent jobs, token limits | Find the limit you'll hit first and the cost to raise it. |
| **Vendor risk** | Funding, size, acquisition risk, deprecation history | A seed-stage vendor in your critical path needs an exit plan. |

### When building
| Hidden cost | Rule of thumb |
|-------------|---------------|
| **Maintenance** | 15–25% of the initial build effort *per year*, forever. A 10-week build costs 1.5–2.5 weeks a year to keep alive. |
| **Operations / on-call** | Anything stateful needs monitoring, backups, upgrades and someone to wake up. Budget 0.1–0.25 FTE per self-run stateful system. |
| **Security & compliance** | Self-built auth, payments or file handling adds pen-test scope and audit evidence. |
| **Opportunity cost** | Every engineer-week here is a week not spent on the differentiator. Price it as (weeks × fully loaded weekly cost) + delay to the next customer-facing release. |
| **Knowledge concentration** | If one person built it, the bus factor is 1. Budget documentation and a second owner. |
| **Edge cases** | The first 80% takes 20% of the time. Auth, billing, email and search are almost all edge cases. |

### Total cost of ownership (3-year view)
```
Buy TCO   = (subscription × 36) + integration effort + migration-out reserve (≈ integration effort × 2)
Build TCO = initial build + (maintenance 20% × 3 years) + infra × 36 + on-call share + opportunity cost
```
Compare at the *expected* scale in year 2, not today's scale.

---

## 5. Exit Plans (Making "Buy" Safe)

For any vendor in the critical path:
1. **Wrap it:** call the vendor through one internal module or interface so swapping touches one place.
2. **Own the data:** keep a copy of the source of truth (users, subscriptions, content) in your own database; sync from the vendor via webhooks.
3. **Name the trigger:** write down the condition that triggers migration ("auth bill > $1K/mo", "need on-prem deployment", "vendor raises price > 30%").
4. **Know the alternative:** name the second-choice vendor or OSS option now.
5. **Test export once:** do a real data export in the first month.

---

## 6. Profile Adjustments

| Profile | Bias | Typical answer |
|---------|------|----------------|
| **Bootstrapped** | Buy and no-code aggressively; free tiers first; minimise fixed monthly bills; avoid anything that needs on-call | "Use Supabase + Stripe + Resend + a no-code front end; revisit at $5K MRR." |
| **Startup** | Buy commodity, build the differentiator; prefer vendors with usage pricing that scales down and an export path; avoid platform rebuilds before Series A | "Buy auth and billing, build the matching engine, put pgvector on the existing Postgres." |
| **Corporate** | Reuse approved enterprise vendors and existing platforms first; procurement and security review add 4–12 weeks per new vendor; TCO and integration with legacy systems dominate | "Extend the existing Okta and Salesforce; buy only from the approved vendor list; build the integration layer." |
