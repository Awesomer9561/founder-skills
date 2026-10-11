# Development Guidelines

This file provides guidance for Claude when working on the founder-suite repository (a fork of ognjengt/founder-skills, published as the `founder-suite` Claude Code plugin).

## Repository Structure

```
founder-skills/              # repo name; the plugin is called founder-suite
├── .claude-plugin/
│   ├── marketplace.json    # Marketplace listing (no component specs)
│   └── plugin.json         # Plugin manifest; components are auto-discovered
├── agents/
│   └── founder-step.md     # Runs one /founder step or one board-meeting seat
├── hooks/
│   ├── hooks.json          # SessionStart hook registration
│   └── session-start.js    # Reminds about blank/old context files and unfinished runs
├── bin/
│   └── cli.js              # Installer (run via npx github:<owner>/founder-skills)
├── scripts/
│   └── sync-shared.js      # Injects shared/ blocks into every skill
├── shared/                 # Single source for sections every skill carries
│   ├── orchestrated-mode-hook.md
│   └── skill-protocols.md  # Project Files, Saving Output, Context Write-back, Orchestrated + Board Mode
├── skills/                 # All skills
│   ├── founder/            # Orchestrator: playbooks (incl. board-meeting), skill catalog, run files
│   ├── product-context/    # Builds PRODUCT_CONTEXT.md (profile + board) from a website or questions
│   └── <skill-name>/
│       ├── SKILL.md        # Skill definition
│       └── references/     # Additional materials
├── PRODUCT_CONTEXT.md      # Product context template (what we do)
├── package.json            # npm package config
├── README.md               # User documentation
└── .claude/CLAUDE.md       # This file (contributor guide)
```

## Adding a New Skill

1. Create a new directory in `skills/`:
   ```
   skills/new-skill-name/
   ├── SKILL.md
   └── references/
       └── .gitkeep
   ```

