# Skill Catalog

What each skill needs, what it produces, when to use it, and which board seat it holds. The orchestrator uses `needs` to build one consolidated intake, `produces` to avoid asking for facts an earlier step will create, `good_for` to route goals and compose custom chains, and `seat` and `board` to choose who attends a board meeting (every seat is on demand; `invite-only` seats attend only when the user asks). The seat's title for this project's profile is in the Board & Management table of PRODUCT_CONTEXT.md.

**Shared fact names** (use these when writing the brief so steps can find them): `business` (what it does), `icp`, `offer`, `pricing`, `competitors`, `stage` (revenue, team), `goal`, `channels`, `voice`, `launch_date`, `url`, `product_idea`, `features`, `tech_stack`, `audience_size`, `lead_magnet`, `proof_points`, `bottleneck`, `resources`, `process`, `constraints` (deadline, budget ceiling, regulated data, required integrations), `raise` (amount or budget ask and what it funds; for corporate also hurdle rate and cash flows), `traction` (revenue, growth, customers, retention, burn, CAC, each with its period), `retention_data` (churn, NRR, cohorts, cancel reasons), `onboarding_flow` (steps from signup to first value).

Most `business`, `icp`, `offer`, `stage`, `competitors` and `voice` facts come from PRODUCT_CONTEXT.md. Decisions already made (pricing, positioning, scope) come from PRODUCT_KNOWLEDGE.md; don't ask for them again.

---

| Skill | seat | board | needs | produces | good_for | notes |
|-------|------|-------|-------|----------|----------|-------|
| `brand-copywriter` | Brand & Messaging Director | on-demand | business, icp, offer, voice, channel or asset type, goal | 2 versions of marketing copy (different frameworks) + recommendation | landing pages, ads, emails, sales pages, product descriptions, newsletters | |
| `competitor-intel` | Head of Strategy | on-demand | competitor name (+ website) | verified metrics, 3 leverage strategies, predicted moves, competitor pricing | positioning, finding gaps, targeting a rival's customers | Needs web search. One competitor per run; use `repeat` for more. |
| `cro-optimization` | Head of Growth | on-demand | url or page HTML, page goal | audit report, critical issues, prioritised fixes, test roadmap | low conversion, landing page reviews | Needs web fetch for URLs. |
| `cto-review` | CTO | on-demand | product_idea, features, tech_stack, stage, resources, audience_size (expected year-1 volume), pricing, constraints | Technical Feasibility & Risk Review: verdict, 2-3 architecture options, build vs buy per capability, effort and cost bands, top 5 risks, 2-week spike plan, decide now vs later | feasibility checks, build vs buy, effort and infra cost, de-risking AI features, sanity-checking a PRD or a promised custom build | Best after `prd-generator` (pass the PRD as input). Flags infra or AI cost per user above 20% of price to `pricing-strategist`. |
| `customer-success` | Head of Customer Success | on-demand | business, icp, offer, pricing, stage, goal, bottleneck, resources, retention_data, onboarding_flow | Retention & Onboarding Plan: activation event and aha moment, onboarding milestones, ranked churn causes with the evidence needed, health score, top 3 retention plays, weekly metrics | churn, low activation, onboarding redesign, renewals and NRR, health scoring | Never invents churn numbers; weaker without retention_data but doesn't block. |
| `product-context` | — | — | website url (optional) | PRODUCT_CONTEXT.md with scale profile and board | first-time setup, migrating FOUNDER_CONTEXT.md, refreshing context, changing the profile | Interactive; `/founder` runs it before any playbook when the context is missing. Not a step. |
| `go-to-market-plan` | Chief Commercial Officer | on-demand | business, icp, stage, goal, channels, resources, pricing | 3 GTM strategies with playbooks, execution priority, success criteria | launches, entering a market, first customers | |
| `investor-review` | Investor / board director | on-demand | business, stage, raise, traction, pricing, competitors, goal (+ the pitch deck or plan if available) | Investor Stress-Test: 7-criterion scorecard and verdict, 10 hardest questions with strong-answer guides, deal-breakers with fixes, 3 numbers to know cold, board-paper outline (corporate) | fundraising prep, investor meetings, board or investment-committee approvals, pressure-testing a plan | Profile picks angel, lead-investor or board-director mode. Never invents metrics, so put traction in the brief. Best late in a chain or in a Board review. |
| `lead-magnet-generator` | Demand Gen Lead | on-demand | lead_magnet (what's inside, 3 to 5 benefits), platform | quick and detailed giveaway posts with hooks and CTAs | list building, warming up outreach | |
| `linkedin-writer` | Content team (LinkedIn) | invite-only | topic, goal, voice | 2 LinkedIn posts in different formats | LinkedIn content, launch announcements, thought leadership | |
| `marketing-ideas` | CMO | on-demand | business, icp, goal, resources | top 5 marketing ideas + quick-start plan | finding themes, choosing channels, idea generation | |
| `outreach-specialist` | Head of Sales | on-demand | icp/persona, channel, offer, proof_points | 3-message outreach sequence with follow-up timing | cold email, DMs, booking calls, partnerships | |
| `prd-generator` | CPO | on-demand | product_idea, icp/primary user, features, tech_stack, success metrics | PRD markdown (optional PDF) | specs, MVP scoping, handing work to AI coding tools | Reads the project files only for its persona and earlier decisions; the PRD is self-contained, so put product facts in the brief. |
| `pricing-strategist` | CFO | on-demand | business, icp, offer, stage, competitors' pricing, cost or value drivers | tiers, price points, positioning, revenue levers, biggest risk | pricing, packaging, launch offers | |
| `product-hunt-launch-plan` | Launch Lead | on-demand | product, launch_date, audience_size, assets, goal, support network | pre-launch, launch-day and post-launch plan + templates | Product Hunt and other launch platforms | |
| `sop-creator` | COO | on-demand | process, who does it, tools | step-by-step SOP | documenting processes, delegation, onboarding | Not in a playbook; route single requests to it. |
| `strategic-planning` | CEO | on-demand | business, stage, goal, bottleneck, what's been tried, resources | 3 ranked next moves with playbooks and first actions | deciding what to do next, growth plateaus | Its moves can be handed to other skills (growth-review). |
| `viral-hook-creator` | Content team (hooks) | invite-only | topic, platform, audience | hooks across proven patterns | openings for posts, threads, videos, launch messages | |
| `x-writer` | Content team (X) | invite-only | topic, goal, voice | 3 X posts in different formats | X/Twitter content, launch threads | Standalone it asks to confirm a voice; orchestrated it uses the brief's `voice`. |

---

## Composing a Custom Chain
1. Pick the skill whose `produces` is the user's final deliverable.
2. Walk backwards: for each of its `needs` that the user and PRODUCT_CONTEXT.md can't supply but another skill `produces`, add that skill as an earlier step.
3. Stop at 6 steps. Put steps with no dependencies between them in the same phase.
