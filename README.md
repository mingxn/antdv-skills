# antdv-skills

An agent skill generator for the [Ant Design Vue](https://github.com/vueComponent/ant-design-vue) component library. Produces task-oriented guidance organized by what developers actually need — forms, tables, layouts, modals, theming, and more.

Compatible with Antigravity (`.agents/skills/`) and Claude Code (`.claude/skills/`).

## Setup

```bash
pnpm install
git clone https://github.com/vueComponent/ant-design-vue.git repos/ant-design-vue
```

## Usage

Generate the skill:

```bash
pnpm run generate:antdv
```

This reads `repos/ant-design-vue/` and writes the skill to both `.claude/skills/antdv/` and `.agents/skills/antdv/`.

## Output Structure

The generated skill includes:

- **SKILL.md** — Skill manifest with quick start, key patterns, and common pitfalls
- **references/** — Task-oriented guides (forms, tables, modals, layout, etc.) with curated demos
- **references/api/** — Compact per-component API reference (props, events, slots)

## How It Works

The generation pipeline (`scripts/generate-antdv-skill.ts`):

1. Discovers components from the upstream repo's `components/` directory
2. Groups 68 components into ~17 task-oriented categories
3. Generates task references with "When to Use" guidance and curated demos
4. Extracts compact API references (props/events/slots only)
5. Produces special references for getting started, theming, and i18n
