#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');

const SKILLS_DIR = path.join(__dirname, '..', 'skills');
const PRODUCT_CONTEXT = path.join(__dirname, '..', 'PRODUCT_CONTEXT.md');
const TARGET_DIR = path.join(os.homedir(), '.claude', 'skills');
const TARGET_CONTEXT = path.join(process.cwd(), 'PRODUCT_CONTEXT.md'); // Project root
const LEGACY_CONTEXT = path.join(process.cwd(), 'FOUNDER_CONTEXT.md'); // Name used before v3
const LEGACY_SKILL = 'founder-context'; // Renamed to product-context in v3

// The package isn't published to npm (and the npm name "founder-skills" belongs to an unrelated package), so always run from GitHub
const RUN_COMMAND = (() => {
  try {
    const pkg = require('../package.json');
    const url = typeof pkg.repository === 'string' ? pkg.repository : pkg.repository.url;
    const match = url.match(/github\.com[/:]([^/]+\/[^/.]+)/);
    return match ? `npx github:${match[1]}` : 'node bin/cli.js';
  } catch (err) {
    return 'node bin/cli.js';
  }
})();

// The orchestrator skill, which runs the other skills
const ORCHESTRATOR = 'founder';

// Available skills
function getAvailableSkills() {
  try {
    return fs.readdirSync(SKILLS_DIR).filter(name => {
      const skillPath = path.join(SKILLS_DIR, name);
      return fs.statSync(skillPath).isDirectory() &&
             fs.existsSync(path.join(skillPath, 'SKILL.md'));
    });
  } catch (err) {
    return [];
  }
}

// Copy directory recursively
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Parse command line arguments
function parseArgs(args) {
  const result = {
    command: null,
    skills: [],
    noContext: false,
    force: false
  };

  let i = 0;
  while (i < args.length) {
    const arg = args[i];

    if (arg === 'install' || arg === 'list') {
      result.command = arg;
    } else if (arg === '--skill' || arg === '-s') {
      i++;
      if (i < args.length) {
        result.skills.push(args[i]);
      }
    } else if (arg === '--no-context') {
      result.noContext = true;
    } else if (arg === '--force' || arg === '-f') {
      result.force = true;
    } else if (!arg.startsWith('-')) {
      if (!result.command) {
        result.command = arg;
      }
    }
    i++;
  }

  return result;
}

// List available skills
function listSkills() {
  const skills = getAvailableSkills();

  console.log('\n📦 Available founder-suite skills:\n');

  if (skills.length === 0) {
    console.log('  No skills found.\n');
    return;
  }

  skills.forEach(skill => {
    const skillPath = path.join(SKILLS_DIR, skill, 'SKILL.md');
    const content = fs.readFileSync(skillPath, 'utf8');

    // Extract description from frontmatter
    const match = content.match(/description:\s*(.+)/);
    const description = match ? match[1].trim() : 'No description';

    console.log(`  • ${skill}`);
    console.log(`    ${description}\n`);
  });

  console.log(`Install all:     ${RUN_COMMAND} install`);
  console.log(`Install one:     ${RUN_COMMAND} install --skill sop-creator\n`);
}

// Ask a yes/no question; defaults to no
function confirm(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => {
    rl.question(`${question} [y/N] `, answer => {
      rl.close();
      resolve(/^y(es)?$/i.test(answer.trim()));
    });
  });
}

// Decide which already-installed skills may be overwritten
async function resolveOverwrites(skills, force) {
  const existing = skills.filter(skill => fs.existsSync(path.join(TARGET_DIR, skill)));
  if (existing.length === 0 || force) return skills;

  console.log(`\n⚠️  Already installed in ~/.claude/skills/: ${existing.join(', ')}`);
  console.log('   Overwriting replaces any local edits to those skills.');

  if (process.stdin.isTTY && await confirm('   Overwrite them?')) return skills;

  if (!process.stdin.isTTY) console.log('   Skipping them (use --force to overwrite).');
  return skills.filter(skill => !existing.includes(skill));
}

