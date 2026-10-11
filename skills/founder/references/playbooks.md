# Playbooks

Each playbook is a chain of skills grouped into phases. Steps in the same phase whose `depends_on` are complete can run in parallel.

**Step fields**
- `skill` — the skill folder name
- `depends_on` — step numbers whose output files become this step's `inputs`
- `when` — condition for optional steps; drop the step if it isn't met
- `repeat` — run once per item (output files get a suffix, e.g. `01a-competitor-intel.md`, `01b-...`)
- `task` — what to put in the handoff's `task` line; fill `<...>` from the brief
- `mode` — `board` makes the step a board-meeting seat: the handoff adds `mode: board`, `item`, `round` and `peers`, and the skill writes a position memo instead of its deliverable (see the skills' Board Mode)
- `(chair)` in the skill column — the orchestrator runs the step itself, with no subagent (see `board.md`)
- `checkpoint: always` on a phase — stop for a checkpoint after it, even in "run everything" mode

**Intake** lists facts the playbook needs beyond what the skills' `needs` already cover. Ask only for what PRODUCT_CONTEXT.md, PRODUCT_KNOWLEDGE.md and the user haven't given.

**Template phases** (board-meeting) are expanded into concrete steps while building the plan, once the agenda and seats are known, the same way `growth-review` adds steps at runtime.

---

## Playbook Index

| id | Goal | Steps |
|----|------|-------|
| `launch` | Launch a product or major feature | competitor-intel → pricing-strategist → go-to-market-plan → product-hunt-launch-plan → viral-hook-creator → x-writer + linkedin-writer |
| `new-product` | Go from idea to spec, price and GTM | prd-generator (+ competitor-intel) → pricing-strategist → go-to-market-plan |
| `content-week` | A batch of social content | marketing-ideas → viral-hook-creator → x-writer + linkedin-writer (+ lead-magnet-generator) |
| `landing-page-fix` | Raise a page's conversion rate | cro-optimization → brand-copywriter |
| `outbound` | Start cold outreach that books calls | competitor-intel? + lead-magnet-generator? → outreach-specialist |
| `growth-review` | Decide what to do next, then do it | strategic-planning → up to 3 skills chosen from its moves |
| `board-meeting` | Debate a decision with the seats it needs, then decide | agenda (chair) → per item: seats' positions → debate → chair synthesis → your call |

`launch`, `new-product` and `growth-review` can end with an optional **Board review** phase (see the end of this file).

---

## launch

**Triggers:** launch, launching, release, go live, Product Hunt, ship to market, announce
**Intake:** launch date or timeframe · launch venue (Product Hunt, own audience, both) · main launch goal (users, revenue, awareness, investors) · audience size (email list, X and LinkedIn followers) · assets ready (landing page, demo video, screenshots)

### Phase 1 · Research & pricing
| # | skill | depends_on | when | task |
|---|-------|-----------|------|------|
| 01 | competitor-intel | — | competitors known; `repeat` per competitor, max 3 | Analyse <competitor> as it relates to <product>'s launch. Focus on positioning gaps and launch tactics we can counter. |
| 02 | pricing-strategist | 01 | user hasn't fixed pricing | Build launch pricing for <product>. Use competitor pricing from inputs as anchors. Include a launch offer. |

### Phase 2 · Strategy
| # | skill | depends_on | when | task |
|---|-------|-----------|------|------|
| 03 | go-to-market-plan | 01, 02 | — | Create 3 GTM strategies built around a launch on <launch date>. Use the positioning and pricing from inputs. |
| 04 | product-hunt-launch-plan | 03 | venue includes Product Hunt | Plan a Product Hunt launch for <launch date> consistent with the GTM strategy and pricing in inputs. |

### Phase 3 · Launch content
| # | skill | depends_on | when | task |
|---|-------|-----------|------|------|
| 05 | viral-hook-creator | 03 | — | Write hooks announcing the launch of <product>, built on the core message and differentiators in inputs. |
| 06 | x-writer | 03, 05 | X is a channel | Write launch-day X posts for <product>. Use the hooks from inputs and the launch offer. |
| 07 | linkedin-writer | 03, 05 | LinkedIn is a channel | Write launch-day LinkedIn posts for <product>. Use the hooks and positioning from inputs. |

---

## new-product

**Triggers:** new product, idea, PRD, spec, MVP, build, validate an idea
**Intake:** the product idea in one or two sentences · primary user · 3 to 5 must-have features · tech stack preference · target launch timeframe · whether they want a PDF of the PRD (default: no)

### Phase 1 · Define
| # | skill | depends_on | when | task |
|---|-------|-----------|------|------|
| 01 | prd-generator | — | — | Write the PRD for <product idea>. Use the intake answers in the brief instead of asking questions. Markdown only; the orchestrator makes the PDF afterwards if the brief asks. |
| 02 | competitor-intel | — | a competitor is named | Analyse <competitor> as the main alternative to <product idea>. |
| 03 | cto-review | 01 | the product needs custom technology, or the user asks for a feasibility check | Review the technical feasibility, build-vs-buy choices, cost and risks of the PRD in inputs. |

### Phase 2 · Monetise & launch
| # | skill | depends_on | when | task |
|---|-------|-----------|------|------|
| 04 | pricing-strategist | 01, 02, 03 | — | Price <product> based on the PRD's personas and features, anchored on competitor pricing if available, and covering the running costs in the feasibility review if available. |
| 05 | go-to-market-plan | 01, 02, 04 | — | Create 3 GTM strategies for <product> for its first 90 days, using the PRD personas and the pricing. |

---

## content-week

**Triggers:** content, posts, week of content, social media, LinkedIn and X, content calendar, grow audience
**Intake:** platforms (X, LinkedIn, both) · topics or themes the user wants (or "suggest some") · voice (one of the x-writer voices, or own) · lead magnet to promote (if any)

### Phase 1 · Ideas & hooks
| # | skill | depends_on | when | task |
|---|-------|-----------|------|------|
| 01 | marketing-ideas | — | the user hasn't given themes | Pick the 5 ideas best suited to organic social content for <business>. |
| 02 | viral-hook-creator | 01 | — | Write hooks for the themes in the brief (or the top ideas from inputs). |

### Phase 2 · Posts
| # | skill | depends_on | when | task |
|---|-------|-----------|------|------|
| 03 | x-writer | 01, 02 | X is a platform | Write X posts on the top theme, using the strongest hooks from inputs. Voice: <voice>. |
| 04 | linkedin-writer | 01, 02 | LinkedIn is a platform | Write LinkedIn posts on the second theme (or the top theme if only one), using hooks from inputs. |
| 05 | lead-magnet-generator | 02 | a lead magnet exists | Write lead magnet posts giving away <lead magnet>, using hooks from inputs. |

Tell the user each writer produces a fixed number of posts (X: 3, LinkedIn: 2). For more, use **Redo a step** with a new theme.

---

## landing-page-fix

**Triggers:** landing page, conversion, CRO, homepage, signups dropping, page not converting
**Intake:** page URL (or HTML) · page goal (signup, demo, purchase, waitlist) · current conversion rate if known · audience if not in PRODUCT_CONTEXT.md

### Phase 1 · Audit
| # | skill | depends_on | when | task |
|---|-------|-----------|------|------|
| 01 | cro-optimization | — | — | Audit <url> for the goal "<page goal>". |

### Phase 2 · Rewrite
| # | skill | depends_on | when | task |
|---|-------|-----------|------|------|
| 02 | brand-copywriter | 01 | — | Rewrite the landing page copy for <url>: hero (headline, subheadline, CTA) and every section flagged under Critical Issues in inputs. Keep the page's structure unless the audit says to change it. |

---

## outbound

**Triggers:** outreach, cold email, DMs, book calls, sales pipeline, outbound, prospecting
**Intake:** target persona and company type · channel (email, LinkedIn DM, X DM) · offer and call to action · proof points (results, customers, numbers) · competitor whose customers you target (if any) · lead magnet to offer (if any)

### Phase 1 · Ammunition
| # | skill | depends_on | when | task |
|---|-------|-----------|------|------|
| 01 | competitor-intel | — | targeting a competitor's customers | Analyse <competitor> to find the pains its customers have that <product> solves. |
| 02 | lead-magnet-generator | — | a lead magnet exists | Write posts giving away <lead magnet> to warm up the target persona before outreach. |

### Phase 2 · Sequence
| # | skill | depends_on | when | task |
|---|-------|-----------|------|------|
| 03 | outreach-specialist | 01, 02 | — | Write a <channel> sequence to <persona> with the offer "<offer>". Use competitor pains and the lead magnet from inputs as hooks where available. |

---

## growth-review

**Triggers:** what should I do next, stuck, growth, plateau, strategy, priorities, next moves
**Intake:** biggest bottleneck · revenue stage · what's been tried · resources (budget, team, time)

### Phase 1 · Diagnose
| # | skill | depends_on | when | task |
|---|-------|-----------|------|------|
| 01 | strategic-planning | — | — | Find the 3 highest-impact next moves for <business>. |

### Phase 2 · Execute (chosen at the checkpoint)
After step 01, always stop for a checkpoint, even in "run everything" mode. For each of the 3 moves, use `good_for` in the skill catalog to propose the one skill that produces its first deliverable (e.g. a "launch a newsletter" move → brand-copywriter; a "cold outreach to agencies" move → outreach-specialist). Show the proposal and let the user pick up to 3. Add the picked steps as 02, 03, 04 with `depends_on: 01` and a task naming the move. They can run in parallel.

---

## board-meeting

**Triggers:** should we, brainstorm, board meeting, debate, pressure-test, sanity check, pitch to the board, pitch to investors, decide between, which option, what do you all think
**Intake:** the question or decision · options already on the table · deadline for the decision · anything already ruled out · for a pitch-review: the proposal or deck (file or text)

Read `board.md` before building this plan. The seats are skills speaking as their personas; the chair is you (the orchestrator).

### Phase 0 · Agenda (chair, while building the plan)
Not a step. While routing and building the plan:
1. Draft 1 to 4 agenda items. Each item has a question to resolve and a format: `explore` (find and shortlist options), `decide` (choose between options) or `pitch-review` (stress-test a proposal before real investors or a board).
2. Seat the item: pick 2 to 4 seats whose lens the question needs, from the Board & Management table in PRODUCT_CONTEXT.md and the `seat` and `board` columns of the skill catalog. Every seat is on demand: no seat attends by default. Give each seat a one-line reason. `invite-only` seats attend only when the user asks for them.
3. Respect the table cap for the profile: bootstrapped 4, startup 5, corporate 6 distinct seats across the whole meeting.
4. Expand the template below once per item and write the agenda into `brief.md`.

### Phase N · Item N (template, one phase per agenda item) · `checkpoint: always`
| # | skill | depends_on | mode | task |
|---|-------|-----------|------|------|
| N1a, N1b… | each seat for item N (`repeat` per seat) | — | board, round 1 | Give your position on: <item question>. Format: <format>. |
| N2a, N2b… | each seat for item N (`repeat` per seat) | all N1x | board, round 2 | Read the round 1 positions in inputs. Respond to the seats you disagree with by name; hold, revise or add conditions. |
| NS | (chair) | all N2x | — | Synthesise item N into `transcript.md` using the template in `board.md`. |

Step ids use the item number and round, e.g. `11a` (item 1, round 1, first seat), `12a`, `1S`. Output files go to `items/<item>-r<round>-<skill>.md`; the chair's synthesis goes to `transcript.md`.

### Final · Minutes
Write `SUMMARY.md` using the board variant in `run-files.md`. Then offer **Execute the action items**: compose a custom chain (Step 3 rules) from the action items' skills, with `SUMMARY.md` as an input to every step.

---

## Board review (optional phase)

Added as the last phase of `launch`, `new-product` and `growth-review` when the user asks for it, or when the profile is `corporate` (offer it then, don't force it).

### Phase · Board review · `checkpoint: always`
One agenda item, "Pressure-test this plan before we commit", format `decide`. Seat 2 to 4 seats from the domains the run touched, preferring seats that did **not** produce a step (e.g. `investor-review` and `cto-review` reviewing a launch). Expand it like a board-meeting item: round 1 `inputs` are the run's output files, then round 2 and the chair's synthesis. Its action items and dissent go into `SUMMARY.md`.
