# founder-suite

A Claude Code plugin for founders, marketers, content creators and business owners.

It contains 20 Claude skills that will help you turn Claude into a Fortune 500 growth team: 18 specialist skills, plus `/founder`, an orchestrator that chains them into complete workflows and chairs board meetings, and `/product-context`, which sets up your project from your website or a few questions.

Every specialist skill is also a **persona**, a seat on your project's board: `pricing-strategist` is your CFO, `cto-review` your CTO, `outreach-specialist` your Head of Sales. The persona fits your scale, from a bootstrapped first-time founder to a corporate team pitching a real board. It gives the same judgment whether you run the skill on its own, inside a `/founder` playbook, or at a board meeting where the seats debate a decision.

Stop prompting from scratch and use proven marketing, copywriting, and product skills companies pay millions for.

## Installation

Install all skills. `/founder` needs the other skills installed alongside it to run its playbooks.

### As a Claude Code plugin (recommended)

```
/plugin marketplace add Awesomer9561/founder-skills
/plugin install founder-suite@founder-suite
```

The plugin also ships two things the other install methods can't:

- **`founder-step` agent:** a dedicated subagent `/founder` uses to run playbook steps and board seats in parallel. It can't ask questions, publish or post, and only writes its own output file.
- **Session reminder:** in projects that use founder-suite, Claude is told when `PRODUCT_CONTEXT.md` is still the blank template, has no scale profile, is still the older `FOUNDER_CONTEXT.md`, or a `/founder` run is unfinished. In other projects it stays silent.

Plugin skills are namespaced, so commands become `/founder-suite:founder`, `/founder-suite:x-writer`, and so on. The examples below use the short names you get from the other install methods.

### Via Terminal (npx skills)

```bash
npx skills add https://github.com/Awesomer9561/founder-skills
```

Install a specific skill:

```bash
npx skills add https://github.com/Awesomer9561/founder-skills --skill prd-generator
```

### Via the bundled installer

Copies the skills to `~/.claude/skills/` and creates a `PRODUCT_CONTEXT.md` template in the current directory. Skills you already have are kept unless you confirm or pass `--force`.

```bash
npx github:Awesomer9561/founder-skills install
npx github:Awesomer9561/founder-skills install --skill founder --skill x-writer
npx github:Awesomer9561/founder-skills list
```

> Don't use `npx founder-skills` or `npx founder-suite`. This package isn't on npm, and `founder-skills` there belongs to an unrelated package.

### Manual Installation

Clone the repo and copy all skills to your project:

```bash
git clone https://github.com/Awesomer9561/founder-skills
cp -r founder-skills/skills/* .claude/skills/
```

Or copy a single skill:

```bash
cp -r founder-skills/skills/prd-generator .claude/skills/
```

To install globally (available across all projects):

```bash
cp -r founder-skills/skills/* ~/.claude/skills/
```

## Quick Start

```
/product-context https://yourcompany.com
/founder launch on Product Hunt in 3 weeks
/founder should we add a free tier?
```

The first command sets up your project: what you do, your scale profile and your board. (No website yet? `/product-context no website` asks a few plain questions instead.) The second plans the launch, asks its questions once, and runs the skills it needs. The third convenes a board meeting with the seats that question needs.

If you skip the first command, `/founder` runs it for you before anything else.

## The `/founder` Orchestrator

Tell `/founder` the outcome you want. It picks a playbook, asks every question the playbook needs in one round, shows you the plan, then runs each skill with the previous skills' results as input.

```
/founder fix our landing page at https://acme.com, signups are down
```