2. Follow the SKILL.md format:
   ```markdown
   ---
   name: skill-name
   description: Brief description of what this skill does and when to use it.
   ---

   # Skill Title

   ## Purpose
   One sentence. One outcome. No context.

   ## Persona
   - **Seat:** CFO
   - **Board:** on-demand
   - **Profiles:**
     - **bootstrapped:** Money mentor. Has bootstrapped two businesses on savings; thinks in months of personal runway and the cheapest test.
     - **startup:** CFO. Has run finance from seed to Series B; thinks in burn multiple, CAC payback and the next round's milestones.
     - **corporate:** Group CFO. Allocates capital across business units; thinks in NPV, payback period and cannibalisation.
   - **Lens:** What does this cost and what does it return? How long until it pays back? What's the cheapest way to find out? What breaks if we're wrong?
   - **Watches:** gross margin, CAC payback, runway, ARPU
   - **Pushes back on:** `marketing-ideas` on spend without a payback window; `outreach-specialist` on discounts that train buyers to wait

   ---

   ## Execution Logic

   **Check $ARGUMENTS first to determine execution mode:**

   ### If $ARGUMENTS is empty or not provided:
   Respond with:
   "skill-name loaded, proceed with additional instructions"

   Then wait for the user to provide their requirements in the next message.

   ### If $ARGUMENTS contains content:
   Proceed immediately to Task Execution (skip the "loaded" message).

   ---

   ## Task Execution

   When user requirements are available (either from initial $ARGUMENTS or follow-up message):

   ### 1. MANDATORY: Read Reference Files FIRST
   **BLOCKING REQUIREMENT — DO NOT SKIP THIS STEP**

   Before doing ANYTHING else, you MUST use the Read tool to read every file
   in `./references/`. This is non-negotiable.

   **DO NOT PROCEED** to Step 2 until you have read all reference files and have their content in context.

   ### 2. Check for Business Context
   Check if `PRODUCT_CONTEXT.md` exists in the project root.
   - **If it exists:** Read it and use the business context to personalize
     your output (company name, brand voice, industry specifics, audience).
   - **If it doesn't exist:** Proceed using defaults from
     "Defaults & Assumptions".

   ### 3. Analyze Input
   From the user's requirements, extract:
   - [Key variable 1]
   - [Key variable 2]
   - [Key variable 3]

   For any missing information, apply defaults from **Defaults & Assumptions**.

   ### 4. Execute Task
   Using the data you read in Step 1:
   - [Core action 1 — tie back to specific reference file content]
   - [Core action 2]
   - Follow all Writing Rules below
   - [Skill-specific constraints]

   ### 5. Format and Verify
   - Structure output according to **Output Format** section
   - Complete **Quality Checklist** self-verification before presenting output

   ---

   ## Writing Rules
   Hard constraints. No interpretation.

   ### Core Rules
   - [Rule 1]
   - [Rule 2]
   - [Rule 3]

   ### Task-Specific Rules
   - [Rules that apply only in certain conditions within this skill]

   ### Context-Specific Rules
   - [Rules that change based on audience, platform, tone, etc.]

   ---

   ## Output Format
   [Expected output structure — use a concrete example, not just labels]

   **Example:**
   [A filled-in example showing what good output looks like]

   ---

   ## References

   **These files MUST be read using the Read tool before task execution
   (see Step 1):**

   | File | Purpose |
   |------|---------|
   | `./references/[file-1].md` | [What it contains] |
   | `./references/[file-2].md` | [What it contains] |

   **Why these matter:** [One sentence on how the reference files connect
   to produce better output — not optional boilerplate, but the actual reason.]

   ---

   ## Quality Checklist (Self-Verification)
   Before finalizing output, verify ALL of the following:

   ### Pre-Execution Check
   - [ ] I read all reference files before starting
   - [ ] I have the reference content in context

   ### Execution Check
   - [ ] Output uses data/patterns from the reference files (not invented)
   - [ ] Each [unit of output] is distinct (no repetition)
   - [ ] Writing Rules are followed throughout

   ### Output Check
   - [ ] Output matches the Output Format exactly
   - [ ] Defaults were applied correctly for any missing input
   - [ ] Output solves exactly what the user asked for

   **If ANY check fails → revise before presenting.**

   ---

   ## Defaults & Assumptions
   Use these unless the user overrides. Be specific — list concrete values,
   not vague categories.

   - [Default 1: concrete value]
   - [Default 2: concrete value]
   - [Default 3: concrete value]

   Document any assumptions made in the output.
   ```

   Write the `## Persona` section by hand. Every deliverable skill is also a seat on the project's board, so the same judgment shows up whether the skill runs alone, in a playbook, or in a board meeting. Rules:
   - **Seat** is the role it plays (CFO, CTO, Head of Sales, Content team…). **Board** is `on-demand` (the chair seats it when an agenda item needs its lens) or `invite-only` (only when the user asks, e.g. content writers).
   - One line per profile (`bootstrapped`, `startup`, `corporate`): title, then experience and how that seat frames money and risk at that scale.
   - **Lens** is 4 to 6 questions the seat always asks; **Watches** are its KPIs; **Pushes back on** names other skills it naturally disagrees with, and about what.
   - The persona shapes judgment only. It never changes the Output Format.
   - `node scripts/sync-shared.js --check` fails if a field is missing.

   Don't add a `version:` field. Versions were removed from skills so they work on Claude.ai; the pack's version lives in `package.json` and `.claude-plugin/`.

   Don't write the Project Files, Saving Output, Context Write-back, Orchestrated Mode or Board Mode sections yourself. The sync script adds them in step 3.

3. Run the sync script:
   ```bash
   node scripts/sync-shared.js
   ```
   It inserts two marked blocks into every skill (except `founder` and `product-context`):
   - right after `**Check $ARGUMENTS first to determine execution mode:**` (keep that exact line in every skill; the script anchors on it): a short "In every mode" note to load the Project Files, and an "If this is an orchestrated run" branch
   - at the end of the file: the Project Files, Saving Output, Context Write-back and Orchestrated Mode sections (including Board Mode)

   It also checks every skill's `## Persona` section.

   Never edit text between `<!-- founder-skills:... -->` markers by hand. Change `shared/` and re-run the script. `node scripts/sync-shared.js --check` exits 1 if anything is out of date or a Persona field is missing.

