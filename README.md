# founder-suite

A Claude Code plugin for founders, marketers, content creators and business owners.

It contains 17 Claude skills that will help you turn Claude into a Fortune 500 growth team: 15 specialist skills, plus `/founder`, an orchestrator that chains them into complete workflows, and `/founder-context`, which sets up your business profile from your website.

Stop prompting from scratch and use proven marketing, copywriting, and product skills companies pay millions for.

## Installation

Install all skills. `/founder` needs the other skills installed alongside it to run its playbooks.

### As a Claude Code plugin (recommended)

```
/plugin marketplace add Awesomer9561/founder-skills
/plugin install founder-suite@founder-suite
```

The plugin also ships two things the other install methods can't:

- **`founder-step` agent:** a dedicated subagent `/founder` uses to run playbook steps in parallel. It can't ask questions, publish or post, and only writes its own output file.
- **Session reminder:** in projects that use founder-suite, Claude is told when `FOUNDER_CONTEXT.md` is still the blank template or a `/founder` run is unfinished. In other projects it stays silent.

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

Copies the skills to `~/.claude/skills/` and creates a `FOUNDER_CONTEXT.md` template in the current directory. Skills you already have are kept unless you confirm or pass `--force`.

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
/founder-context https://yourcompany.com
/founder launch on Product Hunt in 3 weeks
```

The first command builds your business profile. The second plans the launch, asks its questions once, and runs the skills it needs.

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

How a run works:

- **Questions once.** It skips anything already in `FOUNDER_CONTEXT.md` or that an earlier step will work out (e.g. it won't ask for pricing if `pricing-strategist` runs first).
- **You approve the plan** and choose between pausing after each phase to review, or running straight through.
- **Parallel where possible.** In Claude Code, independent steps run at the same time as subagents. Elsewhere they run one after another.
- **Everything is saved** to `founder_outputs/runs/<date>-<playbook>/`: a `brief.md`, a `plan.md` with each step's status, one file per step, and a `SUMMARY.md` with the key decisions and a merged 7-day action list.
- **Resumable.** `/founder resume` continues an unfinished run.
- **Learns your business.** At the end it offers to save new facts (pricing, ICP, channels) to `FOUNDER_CONTEXT.md`.

If your goal needs only one deliverable, `/founder` sends you straight to the right skill. If no playbook fits, it builds a custom chain of up to 6 skills.

## Available Skills

| Skill | Description |
|-------|-------------|
| `founder` | Orchestrator: turns a goal into a playbook of skills, asks questions once, runs them in order or in parallel, and saves a summary |
| `founder-context` | Builds or updates `FOUNDER_CONTEXT.md` from your website plus a few questions, without overwriting your edits |
| `sop-creator` | Creates detailed Standard Operating Procedures for business processes |
| `cro-optimization` | Analyzes landing pages against 13 CRO principles and provides detailed optimization recommendations with before/after examples |
| `viral-hook-creator` | Creates viral hooks for content and marketing |
| `lead-magnet-generator` | Creates viral lead magnet posts with CTAs that drive comments and DMs — produces quick and detailed formats for Twitter/X and LinkedIn |
| `strategic-planning` | Analyzes your business to deliver 3 specific, high-impact next moves for growth (marketing/sales) — asks diagnostic questions when needed to uncover bottlenecks and opportunities |
| `go-to-market-plan` | Delivers 3 best go-to-market strategies tailored to your product, stage, and market — asks diagnostic questions about product readiness, ICP, competitive positioning, and distribution channels |
| `x-writer` | Creates 3 viral X (Twitter) posts in different proven formats with creator voice matching (Hormozi, Naval, Gazdecki, Dakota, Machina, Ognjen) — uses 51+ post templates and 8 format structures |
| `linkedin-writer` | Creates 2 viral LinkedIn posts in different proven formats with voice matching — uses 8+ post templates and 7 format structures (Lessons Learned, Blueprint, Story, Strategy, Case Study, Hot Take, Quick Hack) |
| `outreach-specialist` | Crafts high-converting outreach sequences (cold email, LinkedIn DM, X DM) using 8 proven templates with follow-up strategy, platform-specific rules, and personalized messaging that books calls |
| `competitor-intel` | Analyzes competitors with verified metrics, leverage strategies, and predicted next moves |
| `brand-copywriter` | Writes marketing copy using proven frameworks (AIDA, PAS, BAB, etc.) for ads, landing pages, emails, and more |
| `pricing-strategist` | Builds comprehensive pricing strategies with tiered plans, price justifications, and revenue optimization through interactive Q&A |
| `prd-generator` | Generates professional PRD documents optimized for AI coding tools — asks clarifying questions and outputs a PDF to `./founder_outputs/prd-generator/` |
| `product-hunt-launch-plan` | Creates comprehensive, personalized Product Hunt launch plans to rank #1 — includes hour-by-hour battle plan, templates, and 20+ alternative launch platforms |
| `marketing-ideas` | Produces the 5 best marketing ideas for your business from a curated database of 160+ proven strategies — tailored to your industry, audience, and goals |

## Usage

After installation, use skills in Claude Code by typing:

```
/sop-creator create an employee onboarding process
```

```
/linkedin-writer write a post about our new product launch
```

## Customizing for Your Business

Every skill reads `FOUNDER_CONTEXT.md` from your project root to tailor its output to your business. Each project can have its own context file for different businesses or clients.

The fastest way to create it:

```
/founder-context https://yourcompany.com
```

It reads your homepage, pricing and about pages, asks only for what your site doesn't say (goals, stage, words to avoid), and writes the file. Run it again any time to refresh it; it never overwrites your edits without asking.

You can also copy [FOUNDER_CONTEXT.md](FOUNDER_CONTEXT.md) from this repository and fill it in by hand:

- Company name and industry
- Target audience and value proposition
- Brand voice and tone
- Business goals
- Products/services

The file keeps improving as you use the skills: when a skill learns a lasting fact from your answers (new pricing, a competitor, your ICP), it offers to add it.

## Outputs

Every skill shows its result in the chat and also saves it to `founder_outputs/` in your project:

```
founder_outputs/
├── x-writer/2026-10-11-launch-announcement.md
├── prd-generator/Churn Prevention Tool/churn_prevention_tool_PRD.md
└── runs/2026-10-11-launch/        # /founder runs
    ├── brief.md
    ├── plan.md
    ├── 01-competitor-intel.md
    └── SUMMARY.md
```

Each file starts with a short header (skill, date, request, assumptions) so you, Claude and other skills can reuse it later.

## Contributing

Want to add a new skill? See [CLAUDE.md](CLAUDE.md) for development guidelines.

### Skill Structure

```
skills/
└── your-skill/
    ├── SKILL.md        # Main skill definition
    └── references/     # Additional reference materials
```

After adding or editing a skill, run `node scripts/sync-shared.js` to add the shared output, context and orchestration sections, and add the skill to the `/founder` skill catalog.

## Credits

founder-suite is built on [founder-skills](https://github.com/ognjengt/founder-skills) by [Ognjen Gatalo](https://github.com/ognjengt), which provides the 15 original skills and their reference libraries. founder-suite adds the `/founder` orchestrator, `/founder-context`, saved outputs, context write-back, and the plugin packaging.

## License

MIT. See [LICENSE](LICENSE).
