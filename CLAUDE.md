# Development Guidelines

This file provides guidance for Claude when working on the founder-skills repository.

## Repository Structure

```
founder-skills/
├── .claude-plugin/
│   ├── marketplace.json    # Marketplace metadata + skill list
│   └── plugin.json         # Plugin metadata
├── bin/
│   └── cli.js              # Installer (run via npx github:<owner>/founder-skills)
├── scripts/
│   └── sync-shared.js      # Injects shared/ blocks into every skill
├── shared/                 # Single source for sections every skill carries
│   ├── orchestrated-mode-hook.md
│   └── skill-protocols.md  # Saving Output, Context Write-back, Orchestrated Mode
├── skills/                 # All skills
│   ├── founder/            # Orchestrator: playbooks, skill catalog, run files
│   ├── founder-context/    # Builds FOUNDER_CONTEXT.md from a website
│   └── <skill-name>/
│       ├── SKILL.md        # Skill definition
│       └── references/     # Additional materials
├── FOUNDER_CONTEXT.md      # Business context template
├── package.json            # npm package config
├── README.md               # User documentation
└── CLAUDE.md               # This file
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
   Check if `FOUNDER_CONTEXT.md` exists in the project root.
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

   Don't add a `version:` field. Versions were removed from skills so they work on Claude.ai; the pack's version lives in `package.json` and `.claude-plugin/`.

   Don't write the Saving Output, Context Write-back or Orchestrated Mode sections yourself. The sync script adds them in step 3.

3. Run the sync script:
   ```bash
   node scripts/sync-shared.js
   ```
   It inserts two marked blocks into every skill (except `founder` and `founder-context`):
   - a short "If this is an orchestrated run" branch right after `**Check $ARGUMENTS first to determine execution mode:**` (keep that exact line in every skill; the script anchors on it)
   - the Saving Output, Context Write-back and Orchestrated Mode sections at the end of the file

   Never edit text between `<!-- founder-skills:... -->` markers by hand. Change `shared/` and re-run the script. `node scripts/sync-shared.js --check` exits 1 if anything is out of date.

4. Register the skill with the orchestrator: add a row to `skills/founder/references/skill-catalog.md` (needs, produces, good_for, notes) and, if it belongs in a workflow, a step in `skills/founder/references/playbooks.md`.

5. Update `marketplace.json` to include the new skill in the skills array.

6. Update `README.md` to list the new skill in the Available Skills table, and update the skill count at the top.

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

## Shared Conventions

Every deliverable skill follows the same contract (defined in `shared/skill-protocols.md`):

- **Outputs** are saved to `./founder_outputs/<skill>/YYYY-MM-DD-<slug>.md` with a YAML front matter header (`skill`, `created`, `run`, `status`, `request`, `inputs`, `assumptions`, `context_updates`). `prd-generator` overrides the path to keep its project folder.
- **Context write-back:** durable facts the user states are recorded in `context_updates`. Standalone runs offer to apply them to `FOUNDER_CONTEXT.md`; orchestrated runs leave that to `/founder`.
- **Orchestrated mode** is triggered by a `FOUNDER_RUN` handoff block. The skill asks no questions, reads `brief` and `inputs`, writes to `output`, and reports `status: blocked` with questions if it can't continue.

When writing a skill's steps, keep questions in a clearly labelled step (e.g. "Ask Clarifying Questions") and keep a concrete Defaults & Assumptions section. Orchestrated mode relies on both.

## Orchestrator

`/founder` lives in `skills/founder/`:
- `SKILL.md` — routing, consolidated intake, run folder, execution (parallel subagents or sequential), checkpoints, summary, write-back, resume
- `references/playbooks.md` — playbook definitions; edit this to add or change workflows
- `references/skill-catalog.md` — each skill's needs, produces, good_for
- `references/run-files.md` — templates for `brief.md`, `plan.md`, `SUMMARY.md`

It finds the other skills as siblings of its own folder (`<base dir>/../<skill>/SKILL.md`), which holds for `~/.claude/skills/`, project `.claude/skills/` and plugin installs.

`skills/founder-context/references/founder_context_template.md` is a copy of the root `FOUNDER_CONTEXT.md`, kept in sync by the sync script.

## Code Style

- Keep SKILL.md files focused and actionable
- Use clear, imperative instructions for Claude
- Include example outputs where helpful
- Reference FOUNDER_CONTEXT.md for business-specific context

## CLI Development

The CLI (`bin/cli.js`) handles:
- `install` - Copies skills to `~/.claude/skills/` + FOUNDER_CONTEXT.md to project root
- `list` - Shows available skills
- `--skill` flag - Selective installation (warns if `founder` is installed without the skills it runs)
- `--no-context` flag - Skip FOUNDER_CONTEXT.md creation
- `--force` flag - Overwrite installed skills. Without it, the CLI asks in a terminal and skips existing skills otherwise

The npm name `founder-skills` belongs to an unrelated package, so the CLI is run with `npx github:<owner>/founder-skills`. The help text derives that command from `repository.url` in `package.json`.

When modifying the CLI:
- Keep it dependency-free (Node.js built-ins only)
- Test both install and list commands
- Ensure error messages are helpful