| Playbook | Goal | Skills it chains |
|----------|------|------------------|
| `launch` | Launch a product or major feature | competitor-intel → pricing-strategist → go-to-market-plan → product-hunt-launch-plan → viral-hook-creator → x-writer + linkedin-writer |
| `new-product` | Go from idea to spec, price and GTM | prd-generator (+ competitor-intel) → pricing-strategist → go-to-market-plan |
| `content-week` | A batch of social content | marketing-ideas → viral-hook-creator → x-writer + linkedin-writer (+ lead-magnet-generator) |
| `landing-page-fix` | Raise a page's conversion rate | cro-optimization → brand-copywriter |
| `outbound` | Start cold outreach that books calls | competitor-intel + lead-magnet-generator (optional) → outreach-specialist |
| `growth-review` | Decide what to do next, then do it | strategic-planning → up to 3 skills chosen from its recommendations |
| `board-meeting` | Debate a decision with the seats it needs, then decide | agenda → each seat's position → debate → chair's synthesis → your call, per agenda item |

`launch`, `new-product` and `growth-review` can end with an optional **Board review** that pressure-tests the plan. It's offered automatically on corporate projects.

How a run works:

- **Product context first.** Every run uses your project's scale profile and board from `PRODUCT_CONTEXT.md`. If the file is missing, `/founder` sets it up first.
- **Questions once.** It skips anything already in `PRODUCT_CONTEXT.md` or `PRODUCT_KNOWLEDGE.md`, and anything an earlier step will work out (e.g. it won't ask for pricing if `pricing-strategist` runs first).
- **You approve the plan** and choose between pausing after each phase to review, or running straight through.
- **Parallel where possible.** In Claude Code, independent steps run at the same time as subagents. Elsewhere they run one after another.
- **Everything is saved** to `founder_outputs/runs/<date>-<playbook>/`: a `brief.md`, a `plan.md` with each step's status, one file per step, and a `SUMMARY.md` with the key decisions and a merged 7-day action list.
- **Resumable.** `/founder resume` continues an unfinished run.
- **Remembers decisions.** After each phase it logs the decisions, owners and dependencies to `PRODUCT_KNOWLEDGE.md`, so the next run (or a single skill next week) builds on them.
- **Learns your business.** At the end it offers to save new facts (pricing, ICP, channels) to `PRODUCT_CONTEXT.md`.

If your goal needs only one deliverable, `/founder` sends you straight to the right skill. If no playbook fits, it builds a custom chain of up to 6 skills. `/founder profile corporate` changes the project's scale profile (for example, after you raise money).

## Board Meetings

```
/founder should we add a free tier or a 14-day trial?
/founder brainstorm how we enter the agency market
/founder board pitch-review our Series A deck in ./deck.md
```

`/founder` chairs. It turns your question into an agenda of 1 to 4 items, each with a format: `explore` (find options), `decide` (choose) or `pitch-review` (stress-test a pitch before you face real investors or a board). It then **seats only the personas each item needs**, with a reason for each. A free-tier question gets the CFO, CMO, Head of CS and CTO; it doesn't need the COO. No seat attends by default, and the content writers only come when you invite them.

For each item:
1. **Round 1:** every seat writes its position independently, using its own skill's references.
2. **Round 2:** every seat reads the others and responds by name: holding, revising or adding conditions.
3. **The chair synthesises:** options, a recommendation, a stance table, verbatim dissent, kill criteria and action items with owners.
4. **You decide:** Accept, Another round, Override or Park.

Decisions, owners, dependencies and the discussion are logged to `PRODUCT_KNOWLEDGE.md`. The minutes go to `SUMMARY.md`, and the full debate to `transcript.md`. At the end, **Execute the action items** turns the decisions into a normal `/founder` run.

The table adapts to your scale profile:

| Profile | Who it's for | The board thinks in |
|---------|--------------|---------------------|
| `bootstrapped` | A founder (or a kid with an idea) spending their own money | Months of savings, the cheapest test this week, plain language. Up to 4 seats. |
| `startup` | A funded team chasing growth | Burn, runway, growth, next-round milestones. Up to 5 seats. |
| `corporate` | An established company, or a proposal for a real board or investors | Capital allocation, NPV and payback, risk to the core business. Up to 6 seats. |

**Agent teams (optional).** With Claude Code's experimental [agent teams](https://code.claude.com/docs/en/agent-teams) on, each seat is a teammate.
- **Requirements:** Claude Code 2.1.288 or later (for plugin-defined teammates), and an interactive session.
- **What changes:**
  - Seats stay alive between rounds, so they remember the debate.
  - They can challenge each other directly instead of through the chair.
- **How to turn it on:** add this to `~/.claude/settings.json`:
  ```json
  { "env": { "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1" }, "teammateMode": "auto" }
  ```
  `teammateMode: "auto"` shows seats in split panes when you're in tmux or iTerm2.
- **Without teams:** the meeting still works. Seats run as subagents (or one by one on Claude.ai), and the files in the run folder carry the debate between rounds.
- **Cost:** a meeting costs roughly one skill run per seat per round. The plan shows the count before you approve it.

## Available Skills

| Skill | Seat | Description |
|-------|------|-------------|
| `founder` | Chair | Orchestrator: turns a goal into a playbook of skills, asks questions once, runs them in order or in parallel, chairs board meetings, and saves a summary |
| `product-context` | — | Sets up `PRODUCT_CONTEXT.md` (company, product idea, scale profile, board) from your website or a few questions; migrates an older `FOUNDER_CONTEXT.md`; changes the profile |
| `strategic-planning` | CEO | Analyzes your business to deliver 3 specific, high-impact next moves for growth (marketing/sales) — asks diagnostic questions when needed to uncover bottlenecks and opportunities |
| `pricing-strategist` | CFO | Builds comprehensive pricing strategies with tiered plans, price justifications, and revenue optimization through interactive Q&A |
| `prd-generator` | CPO | Generates professional PRD documents optimized for AI coding tools — asks clarifying questions and outputs a PDF to `./founder_outputs/prd-generator/` |
| `cto-review` | CTO | Technical feasibility and risk review: architecture options, build vs buy, effort and cost bands, top risks, and a 2-week spike plan |
| `investor-review` | Investor / board director | Investor stress-test: scorecard, the 10 hardest questions with answer prep, deal-breakers, and a board-paper outline for corporate proposals |
| `customer-success` | Head of Customer Success | Retention and onboarding plan: activation milestones, churn diagnosis, health score, and the top 3 retention plays |
| `outreach-specialist` | Head of Sales | Crafts high-converting outreach sequences (cold email, LinkedIn DM, X DM) using 8 proven templates with follow-up strategy, platform-specific rules, and personalized messaging that books calls |
| `marketing-ideas` | CMO | Produces the 5 best marketing ideas for your business from a curated database of 160+ proven strategies — tailored to your industry, audience, and goals |
| `go-to-market-plan` | Chief Commercial Officer | Delivers 3 best go-to-market strategies tailored to your product, stage, and market — asks diagnostic questions about product readiness, ICP, competitive positioning, and distribution channels |
| `competitor-intel` | Head of Strategy | Analyzes competitors with verified metrics, leverage strategies, and predicted next moves |
| `sop-creator` | COO | Creates detailed Standard Operating Procedures for business processes |
| `brand-copywriter` | Brand & Messaging Director | Writes marketing copy using proven frameworks (AIDA, PAS, BAB, etc.) for ads, landing pages, emails, and more |
| `cro-optimization` | Head of Growth | Analyzes landing pages against 13 CRO principles and provides detailed optimization recommendations with before/after examples |
| `lead-magnet-generator` | Demand Gen Lead | Creates viral lead magnet posts with CTAs that drive comments and DMs — produces quick and detailed formats for Twitter/X and LinkedIn |
| `product-hunt-launch-plan` | Launch Lead | Creates comprehensive, personalized Product Hunt launch plans to rank #1 — includes hour-by-hour battle plan, templates, and 20+ alternative launch platforms |
| `viral-hook-creator` | Content team (invite-only) | Creates viral hooks for content and marketing |
| `x-writer` | Content team (invite-only) | Creates 3 viral X (Twitter) posts in different proven formats with creator voice matching (Hormozi, Naval, Gazdecki, Dakota, Machina, Ognjen) — uses 51+ post templates and 8 format structures |
| `linkedin-writer` | Content team (invite-only) | Creates 2 viral LinkedIn posts in different proven formats with voice matching — uses 8+ post templates and 7 format structures (Lessons Learned, Blueprint, Story, Strategy, Case Study, Hot Take, Quick Hack) |

Seat titles change with your scale profile. For example, the CFO is a "Money mentor" on a bootstrapped project and a "Group CFO" on a corporate one. `/product-context` writes each seat's title and focus for your product into the Board & Management table of `PRODUCT_CONTEXT.md`.

## Usage

After installation, use skills in Claude Code by typing:

```
/sop-creator create an employee onboarding process
```

```
/linkedin-writer write a post about our new product launch
```

## Your Project Files

Two files in your project root keep every skill consistent, in every session and every mode:

| File | Holds | Who writes it |
|------|-------|---------------|
| `PRODUCT_CONTEXT.md` | **What we do**: company, product idea, scale profile, brand voice, goals, competitors, and the board (each seat's title, experience and focus for your product) | You, `/product-context`, and skills when you approve a context update |
| `PRODUCT_KNOWLEDGE.md` | **How we do it**: decisions (with IDs), each seat's responsibilities and owned actions, dependencies, discussions, learned facts, superseded decisions, open questions | The skills and `/founder`, automatically, as you work |

Every skill reads both before it starts. It plays its board seat for your profile, and it stays consistent with the decisions already made: run `/cto-review` alone next week and it knows the CFO's pricing from today's playbook. To change a decision, a skill says so and records what it replaced.

The fastest way to create the context:

```
/product-context https://yourcompany.com
```

It reads your homepage, pricing and about pages, and asks your scale profile and whatever your site doesn't say (goals, stage, words to avoid). Then it writes the file and seats your board. Run it again any time to refresh it; it never overwrites your edits without asking. You can also copy [PRODUCT_CONTEXT.md](PRODUCT_CONTEXT.md) from this repository and fill it in by hand.

**Upgrading from v2:** `FOUNDER_CONTEXT.md` is now `PRODUCT_CONTEXT.md`, and `/founder-context` is now `/product-context`. Skills still read an old `FOUNDER_CONTEXT.md`. Run `/product-context migrate` to move it over and add your profile and board.

## Outputs

Every skill shows its result in the chat and also saves it to `founder_outputs/` in your project:

```
founder_outputs/
├── x-writer/2026-10-11-launch-announcement.md
├── prd-generator/Churn Prevention Tool/churn_prevention_tool_PRD.md
├── runs/2026-10-11-launch/        # /founder runs
│   ├── brief.md
│   ├── plan.md
│   ├── 01-competitor-intel.md
│   └── SUMMARY.md
└── runs/2026-10-12-board-meeting/ # board meetings add:
    ├── items/1-r1-pricing-strategist.md
    └── transcript.md
```

Each file starts with a short header (skill, date, profile, request, assumptions, key decisions) so you, Claude and other skills can reuse it later.

## Contributing

Want to add a new skill? See [.claude/CLAUDE.md](.claude/CLAUDE.md) for development guidelines.

### Skill Structure

```
skills/
└── your-skill/
    ├── SKILL.md        # Main skill definition
    └── references/     # Additional reference materials
```

Every skill needs a `## Persona` section (its board seat). After adding or editing a skill, run `node scripts/sync-shared.js` to add the shared project-files, output and orchestration sections and to check the persona. Then add the skill to the `/founder` skill catalog.

## Credits

founder-suite is built on [founder-skills](https://github.com/ognjengt/founder-skills) by [Ognjen Gatalo](https://github.com/ognjengt), which provides the 15 original skills and their reference libraries. founder-suite adds the `/founder` orchestrator and board meetings, personas, `/product-context`, `PRODUCT_KNOWLEDGE.md`, `cto-review`, `investor-review`, `customer-success`, saved outputs, context write-back, and the plugin packaging.

## License

MIT. See [LICENSE](LICENSE).