// Install skills
async function installSkills(selectedSkills, noContext = false, force = false) {
  const availableSkills = getAvailableSkills();

  // If no specific skills selected, install all
  const skillsToInstall = selectedSkills.length > 0
    ? selectedSkills.filter(s => availableSkills.includes(s))
    : availableSkills;

  // Check for invalid skill names
  if (selectedSkills.length > 0) {
    const invalid = selectedSkills.filter(s => !availableSkills.includes(s));
    if (invalid.length > 0) {
      console.log(`\n⚠️  Unknown skills: ${invalid.join(', ')}`);
      console.log(`   Available: ${availableSkills.join(', ')}\n`);
    }
  }

  if (skillsToInstall.length === 0) {
    console.log('\n❌ No valid skills to install.\n');
    listSkills();
    return;
  }

  if (selectedSkills.includes(ORCHESTRATOR) && skillsToInstall.length < availableSkills.length) {
    const missing = availableSkills.filter(s =>
      s !== ORCHESTRATOR && !skillsToInstall.includes(s) && !fs.existsSync(path.join(TARGET_DIR, s))
    );
    if (missing.length > 0) {
      console.log(`\nℹ️  /${ORCHESTRATOR} runs the other skills. Playbook steps for these will be skipped until installed:`);
      console.log(`   ${missing.join(', ')}`);
    }
  }

  const toCopy = await resolveOverwrites(skillsToInstall, force);
  const skipped = skillsToInstall.filter(skill => !toCopy.includes(skill));

  console.log('\n🚀 Installing founder-suite skills...\n');

  // Ensure target directory exists
  fs.mkdirSync(TARGET_DIR, { recursive: true });

  // Copy each skill
  console.log('Skills (global ~/.claude/skills/):');
  skipped.forEach(skill => console.log(`  ⏭️  ${skill} (already installed, kept)`));
  toCopy.forEach(skill => {
    const src = path.join(SKILLS_DIR, skill);
    const dest = path.join(TARGET_DIR, skill);

    try {
      // Replace rather than merge, so files removed upstream don't linger in references/
      fs.rmSync(dest, { recursive: true, force: true });
      copyDir(src, dest);
      console.log(`  ✅ ${skill}`);
    } catch (err) {
      console.log(`  ❌ ${skill} - ${err.message}`);
    }
  });

  if (fs.existsSync(path.join(TARGET_DIR, LEGACY_SKILL))) {
    console.log(`\nℹ️  ~/.claude/skills/${LEGACY_SKILL} is from an older version; it was renamed to product-context. You can delete it.`);
  }

  // Copy PRODUCT_CONTEXT.md to project root if not skipped
  if (!noContext) {
    console.log('\nProduct Context (project root):');
    if (fs.existsSync(TARGET_CONTEXT)) {
      console.log(`  📄 ./PRODUCT_CONTEXT.md already exists (not overwritten)`);
    } else if (fs.existsSync(LEGACY_CONTEXT)) {
      console.log(`  📄 Found ./FOUNDER_CONTEXT.md from an older version (not touched).`);
      console.log(`     Run /product-context migrate to move it to PRODUCT_CONTEXT.md and seat your board.`);
    } else {
      try {
        fs.copyFileSync(PRODUCT_CONTEXT, TARGET_CONTEXT);
        console.log(`  ✅ Created ./PRODUCT_CONTEXT.md`);
        console.log(`     Run /product-context to fill it in (scale profile, product idea, board), or edit it by hand.`);
      } catch (err) {
        console.log(`  ⚠️  Could not copy PRODUCT_CONTEXT.md - ${err.message}`);
      }
    }
  }

  console.log('\n✨ Installation complete!\n');
  console.log('Usage in Claude Code:');
  toCopy.forEach(skill => {
    console.log(`  /${skill}`);
  });
  console.log('');
}

// Show help
function showHelp() {
  console.log(`
founder-suite - Claude Code skills for founders, with a /founder orchestrator

Prefer the plugin? In Claude Code: /plugin marketplace add Awesomer9561/founder-skills

Usage:
  ${RUN_COMMAND} <command> [options]

Commands:
  install              Install skills + PRODUCT_CONTEXT.md template
  list                 List available skills

Options:
  --skill, -s <name>   Install specific skill(s)
                       Can be used multiple times
  --no-context         Skip creating PRODUCT_CONTEXT.md
  --force, -f          Overwrite skills that are already installed

Examples:
  ${RUN_COMMAND} install
  ${RUN_COMMAND} install --skill sop-creator
  ${RUN_COMMAND} install -s sop-creator -s linkedin-writer
  ${RUN_COMMAND} install --no-context
  ${RUN_COMMAND} install --force
  ${RUN_COMMAND} list

Skills are installed globally to ~/.claude/skills/
PRODUCT_CONTEXT.md is created in your current directory (project root)
Run /product-context in Claude Code to fill it in from your website or a few questions
`);
}

// Main
async function main() {
  const args = process.argv.slice(2);
  const { command, skills, noContext, force } = parseArgs(args);

  switch (command) {
    case 'install':
      await installSkills(skills, noContext, force);
      break;
    case 'list':
      listSkills();
      break;
    case 'help':
    case '--help':
    case '-h':
      showHelp();
      break;
    default:
      if (!command) {
        showHelp();
      } else {
        console.log(`\n❌ Unknown command: ${command}\n`);
        showHelp();
      }
  }
}

main().catch(err => {
  console.error(`\n❌ ${err.message}\n`);
  process.exit(1);
});
