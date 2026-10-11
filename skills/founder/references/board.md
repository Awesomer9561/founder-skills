# Board Meetings

How the chair (the orchestrator) runs the `board-meeting` playbook and the optional Board review phase. The seats are founder-suite skills speaking as their personas (each skill's `## Persona`, and its row in PRODUCT_CONTEXT.md's Board & Management table). They debate through files in the run folder; the chair is the only one who writes `brief.md`, `plan.md`, `transcript.md`, `SUMMARY.md` and `PRODUCT_KNOWLEDGE.md`.

---

## Profiles

The profile comes from PRODUCT_CONTEXT.md and goes into every handoff. Never change it during a meeting; `/founder profile <x>` does that.

| Profile | Table cap | How the chair frames the meeting | Money framing in the synthesis |
|---------|-----------|----------------------------------|--------------------------------|
| `bootstrapped` | 4 seats | Plain language, no jargon. Favour options that can be tested this week for under $100. Kill criteria in days and dollars. | Own savings, months of personal runway, monthly bills |
| `startup` | 5 seats | Growth vs burn. Tie decisions to the next fundraising milestone. | Burn, runway, CAC payback, ARR impact |
| `corporate` | 6 seats | A board or investment committee. Decisions need a business case, risks to the core business and an owner. | Budget ask, NPV and payback period, cannibalisation, risk |

---

## Formats

| Format | Use when | Round 1 asks each seat for | Synthesis must include |
|--------|----------|----------------------------|------------------------|
| `explore` | The options aren't known yet | 2 options from their lens, ranked | A shortlist of up to 3 options, with what to learn before deciding |
| `decide` | The options are on the table | A stance on each option | One recommendation, the stance table, conditions and kill criteria |
| `pitch-review` | The founder is about to pitch real investors or a board | The hardest question their seat would ask, and the weakest point of the pitch | The 10 hardest questions with what a strong answer includes, the weakest points to fix, and for `corporate` a board-paper outline |

---

## Choosing Seats

- Seat for the question, not for the org chart. "Should we add a free tier?" needs the CFO (`pricing-strategist`), CMO (`marketing-ideas`), Head of CS (`customer-success`) and maybe CTO (`cto-review`, for infra cost). It doesn't need the COO.
- Seat at least one natural opponent. The Persona's **Pushes back on** line names them. A board that agrees on round 1 wasn't seated well.
- Prefer seats whose Board row exists in PRODUCT_CONTEXT.md. If a needed skill isn't installed, say so and seat without it.
- `invite-only` seats (content team) attend only when the user asks.
- Show each seat with a one-line reason in the plan: `CFO (pricing-strategist): a free tier changes revenue per user and runway`.

---

## Running a Round

Every seat step is a normal Step 7 step with a board handoff:

```
FOUNDER_RUN
run: <run id>
profile: <profile>
mode: board
item: <N> · <question> (format: <format>)
round: <1 | 2 | 3>
peers: <the other seats' skill names on this item>
brief: founder_outputs/runs/<run id>/brief.md
inputs: <round 1: empty, or the run's outputs for a Board review · later rounds: every earlier round's files for this item>
output: founder_outputs/runs/<run id>/items/<N>-r<round>-<skill>.md
task: <the step's task>
```

- **Launching seats:** every Agent call for a seat **must** pass `name: <skill>` (e.g. `name: pricing-strategist`), plus the `founder-step` agent type as in Step 7. The name is what makes a seat a teammate when agent teams are enabled, and what lets you message it again next round. Never launch a seat without it.
- **Word limits:** seats have a hard limit (250 words in round 1, 150 after). If a memo is more than twice its limit, send it back once with "Cut this to <limit> words, keeping your stance and challenges" before you synthesise.
- **Later rounds:** if the seat's named agent from an earlier round is still available, send it the new handoff with SendMessage instead of launching a new one. It keeps its own memory of the debate. If that fails, launch a fresh one; the files in `inputs` carry everything it needs.
- **Peer challenges:** in round 2, when seats are live teammates, they may message each other directly (one challenge each per round). Otherwise the chair relays: after round 1, name the sharpest disagreement for each seat in its round 2 `task` ("The CMO says a free tier doubles signups; respond to that").
- **No subagents (Claude.ai):** run each seat yourself, one at a time, following its skill's Board Mode. Write round 1 positions before reading any other seat's round 1 file.

---

## Chair Synthesis (the `S` step)

After the last round of an item, read every position file for that item and append to `transcript.md`:

```markdown
## Item <N> · <question>
**Format:** <format> · **Seats:** <seat (skill), ...> · **Rounds:** <n>

### Positions
| Seat | Round 1 | Final stance | Moved because |
|------|---------|--------------|---------------|
| CFO (pricing-strategist) | Oppose | Conditional | CTO showed infra cost per free user is under $0.20 |

### Options Considered
- <option>: <one line on the case for and against>

### Recommendation
<One paragraph. What the board recommends and why, in the profile's money framing.>

### Dissent
> <Quote the strongest remaining objection verbatim from the seat's file> (Seat, round)

### Conditions & Kill Criteria
- Proceed only if <condition>
- Stop if <measurable signal> by <date>

### Action Items
| Action | Owner seat | Skill to run | Due | Depends on |
|--------|-----------|--------------|-----|------------|

### Decision
<Filled after the checkpoint: Accepted / Overridden by the founder: "<their decision and reason>" / Parked>
```

Rules:
- Never invent a consensus. If the seats still disagree, say so; the founder decides at the checkpoint.
- Quote dissent verbatim. Don't soften it.
- Every action item names a seat and, when one fits, the skill that would produce it.

---

## Item Checkpoint

Board phases always stop for a checkpoint, even in "run everything" mode. Show the recommendation, the stance table and the dissent, then ask (AskUserQuestion):

- **Accept**: record "Accepted" under Decision.
- **Another round**: the founder's note is appended to `brief.md` under "Answers added during the run". Add round 3 steps (`N3a`…) for the same seats with the note in their `task`, then a new synthesis. At most 3 rounds per item; after that only Accept, Override or Park.
- **Override**: ask for their decision and reason in one question; record it under Decision. Their call wins.
- **Park**: mark the item `skipped` in `plan.md` with the reason and add it to Open Questions in `PRODUCT_KNOWLEDGE.md`.

Then merge the item into `PRODUCT_KNOWLEDGE.md` (accepted or overridden items only):
- **Decisions:** one row per decision, owner = the seat that owns its area (or "Founder" for an override), source = `transcript.md#item-<N>`.
- **Roles & Ownership:** each action item under its owner seat.
- **Dependencies:** each action item's `Depends on`.
- **Discussions:** one row for the item: date, run id, topic, attendees, outcome, link to `transcript.md`.
- **Superseded:** any earlier decision this one replaces, with the reason.

---

## Adjourning

At the end of the run, send each live teammate a shutdown request (or stop it). Named subagents end on their own. Teammates don't survive `/resume`; resuming a board run relaunches seats from the files.