4. Register the skill with the orchestrator: add a row to `skills/founder/references/skill-catalog.md` (seat, board, needs, produces, good_for, notes) and, if it belongs in a workflow, a step in `skills/founder/references/playbooks.md`. Existing projects pick the new seat up the next time `/product-context` runs; until then the skill uses its Persona's profile line.

5. Update `README.md` to list the new skill (with its seat) in the Available Skills table, and update the skill count at the top and in the descriptions in `package.json` and `.claude-plugin/`.

## Skill Naming Conventions

- Use lowercase with hyphens: `sop-creator`, `linkedin-writer`
- Be descriptive but concise
- The folder name becomes the command: `/sop-creator`

## Testing Skills

1. Copy the skill to your local Claude skills directory:
   ```bash
   cp -r skills/new-skill ~/.claude/skills/
   ```

2. Open Claude Code and test:
   ```
   /new-skill [test input]
   ```

To test the whole plugin (namespaced skills, the `founder-step` agent and the SessionStart hook) without installing it, load it for one session from a test project:
```bash
claude --plugin-dir /path/to/founder-skills
```
Then run `/founder-suite:<skill>`.

## Plugin

The repo is a single-plugin marketplace. `plugin.json` is the only manifest: skills (`skills/`), agents (`agents/`) and hooks (`hooks/hooks.json`) are auto-discovered, so new skills need no manifest change. Don't add `skills`, `agents`, `hooks` or `strict` to the marketplace entry: declaring components in both places makes the plugin fail to load.

Before releasing:
```bash
claude plugin validate --strict .                          # marketplace
claude plugin validate --strict .claude-plugin/plugin.json # plugin manifest
claude plugin validate --strict skills agents              # components
```
This guide lives in `.claude/CLAUDE.md`, not the repo root: a root `CLAUDE.md` makes `--strict` fail, because plugins don't ship it as context. Claude Code still loads it from `.claude/` for contributors. `.gitignore` ignores the rest of `.claude/`.

Bump `version` in `package.json`, `.claude-plugin/plugin.json` and both places in `.claude-plugin/marketplace.json` together. Installed plugins only update when the version changes.

PDF conversion uses a pinned `npx --yes md-to-pdf@5.2.5` in `skills/prd-generator/SKILL.md` and `skills/founder/SKILL.md`. Change both together, and only to a release that has been out for a few weeks. `--yes` stops npx from waiting for an install prompt, and `< /dev/null` stops md-to-pdf from waiting for Markdown on stdin. Both would otherwise hang a Claude session.

The SessionStart hook must stay silent in projects without `PRODUCT_CONTEXT.md`, `FOUNDER_CONTEXT.md` or `founder_outputs/runs/`, must never exit non-zero, and must stay dependency-free.

## Shared Conventions

Every deliverable skill follows the same contract (defined in `shared/skill-protocols.md`):

