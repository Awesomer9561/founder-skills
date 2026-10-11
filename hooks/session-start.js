#!/usr/bin/env node

// SessionStart hook for the founder-suite plugin.
// Adds a short note to Claude's context when the project's PRODUCT_CONTEXT.md is
// still the unfilled template or has no scale profile, when only the older
// FOUNDER_CONTEXT.md exists, or when a /founder run has unfinished steps.
// Prints nothing in projects that don't use founder-suite, and never fails the session.

const fs = require('fs');
const path = require('path');

const PLUGIN = 'founder-suite';
const PLACEHOLDER = '[Your company name]';
const PROFILE_SET = /\*\*Scale profile\*\*:\s*(bootstrapped|startup|corporate)\b/i;
const UNFINISHED = /\|\s*(pending|running|blocked|failed|stale)\s*\|/g;
const MAX_RUNS = 50;

function readIfExists(file) {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch (err) {
    return null;
  }
}

// Most recently modified run whose plan.md still has unfinished steps
function findUnfinishedRun(runsDir) {
  let entries;
  try {
    entries = fs.readdirSync(runsDir, { withFileTypes: true }).filter(e => e.isDirectory());
  } catch (err) {
    return null;
  }

  const runs = entries
    .map(e => {
      const plan = path.join(runsDir, e.name, 'plan.md');
      try {
        return { id: e.name, plan, mtime: fs.statSync(plan).mtimeMs };
      } catch (err) {
        return null;
      }
    })
    .filter(Boolean)
    .sort((a, b) => b.mtime - a.mtime)
    .slice(0, MAX_RUNS);

  for (const run of runs) {
    const steps = (readIfExists(run.plan) || '').match(UNFINISHED);
    if (steps) return { id: run.id, count: steps.length };
  }
  return null;
}

function main() {
  const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
  const notes = [];

  const context = readIfExists(path.join(projectDir, 'PRODUCT_CONTEXT.md'));
  const legacy = context === null ? readIfExists(path.join(projectDir, 'FOUNDER_CONTEXT.md')) : null;
  if (legacy !== null) {
    notes.push(`This project has an older FOUNDER_CONTEXT.md and no PRODUCT_CONTEXT.md. Skills still read it, but if the user asks for founder, marketing or product work, suggest /${PLUGIN}:product-context migrate (it moves the file and adds the scale profile and board).`);
  } else if (context !== null && context.includes(PLACEHOLDER)) {
    notes.push(`PRODUCT_CONTEXT.md in this project is still the unfilled template. If the user asks for founder, marketing or product work, suggest running /${PLUGIN}:product-context first (it fills the file from their website or a few questions).`);
  } else if (context !== null && !PROFILE_SET.test(context)) {
    notes.push(`PRODUCT_CONTEXT.md in this project has no scale profile yet. Before founder-suite work, suggest /${PLUGIN}:product-context so every skill uses the same profile and board.`);
  }

  const run = findUnfinishedRun(path.join(projectDir, 'founder_outputs', 'runs'));
  if (run) {
    notes.push(`The /founder run "${run.id}" has ${run.count} unfinished step(s). If the user picks that work back up, mention /${PLUGIN}:founder resume.`);
  }

  if (notes.length === 0) return;

  process.stdout.write(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'SessionStart',
      additionalContext: `[${PLUGIN}] ${notes.join(' ')}`
    }
  }));
}

try {
  main();
} catch (err) {
  // A reminder is never worth breaking session start
}
