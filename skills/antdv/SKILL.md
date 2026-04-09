---
name: antdv
description: Ant Design Vue 4.x component library for Vue 3. Use when building UIs with Ant Design Vue — forms, tables, layouts, modals, theming, and all component patterns.
metadata:
  author: Ant Design Vue team
  version: "2026-04-09"
  source: Generated from https://github.com/vueComponent/ant-design-vue
---

# Ant Design Vue 4.x

Enterprise-class UI components for Vue 3, based on Ant Design.

## Quick Start

```bash
npm i ant-design-vue@4.x
```

```vue
<script setup>
import { Button } from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
</script>
<template>
  <a-button type="primary">Hello</a-button>
</template>
```

**Global registration** (main.ts):
```ts
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
app.use(Antd);
```

## Key Patterns

| Pattern | When to Use | Reference |
|---------|-------------|-----------|
| Page Layout | Page structure with header, sidebar, content, and footer using Layout components | [layout-page-structure](references/layout-page-structure.md) |
| Grid System & Spacing | Responsive 24-column grid, Flex layout, and Space for element spacing | [layout-grid](references/layout-grid.md) |
| Navigation | Menu, breadcrumb, pagination, anchor, steps, and other navigation components | [layout-navigation](references/layout-navigation.md) |
| Forms & Validation | Form layout, validation rules, dynamic fields, useForm composition API, and form patterns | [data-entry-form](references/data-entry-form.md) |
| Text & Number Input | Input, InputNumber, Textarea, AutoComplete, and Mentions components | [data-entry-input](references/data-entry-input.md) |
| Selection Components | Select dropdown, Cascader, TreeSelect, and Transfer for choosing from options | [data-entry-select](references/data-entry-select.md) |
| Date & Time Pickers | DatePicker, TimePicker, RangePicker, and Calendar for temporal data entry | [data-entry-date-time](references/data-entry-date-time.md) |
| Toggle & Choice Controls | Checkbox, Radio, Switch, Rate, Slider, and Segmented for boolean/choice input | [data-entry-toggle](references/data-entry-toggle.md) |
| File Upload | Upload component with drag-and-drop, file list, and custom upload patterns | [data-entry-upload](references/data-entry-upload.md) |
| Data Tables | Table component with sorting, filtering, pagination, row selection, editable cells, and virtual scroll | [data-display-table](references/data-display-table.md) |
| Lists, Cards & Panels | List, Card, Descriptions, Collapse, and Tabs for structured content display | [data-display-list](references/data-display-list.md) |
| Tree Views | Tree and TreeSelect for hierarchical data display and selection | [data-display-tree](references/data-display-tree.md) |
| Data Display Components | Avatar, Badge, Tag, Statistic, Empty, QRCode, Image, Carousel, Timeline, Comment, Typography, Skeleton | [data-display-misc](references/data-display-misc.md) |
| Modal & Drawer | Modal dialogs and Drawer panels for overlays, confirmations, and side forms | [feedback-modal-drawer](references/feedback-modal-drawer.md) |
| Messages & Notifications | Message toasts and Notification panels for user feedback | [feedback-message](references/feedback-message.md) |
| Inline Feedback & Overlays | Alert, Result, Progress, Spin, Popconfirm, Tooltip, Popover, and Tour components | [feedback-inline](references/feedback-inline.md) |
| Utility & General Components | Button, Divider, Watermark, FloatButton, App, Icon, and ConfigProvider | [misc-components](references/misc-components.md) |
| Theming | Custom colors, dark mode, design tokens | [theming-overview](references/theming-overview.md) |
| Token Reference | All global design token definitions | [theming-tokens](references/theming-tokens.md) |
| i18n | Locale configuration | [i18n](references/i18n.md) |
| Getting Started | Installation, setup, configuration | [getting-started](references/getting-started.md) |

## Component API Lookup

For detailed props, events, and slots of any specific component, see `references/api/<component-name>.md`.

## Common Pitfalls

- **v-model syntax**: Use `v-model:value` for most components. Checkbox and Switch use `v-model:checked`.
- **Form validation**: `name` on `<a-form-item>` must match a key in the `:model` object.
- **Table key**: Always provide `rowKey` or include `key` in data objects.
- **CSS reset**: Import `ant-design-vue/dist/reset.css` — without it, styles break.
- **Tree-shaking**: Import individual components (`import { Button } from 'ant-design-vue'`) for smaller bundles.
- **Date objects**: DatePicker values are dayjs objects, not strings. Use `type: 'object'` in form validation rules for date fields.
- **Icons**: Import from `@ant-design/icons-vue`, not from ant-design-vue directly.