- **Project files.** Every skill reads two root files before working, in every mode.
  - `PRODUCT_CONTEXT.md` is *what we do*: company, product idea, scale profile (`bootstrapped | startup | corporate`) and the Board & Management table. It is user-owned; changes go through write-back.
  - `PRODUCT_KNOWLEDGE.md` is *how we do it*: decisions with `D-NNN` IDs, roles and owned actions, dependencies, discussions, superseded decisions. It is machine-maintained.
  - The skill acts as its Board row (or its Persona's line for the profile), and stays consistent with active decisions or revises them explicitly.
  - Standalone runs ask the profile once if it's unset and save it.
- **Outputs** are saved to `./founder_outputs/<skill>/YYYY-MM-DD-<slug>.md` with a YAML front matter header (`skill`, `created`, `run`, `status`, `profile`, `request`, `inputs`, `assumptions`, `key_decisions`, `context_updates`). `prd-generator` overrides the path to keep its project folder.
- **Knowledge log.** Standalone runs append their `key_decisions` to `PRODUCT_KNOWLEDGE.md` themselves. In orchestrated and board runs, steps never write it; `/founder` merges once per phase, so parallel steps don't race.
- **Context write-back:** durable facts the user states are recorded in `context_updates`. Standalone runs offer to apply them to `PRODUCT_CONTEXT.md`; orchestrated runs leave that to `/founder`.
- **Orchestrated mode** is triggered by a `FOUNDER_RUN` handoff block, which always carries `profile`. The skill asks no questions, reads `brief` and `inputs`, writes to `output`, and reports `status: blocked` with questions if it can't continue.
- **Board mode** is a `FOUNDER_RUN` with `mode: board`. The skill speaks as its persona and writes a short position memo (round 1 blind, later rounds respond to peers) instead of its deliverable.

When writing a skill's steps, keep questions in a clearly labelled step (e.g. "Ask Clarifying Questions") and keep a concrete Defaults & Assumptions section. Orchestrated mode relies on both.

## Orchestrator

`/founder` lives in `skills/founder/`:
- `SKILL.md` — routing, the product-context gate, consolidated intake, run folder, execution (parallel subagents, named agents reused across board rounds, or sequential), `(chair)` steps, knowledge merge, checkpoints, summary, write-back, resume
- `references/playbooks.md` — playbook definitions, including `board-meeting` (template phases expanded at plan time) and the optional Board review phase; edit this to add or change workflows
- `references/board.md` — how the chair seats a meeting, runs rounds, synthesises, checkpoints and merges into `PRODUCT_KNOWLEDGE.md`
- `references/skill-catalog.md` — each skill's seat, board, needs, produces, good_for
- `references/run-files.md` — templates for `brief.md`, `plan.md`, `transcript.md`, `SUMMARY.md` (including the board minutes)

Board meetings use Claude Code agent teams when the user has them enabled (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`, interactive sessions, Claude Code 2.1.288+ for plugin-defined teammates). Seats are launched with the Agent tool and `name: <skill>`, which makes them teammates when teams are on and named subagents otherwise. Never make the meeting depend on teams: the run folder (`items/`, `transcript.md`) is the shared context, and resume relaunches seats from it.

It finds the other skills as siblings of its own folder (`<base dir>/../<skill>/SKILL.md`), which holds for `~/.claude/skills/`, project `.claude/skills/` and plugin installs.

`skills/product-context/references/product_context_template.md` is a copy of the root `PRODUCT_CONTEXT.md`, kept in sync by the sync script. `PRODUCT_CONTEXT.md` was called `FOUNDER_CONTEXT.md` before v3 (and `product-context` was `founder-context`). Skills, the hook and the CLI still recognise the old file and point users to `/product-context migrate`.

## Code Style

- Keep SKILL.md files focused and actionable
- Use clear, imperative instructions for Claude
- Include example outputs where helpful
- Reference PRODUCT_CONTEXT.md for business-specific context

## CLI Development

The CLI (`bin/cli.js`) handles:
- `install` - Copies skills to `~/.claude/skills/` + PRODUCT_CONTEXT.md to project root (leaves an existing FOUNDER_CONTEXT.md alone and suggests migrating)
- `list` - Shows available skills
- `--skill` flag - Selective installation (warns if `founder` is installed without the skills it runs)
- `--no-context` flag - Skip PRODUCT_CONTEXT.md creation
- `--force` flag - Overwrite installed skills. Without it, the CLI asks in a terminal and skips existing skills otherwise

The npm name `founder-skills` belongs to an unrelated package, so the CLI is run with `npx github:<owner>/founder-skills`. The help text derives that command from `repository.url` in `package.json`.

When modifying the CLI:
- Keep it dependency-free (Node.js built-ins only)
- Test both install and list commands
- Ensure error messages are helpful
