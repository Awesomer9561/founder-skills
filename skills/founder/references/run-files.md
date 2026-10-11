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

---

## brief.md

```markdown
# Brief: <run id>

**Playbook:** <playbook id>
**Goal:** <the user's goal in their own words>
**Created:** YYYY-MM-DD

## Business Snapshot
<5 to 10 bullets summarised from FOUNDER_CONTEXT.md: business, ICP, offer, stage, competitors, voice. Write "No FOUNDER_CONTEXT.md" if missing.>

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
<Answers to blocking questions, appended as they come in.>
```

---

## plan.md

```markdown
# Plan: <run id>

**Playbook:** <playbook id> · **Mode:** phase-by-phase | run-all · **Skills root:** <SKILLS_ROOT>

| # | Phase | Skill | depends_on | Output | Status | Result |
|---|-------|-------|-----------|--------|--------|--------|
| 01a | 1 · Research | competitor-intel (Linear) | — | 01a-competitor-intel.md | complete | No free tier, slow onboarding |
| 02 | 1 · Research | pricing-strategist | 01a | 02-pricing-strategist.md | running | |
| 03 | 2 · Strategy | go-to-market-plan | 01a, 02 | 03-go-to-market-plan.md | pending | |

Statuses: pending · running · complete · partial · blocked · failed · stale · skipped

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

## Context Updates Applied
<Facts written to FOUNDER_CONTEXT.md, or "None".>
```
