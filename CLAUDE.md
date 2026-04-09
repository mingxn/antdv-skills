# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repo Is

This repo generates and manages a Claude Code skill for the **Ant Design Vue** component library. The skill provides task-oriented guidance (not just raw API docs) — organized by what developers actually need: forms, tables, layouts, modals, theming, etc.

The generated skill lives in `.claude/skills/antdv/` and is automatically loaded by Claude when working with Ant Design Vue code.

## Key Command

**Regenerate the antdv skill from the upstream repo:**

```bash
pnpm run generate:antdv
```

This reads `repos/ant-design-vue/` (a cloned copy of vueComponent/ant-design-vue) and writes to `.claude/skills/antdv/`.

## Generated Output Structure

```
.claude/skills/antdv/
├── SKILL.md                          # Skill manifest: quick start, key patterns table, common pitfalls
├── GENERATION.md                     # Source SHA and generation stats
└── references/
    ├── data-entry-form.md            # Task-oriented: forms, validation, useForm
    ├── data-display-table.md         # Task-oriented: table patterns (sort, filter, edit, pagination)
    ├── feedback-modal-drawer.md      # Task-oriented: modal vs drawer, form-in-modal
    ├── layout-page-structure.md      # Task-oriented: Layout/Header/Sider/Content/Footer
    ├── ... (17 task-oriented files)  # Each has: when to use, curated demos, tips
    ├── getting-started.md            # Setup and configuration
    ├── theming-overview.md           # Design tokens, dark mode, ConfigProvider
    ├── theming-tokens.md             # Global token reference table
    ├── i18n.md                       # Locale configuration
    └── api/                          # Compact per-component API (props/events/slots only)
        ├── button.md
        ├── form.md
        ├── table.md
        └── ... (68 files)
```

## Architecture

The generation pipeline is `scripts/generate-antdv-skill.ts`:

1. **Component discovery** — scans `components/` dirs with `index.en-US.md`
2. **Groupings config** — hand-authored mapping of 68 components into ~17 task-oriented groups (e.g., form, table, modal+drawer, navigation)
3. **Task reference generator** — for each group, pulls "When to Use" from upstream docs, selects best demos by priority/order, adds narrative context
4. **API reference generator** — strips demos/narrative, keeps only props/events/slots tables
5. **Special references** — getting-started, theming, i18n from Vue docs; global tokens from TypeScript interfaces
6. **SKILL.md generator** — concise guide with quick start, patterns table, and pitfalls

Key design decisions:
- References are organized by **developer task** (not per-component) — Claude knows when/how to use patterns, not just what props exist
- Demos are **inlined** into task references (2-5 curated per group) rather than stored as separate files
- `api/` subdirectory provides **compact per-component lookup** as a secondary layer
- Groupings config (`GROUPS` array in the script) is ~200 lines and only changes when new components are added upstream
