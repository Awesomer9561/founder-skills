# Skill Catalog

What each skill needs, what it produces, and when to use it. The orchestrator uses `needs` to build one consolidated intake, `produces` to avoid asking for facts an earlier step will create, and `good_for` to route goals and compose custom chains.

**Shared fact names** (use these when writing the brief so steps can find them): `business` (what it does), `icp`, `offer`, `pricing`, `competitors`, `stage` (revenue, team), `goal`, `channels`, `voice`, `launch_date`, `url`, `product_idea`, `features`, `tech_stack`, `audience_size`, `lead_magnet`, `proof_points`, `bottleneck`, `resources`, `process`.

Most `business`, `icp`, `offer`, `stage`, `competitors` and `voice` facts come from FOUNDER_CONTEXT.md.

---

| Skill | needs | produces | good_for | notes |
|-------|-------|----------|----------|-------|
| `brand-copywriter` | business, icp, offer, voice, channel or asset type, goal | 2 versions of marketing copy (different frameworks) + recommendation | landing pages, ads, emails, sales pages, product descriptions, newsletters | |
| `competitor-intel` | competitor name (+ website) | verified metrics, 3 leverage strategies, predicted moves, competitor pricing | positioning, finding gaps, targeting a rival's customers | Needs web search. One competitor per run; use `repeat` for more. |
| `cro-optimization` | url or page HTML, page goal | audit report, critical issues, prioritised fixes, test roadmap | low conversion, landing page reviews | Needs web fetch for URLs. |
| `founder-context` | website url (optional) | FOUNDER_CONTEXT.md | first-time setup, refreshing business context | Interactive; run standalone before a playbook, not as a step. |
| `go-to-market-plan` | business, icp, stage, goal, channels, resources, pricing | 3 GTM strategies with playbooks, execution priority, success criteria | launches, entering a market, first customers | |
| `lead-magnet-generator` | lead_magnet (what's inside, 3 to 5 benefits), platform | quick and detailed giveaway posts with hooks and CTAs | list building, warming up outreach | |
| `linkedin-writer` | topic, goal, voice | 2 LinkedIn posts in different formats | LinkedIn content, launch announcements, thought leadership | |
| `marketing-ideas` | business, icp, goal, resources | top 5 marketing ideas + quick-start plan | finding themes, choosing channels, idea generation | |
| `outreach-specialist` | icp/persona, channel, offer, proof_points | 3-message outreach sequence with follow-up timing | cold email, DMs, booking calls, partnerships | |
| `prd-generator` | product_idea, icp/primary user, features, tech_stack, success metrics | PRD markdown (optional PDF) | specs, MVP scoping, handing work to AI coding tools | Does not read FOUNDER_CONTEXT.md, so put product facts in the brief. |
| `pricing-strategist` | business, icp, offer, stage, competitors' pricing, cost or value drivers | tiers, price points, positioning, revenue levers, biggest risk | pricing, packaging, launch offers | |
| `product-hunt-launch-plan` | product, launch_date, audience_size, assets, goal, support network | pre-launch, launch-day and post-launch plan + templates | Product Hunt and other launch platforms | |
| `sop-creator` | process, who does it, tools | step-by-step SOP | documenting processes, delegation, onboarding | Not in a playbook; route single requests to it. |
| `strategic-planning` | business, stage, goal, bottleneck, what's been tried, resources | 3 ranked next moves with playbooks and first actions | deciding what to do next, growth plateaus | Its moves can be handed to other skills (growth-review). |
| `viral-hook-creator` | topic, platform, audience | hooks across proven patterns | openings for posts, threads, videos, launch messages | |
| `x-writer` | topic, goal, voice | 3 X posts in different formats | X/Twitter content, launch threads | Standalone it asks to confirm a voice; orchestrated it uses the brief's `voice`. |

---

## Composing a Custom Chain
1. Pick the skill whose `produces` is the user's final deliverable.
2. Walk backwards: for each of its `needs` that the user and FOUNDER_CONTEXT.md can't supply but another skill `produces`, add that skill as an earlier step.
3. Stop at 6 steps. Put steps with no dependencies between them in the same phase.
