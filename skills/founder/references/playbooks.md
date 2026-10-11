# Playbooks

Each playbook is a chain of skills grouped into phases. Steps in the same phase whose `depends_on` are complete can run in parallel.

**Step fields**
- `skill` — the skill folder name
- `depends_on` — step numbers whose output files become this step's `inputs`
- `when` — condition for optional steps; drop the step if it isn't met
- `repeat` — run once per item (output files get a suffix, e.g. `01a-competitor-intel.md`, `01b-...`)
- `task` — what to put in the handoff's `task` line; fill `<...>` from the brief

**Intake** lists facts the playbook needs beyond what the skills' `needs` already cover. Ask only for what FOUNDER_CONTEXT.md and the user haven't given.

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

### Phase 2 · Monetise & launch
| # | skill | depends_on | when | task |
|---|-------|-----------|------|------|
| 03 | pricing-strategist | 01, 02 | — | Price <product> based on the PRD's personas and features, anchored on competitor pricing if available. |
| 04 | go-to-market-plan | 01, 02, 03 | — | Create 3 GTM strategies for <product> for its first 90 days, using the PRD personas and the pricing. |

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
**Intake:** page URL (or HTML) · page goal (signup, demo, purchase, waitlist) · current conversion rate if known · audience if not in FOUNDER_CONTEXT.md

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
