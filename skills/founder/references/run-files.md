# Run Files

Every run lives in `./founder_outputs/runs/<run id>/`:

```
founder_outputs/runs/2026-10-11-launch/
├── brief.md                     # shared input for every step
├── plan.md                      # steps and their status (used by resume)
├── 01a-competitor-intel.md      # one output per step, with a front matter header
├── 02-pricing-strategist.md
├── ...
└── SUMMARY.md                   # final digest
```

A board meeting (or a Board review phase) adds:

```
founder_outputs/runs/2026-10-11-board-meeting/
├── items/                       # one position memo per seat per round
│   ├── 1-r1-pricing-strategist.md
│   ├── 1-r1-marketing-ideas.md
│   ├── 1-r2-pricing-strategist.md
│   └── ...
└── transcript.md                # chair's synthesis per item (written only by the chair)
```

Project-level files live in the project root, not in the run: `PRODUCT_CONTEXT.md` (what we do) and `PRODUCT_KNOWLEDGE.md` (how we do it). The orchestrator merges each phase's decisions into `PRODUCT_KNOWLEDGE.md`.

---

## brief.md

```markdown
# Brief: <run id>

**Playbook:** <playbook id>
**Goal:** <the user's goal in their own words>
**Profile:** <bootstrapped | startup | corporate>
**Created:** YYYY-MM-DD

## Business Snapshot
<5 to 10 bullets summarised from PRODUCT_CONTEXT.md: business, product idea, ICP, offer, stage, competitors, voice.>

## Decisions Already Made
<Active decisions from PRODUCT_KNOWLEDGE.md that this run must respect, with their IDs. Write "None yet" if the file is missing or empty.>

## Facts
<One bullet per fact, using the shared fact names from skill-catalog.md. Copy the user's intake answers verbatim.>
- launch_date: 2026-11-04
- channels: X, LinkedIn
- voice: Ognjen Gatalo

## Constraints
<Budget, time, team, things to avoid.>

## Deliverables
<One line per step: what it should produce and anything specific the user asked for.>

## Answers added during the run
<Answers to blocking questions and the founder's notes from board checkpoints, appended as they come in.>
```

**Board meetings** add an Agenda section after Constraints, instead of Deliverables:

```markdown
## Agenda
### Item 1 · Should we add a free tier? (decide)
- **Options on the table:** free tier with 3 projects · 14-day trial · neither
- **Seats:** CFO (pricing-strategist): revenue per user and runway · CMO (marketing-ideas): signup volume · Head of CS (customer-success): support load from free users · CTO (cto-review): infra cost per free user
- **Deadline:** before the November pricing page update
```

---

## plan.md

```markdown
# Plan: <run id>

**Playbook:** <playbook id> · **Profile:** <profile> · **Mode:** phase-by-phase | run-all · **Skills root:** <SKILLS_ROOT>

| # | Phase | Skill | depends_on | Output | Status | Result |
|---|-------|-------|-----------|--------|--------|--------|
| 01a | 1 · Research | competitor-intel (Linear) | — | 01a-competitor-intel.md | complete | No free tier, slow onboarding |
| 02 | 1 · Research | pricing-strategist | 01a | 02-pricing-strategist.md | running | |
| 03 | 2 · Strategy | go-to-market-plan | 01a, 02 | 03-go-to-market-plan.md | pending | |

Statuses: pending · running · complete · partial · blocked · failed · stale · skipped

Board phases expand into one row per seat per round, plus the chair's synthesis:

| # | Phase | Skill | depends_on | Output | Status | Result |
|---|-------|-------|-----------|--------|--------|--------|
| 11a | 1 · Free tier? | pricing-strategist (CFO) · board r1 | — | items/1-r1-pricing-strategist.md | complete | Oppose: halves ARPU |
| 11b | 1 · Free tier? | marketing-ideas (CMO) · board r1 | — | items/1-r1-marketing-ideas.md | complete | Support: 2x signups |
| 12a | 1 · Free tier? | pricing-strategist (CFO) · board r2 | 11a, 11b | items/1-r2-pricing-strategist.md | running | |
| 1S | 1 · Free tier? | (chair) synthesis | 12a, 12b | transcript.md#item-1 | pending | |

## Log
- YYYY-MM-DD HH:MM — <step skipped / redone with feedback / failed, and why>
```

---

## SUMMARY.md

```markdown
# Summary: <run id>

**Goal:** <goal>
**Playbook:** <playbook id> · **Completed:** YYYY-MM-DD

## Deliverables
| Step | Output | In one line |
|------|--------|-------------|
| Competitor intel (Linear) | [01a-competitor-intel.md](01a-competitor-intel.md) | ... |

## Key Decisions
<The facts that tie the outputs together: positioning, ICP, price points, launch date, channels, core message. Call out any conflict between steps.>

## Next 7 Days
| When | Action | From |
|------|--------|------|
| Today | ... | 03-go-to-market-plan |

## Assumptions
<Merged from every step's `assumptions`, without duplicates.>

## Open Questions
<Anything unresolved that the user should decide.>

## Knowledge Updates
<Decisions added to PRODUCT_KNOWLEDGE.md (with IDs), and any they superseded.>

## Context Updates Applied
<Facts written to PRODUCT_CONTEXT.md, or "None".>
```

---

## SUMMARY.md for a board meeting (the minutes)

```markdown
# Minutes: <run id>

**Question:** <the user's goal> · **Profile:** <profile> · **Held:** YYYY-MM-DD
**Seats:** <seat (skill), ...>

## Decisions
| Item | Decision | How | Stance (support / conditional / oppose) | Knowledge ID |
|------|----------|-----|------------------------------------------|--------------|
| 1 · Free tier? | 14-day trial, no free tier | Accepted | 2 / 1 / 1 | D-012 |

## Dissent on Record
> <verbatim strongest objection per decided item> (Seat)

## Conditions & Kill Criteria
<Per decision, from transcript.md.>

## Action Items
| Action | Owner seat | Skill to run | Due | Depends on |
|--------|-----------|--------------|-----|------------|

## For a pitch-review
<The 10 hardest questions with what a strong answer includes, the weakest points to fix, and for corporate a board-paper outline. Omit this section otherwise.>

## Parked & Open Questions
<Parked items with the reason, and unresolved questions.>

## Knowledge Updates
<Decisions, owners, dependencies and the Discussions row added to PRODUCT_KNOWLEDGE.md.>

## Context Updates Applied
<Facts written to PRODUCT_CONTEXT.md, or "None".>

Full debate: [transcript.md](transcript.md)
```
