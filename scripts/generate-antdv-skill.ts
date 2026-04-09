import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { basename, join, resolve } from 'node:path'
import { parseArgs } from 'node:util'
import matter from 'gray-matter'

// ─── CLI args ───────────────────────────────────────────────────────────────

const REMOTE_URL = 'https://github.com/vueComponent/ant-design-vue.git'
const DEFAULT_REPO = 'repos/ant-design-vue'

const { values: args } = parseArgs({
  options: {
    repo: { type: 'string', default: DEFAULT_REPO },
    lang: { type: 'string', default: 'en' },
    out: { type: 'string', default: 'skills/antdv' },
  },
})

const REPO = resolve(args.repo!)
const OUT = resolve(args.out!)
const LANG_SUFFIX = 'en-US'

if (!existsSync(REPO)) {
  console.log(`Repo not found at ${REPO}, cloning from ${REMOTE_URL}...`)
  execSync(`git clone --depth 1 ${REMOTE_URL} ${REPO}`, { stdio: 'inherit' })
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function mkdirp(dir: string) {
  mkdirSync(dir, { recursive: true })
}

function getGitSha(repoPath: string): string {
  return execSync('git rev-parse HEAD', { cwd: repoPath, encoding: 'utf-8' }).trim()
}

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

function stripChinese(md: string): string {
  const lines = md.split('\n')
  const result: string[] = []
  let inZhSection = false

  for (const line of lines) {
    if (/^##\s+zh-CN/i.test(line)) { inZhSection = true; continue }
    if (/^##\s+en-US/i.test(line)) { inZhSection = false; continue }
    if (inZhSection) continue
    result.push(line)
  }

  return result.join('\n')
}

function pascalCase(str: string): string {
  return str.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')
}

function hasCJK(str: string): boolean {
  return /[\u4e00-\u9fff\u3400-\u4dbf]/.test(str)
}

// ─── SFC Demo parsing ──────────────────────────────────────────────────────

interface DemoInfo {
  title: string
  description: string
  source: string
  order: number
}

function parseSfcDemo(content: string, fallbackName: string): DemoInfo | null {
  let title = fallbackName
  let description = ''
  let order = 99
  let sfcBody = content

  const docsMatch = content.match(/<docs>([\s\S]*?)<\/docs>/)
  if (docsMatch) {
    const docsContent = docsMatch[1]
    sfcBody = content.replace(/<docs>[\s\S]*?<\/docs>\s*/, '')

    try {
      const parsed = matter(docsContent.trim())
      const data = parsed.data as Record<string, any>

      if (data.order != null) order = Number(data.order)

      if (data.title) {
        if (typeof data.title === 'object' && data.title['en-US']) {
          title = data.title['en-US']
        } else if (typeof data.title === 'string') {
          title = data.title
        }
      }

      const body = parsed.content
      const enMatch = body.match(/##\s+en-US\s*\n([\s\S]*?)(?=\n##\s|$)/)
      if (enMatch) {
        description = enMatch[1].trim()
      }
    } catch {
      const titleMatch = docsContent.match(/en-US:\s*(.+)/)
      if (titleMatch) title = titleMatch[1].trim()
    }
  }

  sfcBody = sfcBody.trim()
  if (!sfcBody) return null

  return { title, description, source: sfcBody, order }
}

// ─── Component Discovery ────────────────────────────────────────────────────

function discoverComponents(repoPath: string): string[] {
  const componentsDir = join(repoPath, 'components')
  const entries = readdirSync(componentsDir)
  const components: string[] = []

  for (const entry of entries) {
    const dir = join(componentsDir, entry)
    if (!statSync(dir).isDirectory()) continue
    if (entry.startsWith('_') || entry.startsWith('vc-') || entry === 'style' || entry === 'theme' || entry === 'locale' || entry === 'locale-provider' || entry === '__tests__') continue
    const docFile = join(dir, `index.${LANG_SUFFIX}.md`)
    if (existsSync(docFile)) {
      components.push(entry)
    }
  }

  return components.sort()
}

// ─── Parse component docs ──────────────────────────────────────────────────

interface ComponentData {
  name: string
  title: string
  description: string
  whenToUse: string
  apiSection: string
  fullContent: string
  demos: DemoInfo[]
}

function parseComponentData(repoPath: string, componentName: string): ComponentData {
  const docFile = join(repoPath, 'components', componentName, `index.${LANG_SUFFIX}.md`)
  const raw = readFileSync(docFile, 'utf-8')
  const { data, content } = matter(raw)

  const title = (data.title as string) || componentName
  const firstPara = content.trim().split('\n\n')[0]?.trim() || ''

  // Extract "When To Use" section
  const whenMatch = content.match(/##\s+When\s+To?\s+Use\s*\n([\s\S]*?)(?=\n##\s|$)/i)
  const whenToUse = whenMatch ? whenMatch[1].trim() : ''

  // Extract API section (everything from ## API onward)
  const apiIndex = content.search(/^## API/m)
  const apiSection = apiIndex >= 0 ? content.slice(apiIndex).trim() : ''

  // Parse demos
  const demos = parseDemos(repoPath, componentName)

  return {
    name: componentName,
    title,
    description: firstPara,
    whenToUse,
    apiSection,
    fullContent: content,
    demos,
  }
}

function parseDemos(repoPath: string, componentName: string): DemoInfo[] {
  const demoDir = join(repoPath, 'components', componentName, 'demo')
  if (!existsSync(demoDir)) return []

  const files = readdirSync(demoDir).filter(f => f.endsWith('.vue') && f !== 'index.vue')
  const results: DemoInfo[] = []

  for (const file of files) {
    const raw = readFileSync(join(demoDir, file), 'utf-8')
    const name = basename(file, '.vue')
    const demo = parseSfcDemo(raw, name)
    if (!demo) continue
    results.push(demo)
  }

  results.sort((a, b) => a.order - b.order)
  return results
}

// ─── Token extraction ──────────────────────────────────────────────────────

interface TokenInfo {
  name: string
  type: string
  description: string
}

function extractJsdocDesc(jsdoc: string | undefined): string {
  if (!jsdoc) return '-'
  const descEnMatch = jsdoc.match(/@descEN\s+([\s\S]*?)(?=@\w|$)/)
  if (descEnMatch) return descEnMatch[1].replace(/\s*\*\s*/g, ' ').trim()
  const descMatch = jsdoc.match(/@desc\s+([\s\S]*?)(?=@\w|$)/)
  if (descMatch) {
    const text = descMatch[1].replace(/\s*\*\s*/g, ' ').trim()
    if (!hasCJK(text)) return text
  }
  const plain = jsdoc.replace(/@\w+\s+[\s\S]*?(?=@\w|$)/g, '').replace(/\s*\*\s*/g, ' ').trim()
  if (plain && !hasCJK(plain)) return plain
  return '-'
}

function parseTokensFromTS(content: string): TokenInfo[] {
  const tokens: TokenInfo[] = []
  const interfaceMatch = content.match(/interface\s+ComponentToken\s*(?:extends\s+[^{]*)?\{([\s\S]*?)\n\}/)
  if (!interfaceMatch) return tokens

  const body = interfaceMatch[1]
  const propRegex = /(?:\/\*\*\s*([\s\S]*?)\s*\*\/\s*)?([\w]+)\s*[?]?\s*:\s*([^;\n]+)/g
  let match: RegExpExecArray | null

  while ((match = propRegex.exec(body)) !== null) {
    tokens.push({ name: match[2], type: match[3].trim(), description: extractJsdocDesc(match[1]) })
  }

  return tokens
}

function extractComponentTokens(repoPath: string, componentName: string): TokenInfo[] {
  const possiblePaths = [
    join(repoPath, 'components', componentName, 'style', 'index.ts'),
    join(repoPath, 'components', componentName, 'style', 'index.tsx'),
  ]

  for (const tokenPath of possiblePaths) {
    if (!existsSync(tokenPath)) continue
    return parseTokensFromTS(readFileSync(tokenPath, 'utf-8'))
  }

  return []
}

// ─── Global token extraction ────────────────────────────────────────────────

interface GlobalTokenInfo {
  name: string
  type: string
  source: string
  description: string
}

function extractGlobalTokens(repoPath: string): GlobalTokenInfo[] {
  const tokens: GlobalTokenInfo[] = []
  const interfaceDir = join(repoPath, 'components', 'theme', 'interface')
  if (!existsSync(interfaceDir)) return tokens

  function collectTsFiles(dir: string): string[] {
    const results: string[] = []
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry)
      if (statSync(full).isDirectory()) {
        results.push(...collectTsFiles(full))
      } else if (entry.endsWith('.ts') && entry !== 'index.ts') {
        results.push(full)
      }
    }
    return results
  }

  for (const filePath of collectTsFiles(interfaceDir)) {
    const content = readFileSync(filePath, 'utf-8')
    const fileName = basename(filePath, '.ts')
    let source = pascalCase(fileName)
    if (fileName === 'seeds') source = 'Seed'
    else if (fileName === 'alias') source = 'Alias'
    else source = 'Map'

    const interfaceRegex = /export\s+interface\s+\w+(?:Token|Type)\s*(?:extends\s+[^{]*)?\{([\s\S]*?)\n\}/g
    let ifMatch: RegExpExecArray | null

    while ((ifMatch = interfaceRegex.exec(content)) !== null) {
      const body = ifMatch[1]
      const propRegex = /(?:\/\*\*\s*([\s\S]*?)\s*\*\/\s*)?([\w]+)\s*[?]?\s*:\s*([^;\n]+)/g
      let propMatch: RegExpExecArray | null

      while ((propMatch = propRegex.exec(body)) !== null) {
        tokens.push({
          name: propMatch[2],
          type: propMatch[3].trim(),
          source,
          description: extractJsdocDesc(propMatch[1]),
        })
      }
    }
  }

  return tokens
}

// ─── Groupings config ──────────────────────────────────────────────────────

interface ReferenceGroup {
  slug: string
  title: string
  description: string
  components: string[]
  /** Max demos to inline per component (default 3) */
  maxDemos: number
  /** Preferred demo names per component (by priority) */
  demoPriority?: Record<string, string[]>
  /** Extra narrative to prepend after "When to Use" */
  extraNarrative?: string
}

const GROUPS: ReferenceGroup[] = [
  {
    slug: 'layout-page-structure',
    title: 'Page Layout',
    description: 'Page structure with header, sidebar, content, and footer using Layout components',
    components: ['layout'],
    maxDemos: 3,
    demoPriority: { layout: ['basic', 'side', 'top-side-2', 'responsive'] },
    extraNarrative: `Layout uses a flex-based structure: \`<a-layout>\` wraps \`<a-layout-header>\`, \`<a-layout-sider>\`, \`<a-layout-content>\`, and \`<a-layout-footer>\`. Nest \`<a-layout>\` inside \`<a-layout>\` for sidebar layouts.`,
  },
  {
    slug: 'layout-grid',
    title: 'Grid System & Spacing',
    description: 'Responsive 24-column grid, Flex layout, and Space for element spacing',
    components: ['grid', 'flex', 'space'],
    maxDemos: 2,
    demoPriority: { grid: ['basic', 'responsive'], flex: ['basic', 'gap'], space: ['basic'] },
    extraNarrative: `Grid uses a 24-column system: \`<a-row>\` + \`<a-col :span="N">\`. Use \`:gutter\` for spacing. Flex component is for CSS flexbox shortcuts. Space is for inline element gaps.`,
  },
  {
    slug: 'layout-navigation',
    title: 'Navigation',
    description: 'Menu, breadcrumb, pagination, anchor, steps, and other navigation components',
    components: ['menu', 'breadcrumb', 'dropdown', 'page-header', 'pagination', 'anchor', 'affix', 'steps'],
    maxDemos: 2,
    demoPriority: {
      menu: ['horizontal', 'inline', 'sider-current'],
      breadcrumb: ['basic'],
      dropdown: ['basic'],
      pagination: ['basic'],
      steps: ['simple'],
    },
  },
  {
    slug: 'data-entry-form',
    title: 'Forms & Validation',
    description: 'Form layout, validation rules, dynamic fields, useForm composition API, and form patterns',
    components: ['form'],
    maxDemos: 4,
    demoPriority: { form: ['basic', 'validation', 'dynamic-form-item', 'useForm-basic', 'form-in-modal'] },
    extraNarrative: `**Key concepts:**
- Bind form data with \`:model="formState"\` on \`<a-form>\`
- Each \`<a-form-item name="fieldName">\` must match a key in the model object
- Rules can be inline on FormItem or centralized via \`:rules\` on Form
- Use \`v-model:value\` for most inputs, \`v-model:checked\` for Checkbox/Switch
- Call \`formRef.validate()\` to trigger validation programmatically
- Use \`Form.useForm()\` for composition API validation without Form component`,
  },
  {
    slug: 'data-entry-input',
    title: 'Text & Number Input',
    description: 'Input, InputNumber, Textarea, AutoComplete, and Mentions components',
    components: ['input', 'input-number', 'auto-complete', 'mentions'],
    maxDemos: 2,
    demoPriority: {
      input: ['basic', 'presuffix', 'addon', 'search-input'],
      'input-number': ['basic'],
      'auto-complete': ['basic'],
      mentions: ['basic'],
    },
  },
  {
    slug: 'data-entry-select',
    title: 'Selection Components',
    description: 'Select dropdown, Cascader, TreeSelect, and Transfer for choosing from options',
    components: ['select', 'cascader', 'tree-select', 'transfer'],
    maxDemos: 2,
    demoPriority: {
      select: ['basic', 'search', 'multiple', 'tags'],
      cascader: ['basic'],
      'tree-select': ['basic'],
      transfer: ['basic'],
    },
    extraNarrative: `**When to use which:**
- **Select**: single or multiple choice from a flat list of options
- **Cascader**: hierarchical/nested options (e.g., country > city > district)
- **TreeSelect**: tree-structured data with expand/collapse
- **Transfer**: move items between two lists (e.g., assign permissions)`,
  },
  {
    slug: 'data-entry-date-time',
    title: 'Date & Time Pickers',
    description: 'DatePicker, TimePicker, RangePicker, and Calendar for temporal data entry',
    components: ['date-picker', 'time-picker', 'calendar'],
    maxDemos: 2,
    demoPriority: {
      'date-picker': ['basic', 'range-picker'],
      'time-picker': ['basic'],
      calendar: ['basic'],
    },
    extraNarrative: `DatePicker uses dayjs by default. Import type \`Dayjs\` for TypeScript. Use \`<a-range-picker>\` for date ranges. For form validation with dates, set rule \`type: 'object'\` since dayjs values are objects.`,
  },
  {
    slug: 'data-entry-toggle',
    title: 'Toggle & Choice Controls',
    description: 'Checkbox, Radio, Switch, Rate, Slider, and Segmented for boolean/choice input',
    components: ['checkbox', 'radio', 'switch', 'rate', 'slider', 'segmented'],
    maxDemos: 2,
    demoPriority: {
      checkbox: ['basic', 'group'],
      radio: ['basic', 'radiogroup'],
      switch: ['basic'],
      rate: ['basic'],
      slider: ['basic'],
      segmented: ['basic'],
    },
    extraNarrative: `**v-model binding:** Checkbox and Switch use \`v-model:checked\`, not \`v-model:value\`. Radio, Rate, Slider, and Segmented use \`v-model:value\`.`,
  },
  {
    slug: 'data-entry-upload',
    title: 'File Upload',
    description: 'Upload component with drag-and-drop, file list, and custom upload patterns',
    components: ['upload'],
    maxDemos: 3,
    demoPriority: { upload: ['basic', 'drag', 'avatar', 'picture-card'] },
  },
  {
    slug: 'data-display-table',
    title: 'Data Tables',
    description: 'Table component with sorting, filtering, pagination, row selection, editable cells, and virtual scroll',
    components: ['table'],
    maxDemos: 5,
    demoPriority: { table: ['basic', 'head', 'row-selection', 'edit-cell', 'ajax', 'fixed-header', 'big-data'] },
    extraNarrative: `**Key patterns:**
- Always provide \`rowKey\` (or \`key\` in data) to avoid rendering issues
- Use \`#bodyCell="{ column, record }"\` slot for custom cell rendering
- Use \`#headerCell="{ column }"\` slot for custom header rendering
- Columns define \`sorter\`, \`filters\`, \`customFilterDropdown\` for interactive features
- \`:pagination="{ pageSize: 10 }"\` or \`:pagination="false"\` to control pagination
- \`:scroll="{ y: 400 }"\` for fixed header, \`:scroll="{ x: 1500 }"\` for horizontal scroll`,
  },
  {
    slug: 'data-display-list',
    title: 'Lists, Cards & Panels',
    description: 'List, Card, Descriptions, Collapse, and Tabs for structured content display',
    components: ['list', 'card', 'descriptions', 'collapse', 'tabs'],
    maxDemos: 2,
    demoPriority: {
      list: ['basic', 'vertical'],
      card: ['basic', 'grid-card'],
      descriptions: ['basic'],
      collapse: ['basic'],
      tabs: ['basic', 'card'],
    },
  },
  {
    slug: 'data-display-tree',
    title: 'Tree Views',
    description: 'Tree and TreeSelect for hierarchical data display and selection',
    components: ['tree', 'tree-select'],
    maxDemos: 2,
    demoPriority: {
      tree: ['basic', 'draggable'],
      'tree-select': ['basic'],
    },
  },
  {
    slug: 'data-display-misc',
    title: 'Data Display Components',
    description: 'Avatar, Badge, Tag, Statistic, Empty, QRCode, Image, Carousel, Timeline, Comment, Typography, Skeleton',
    components: ['avatar', 'badge', 'tag', 'statistic', 'empty', 'qrcode', 'image', 'carousel', 'timeline', 'comment', 'typography', 'skeleton'],
    maxDemos: 1,
    demoPriority: {
      avatar: ['basic'],
      badge: ['basic'],
      tag: ['basic', 'colorful'],
      statistic: ['basic'],
      image: ['basic'],
      carousel: ['basic'],
      typography: ['basic'],
    },
  },
  {
    slug: 'feedback-modal-drawer',
    title: 'Modal & Drawer',
    description: 'Modal dialogs and Drawer panels for overlays, confirmations, and side forms',
    components: ['modal', 'drawer'],
    maxDemos: 3,
    demoPriority: {
      modal: ['basic', 'confirm', 'async', 'footer'],
      drawer: ['basic', 'form-in-drawer', 'multi-level-drawer'],
    },
    extraNarrative: `**When to use which:**
- **Modal**: confirmations, short forms, critical actions that need attention
- **Drawer**: editing forms, detail panels, subtasks that keep main context visible

**Imperative confirmation:** Use \`Modal.confirm()\`, \`Modal.info()\`, \`Modal.success()\`, \`Modal.error()\`, \`Modal.warning()\` for programmatic dialogs without template.

**Form in Modal/Drawer:** Set \`destroyOnClose\` to reset form state, or manually call \`formRef.resetFields()\` on close.`,
  },
  {
    slug: 'feedback-message',
    title: 'Messages & Notifications',
    description: 'Message toasts and Notification panels for user feedback',
    components: ['message', 'notification'],
    maxDemos: 2,
    demoPriority: {
      message: ['info', 'other', 'loading', 'hook'],
      notification: ['basic', 'with-icon', 'hook'],
    },
    extraNarrative: `**When to use which:**
- **Message**: brief, auto-dismissing feedback at top-center (success/error/info/warning/loading)
- **Notification**: richer feedback at viewport corner, supports title + description + actions

**Recommended pattern:** Use hooks API (\`message.useMessage()\`, \`notification.useNotification()\`) to get context support. Place the \`contextHolder\` in your template.

\`\`\`vue
<script setup>
import { message } from 'ant-design-vue';
const [messageApi, contextHolder] = message.useMessage();
const showSuccess = () => messageApi.success('Done!');
</script>
<template>
  <component :is="contextHolder" />
  <a-button @click="showSuccess">Success</a-button>
</template>
\`\`\``,
  },
  {
    slug: 'feedback-inline',
    title: 'Inline Feedback & Overlays',
    description: 'Alert, Result, Progress, Spin, Popconfirm, Tooltip, Popover, and Tour components',
    components: ['alert', 'result', 'progress', 'spin', 'popconfirm', 'tooltip', 'popover', 'tour'],
    maxDemos: 1,
    demoPriority: {
      alert: ['basic'],
      result: ['success'],
      progress: ['line'],
      spin: ['basic'],
      popconfirm: ['basic'],
      tooltip: ['basic'],
      popover: ['basic'],
      tour: ['basic'],
    },
    extraNarrative: `**When to use which overlay:**
- **Tooltip**: brief text hint on hover
- **Popover**: richer content (title + body) on hover/click
- **Popconfirm**: yes/no confirmation before an action`,
  },
  {
    slug: 'misc-components',
    title: 'Utility & General Components',
    description: 'Button, Divider, Watermark, FloatButton, App, Icon, and ConfigProvider',
    components: ['button', 'divider', 'watermark', 'float-button', 'app', 'icon', 'config-provider'],
    maxDemos: 2,
    demoPriority: {
      button: ['basic', 'icon', 'loading'],
      divider: ['basic'],
      'float-button': ['basic'],
      icon: ['basic'],
    },
    extraNarrative: `**Button types:** \`primary\`, \`default\`, \`dashed\`, \`text\`, \`link\`. Add \`danger\` prop for destructive actions. Use \`html-type="submit"\` in forms.

**Icons:** Import from \`@ant-design/icons-vue\`. Example: \`import { SearchOutlined } from '@ant-design/icons-vue'\`.`,
  },
]

// ─── Vue docs (getting-started, theming, i18n) ────────────────────────────

function loadVueDoc(repoPath: string, name: string): string | null {
  const filePath = join(repoPath, 'site', 'src', 'vueDocs', `${name}.${LANG_SUFFIX}.md`)
  if (!existsSync(filePath)) return null
  const raw = readFileSync(filePath, 'utf-8')
  const { content } = matter(raw)
  return stripChinese(content).trim()
}

// ─── Generate task-oriented reference ──────────────────────────────────────

function generateTaskReference(
  group: ReferenceGroup,
  componentDataMap: Map<string, ComponentData>,
): string {
  const lines: string[] = []

  lines.push(`---`)
  lines.push(`name: ${group.slug}`)
  lines.push(`description: ${group.description}`)
  lines.push(`---`)
  lines.push(``)
  lines.push(`# ${group.title}`)
  lines.push(``)

  // When to Use - aggregate from all components
  const whenSections: string[] = []
  for (const comp of group.components) {
    const data = componentDataMap.get(comp)
    if (data?.whenToUse) {
      if (group.components.length > 1) {
        whenSections.push(`**${data.title}:** ${data.whenToUse}`)
      } else {
        whenSections.push(data.whenToUse)
      }
    }
  }
  if (whenSections.length > 0) {
    lines.push(`## When to Use`)
    lines.push(``)
    lines.push(whenSections.join('\n\n'))
    lines.push(``)
  }

  // Extra narrative
  if (group.extraNarrative) {
    lines.push(group.extraNarrative)
    lines.push(``)
  }

  // Components covered
  const componentNames = group.components
    .map(c => componentDataMap.get(c)?.title || pascalCase(c))
    .join(', ')
  lines.push(`## Components`)
  lines.push(``)
  lines.push(componentNames)
  lines.push(``)

  // Demos per component
  for (const comp of group.components) {
    const data = componentDataMap.get(comp)
    if (!data) continue

    const priority = group.demoPriority?.[comp]
    let selectedDemos: DemoInfo[]

    if (priority) {
      // Select demos by priority names first, then fill with lowest-order demos
      const selected: DemoInfo[] = []
      const used = new Set<string>()

      for (const name of priority) {
        // Try exact title match (lowercased, hyphenated)
        const found = data.demos.find(d => {
          const normalized = d.title.toLowerCase().replace(/\s+/g, '-')
          return normalized === name || normalized.includes(name) || d.title.toLowerCase().includes(name.replace(/-/g, ' '))
        })
        if (found && !used.has(found.title)) {
          selected.push(found)
          used.add(found.title)
        }
      }

      // Fill remaining slots with lowest-order demos not already selected
      for (const d of data.demos) {
        if (selected.length >= group.maxDemos) break
        if (!used.has(d.title)) {
          selected.push(d)
          used.add(d.title)
        }
      }

      selectedDemos = selected.slice(0, group.maxDemos)
    } else {
      selectedDemos = data.demos.slice(0, group.maxDemos)
    }

    if (selectedDemos.length === 0) continue

    if (group.components.length > 1) {
      lines.push(`### ${data.title}`)
      lines.push(``)
    }

    for (const demo of selectedDemos) {
      lines.push(`### ${group.components.length > 1 ? '' : ''}${demo.title}`)
      lines.push(``)
      if (demo.description) {
        lines.push(demo.description)
        lines.push(``)
      }
      lines.push('```vue')
      lines.push(demo.source)
      lines.push('```')
      lines.push(``)
    }
  }

  // API pointer
  if (group.components.length === 1) {
    lines.push(`## API Reference`)
    lines.push(``)
    lines.push(`See [api/${group.components[0]}.md](api/${group.components[0]}.md) for full props, events, slots, and methods.`)
    lines.push(``)
  } else {
    lines.push(`## API Reference`)
    lines.push(``)
    for (const comp of group.components) {
      const data = componentDataMap.get(comp)
      if (data) {
        lines.push(`- [${data.title}](api/${comp}.md)`)
      }
    }
    lines.push(``)
  }

  return lines.join('\n')
}

// ─── Generate compact API reference ────────────────────────────────────────

function generateApiReference(data: ComponentData, tokens: TokenInfo[]): string {
  const lines: string[] = []

  lines.push(`---`)
  lines.push(`name: ${data.name}`)
  lines.push(`description: ${data.title} - ${data.description.replace(/\n/g, ' ').slice(0, 150)}`)
  lines.push(`---`)
  lines.push(``)
  lines.push(`# ${data.title}`)
  lines.push(``)
  lines.push(data.description)
  lines.push(``)

  if (data.apiSection) {
    lines.push(data.apiSection)
    lines.push(``)
  }

  if (tokens.length > 0) {
    lines.push(`## Theme Tokens`)
    lines.push(``)
    lines.push(`Use via \`theme.components.${pascalCase(data.name)}\` in ConfigProvider.`)
    lines.push(``)
    lines.push('| Token | Type | Description |')
    lines.push('| --- | --- | --- |')
    for (const t of tokens) {
      lines.push(`| \`${t.name}\` | \`${t.type.replace(/\|/g, '\\|')}\` | ${t.description} |`)
    }
    lines.push(``)
  }

  return lines.join('\n')
}

// ─── Generate SKILL.md ─────────────────────────────────────────────────────

function generateSkillMd(
  groups: ReferenceGroup[],
  hasGlobalTokens: boolean,
  generatedDate: string,
): string {
  let md = `---
name: antdv
description: Ant Design Vue 4.x component library for Vue 3. Use when building UIs with Ant Design Vue — forms, tables, layouts, modals, theming, and all component patterns.
metadata:
  author: Ant Design Vue team
  version: "${generatedDate}"
  source: Generated from https://github.com/vueComponent/ant-design-vue
---

# Ant Design Vue 4.x

Enterprise-class UI components for Vue 3, based on Ant Design.

## Quick Start

\`\`\`bash
npm i ant-design-vue@4.x
\`\`\`

\`\`\`vue
<script setup>
import { Button } from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
</script>
<template>
  <a-button type="primary">Hello</a-button>
</template>
\`\`\`

**Global registration** (main.ts):
\`\`\`ts
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
app.use(Antd);
\`\`\`

## Key Patterns

| Pattern | When to Use | Reference |
|---------|-------------|-----------|
`

  for (const g of groups) {
    md += `| ${g.title} | ${g.description} | [${g.slug}](references/${g.slug}.md) |\n`
  }

  md += `| Theming | Custom colors, dark mode, design tokens | [theming-overview](references/theming-overview.md) |\n`
  if (hasGlobalTokens) {
    md += `| Token Reference | All global design token definitions | [theming-tokens](references/theming-tokens.md) |\n`
  }
  md += `| i18n | Locale configuration | [i18n](references/i18n.md) |\n`
  md += `| Getting Started | Installation, setup, configuration | [getting-started](references/getting-started.md) |\n`

  md += `
## Component API Lookup

For detailed props, events, and slots of any specific component, see \`references/api/<component-name>.md\`.

## Common Pitfalls

- **v-model syntax**: Use \`v-model:value\` for most components. Checkbox and Switch use \`v-model:checked\`.
- **Form validation**: \`name\` on \`<a-form-item>\` must match a key in the \`:model\` object.
- **Table key**: Always provide \`rowKey\` or include \`key\` in data objects.
- **CSS reset**: Import \`ant-design-vue/dist/reset.css\` — without it, styles break.
- **Tree-shaking**: Import individual components (\`import { Button } from 'ant-design-vue'\`) for smaller bundles.
- **Date objects**: DatePicker values are dayjs objects, not strings. Use \`type: 'object'\` in form validation rules for date fields.
- **Icons**: Import from \`@ant-design/icons-vue\`, not from ant-design-vue directly.
`

  return md
}

// ─── Generate special reference files ──────────────────────────────────────

function generateGettingStartedMd(repoPath: string): string {
  const content = loadVueDoc(repoPath, 'getting-started') || ''
  return `---
name: getting-started
description: Installation, setup, and configuration of Ant Design Vue
---

# Getting Started

${content}
`
}

function generateThemingOverviewMd(repoPath: string): string {
  const content = loadVueDoc(repoPath, 'customize-theme') || ''
  return `---
name: theming-overview
description: Theming with ConfigProvider, design tokens, dark mode, and compact theme
---

# Theming

${content}
`
}

function generateI18nMd(repoPath: string): string {
  const content = loadVueDoc(repoPath, 'i18n') || ''
  return `---
name: i18n
description: Internationalization and locale configuration for Ant Design Vue
---

# Internationalization

${content}
`
}

function generateGlobalTokenMd(tokens: GlobalTokenInfo[]): string {
  let md = `---
name: theming-tokens
description: Global design token reference for ConfigProvider theme.token
---

# Global Theme Tokens

Use via \`<a-config-provider :theme="{ token: { ... } }">\`.

| Token | Type | Source | Description |
| --- | --- | --- | --- |
`
  for (const t of tokens) {
    md += `| \`${t.name}\` | \`${t.type.replace(/\|/g, '\\|')}\` | ${t.source} | ${t.description} |\n`
  }
  return md
}

// ─── GENERATION.md ──────────────────────────────────────────────────────────

function generateGenerationMd(
  gitSha: string,
  generatedDate: string,
  stats: {
    components: number
    taskReferences: number
    apiFiles: number
    globalTokens: number
  },
): string {
  return `# Generation Info

- Source: ${REMOTE_URL.replace(/\.git$/, '')}
- Git SHA: \`${gitSha}\`
- Generated: ${generatedDate}
- Language: en-US
- Components: ${stats.components}
- Task-oriented references: ${stats.taskReferences}
- API reference files: ${stats.apiFiles}
- Global Tokens: ${stats.globalTokens}
`
}

// ─── Main ───────────────────────────────────────────────────────────────────

function main() {
  const gitSha = getGitSha(REPO)
  const generatedDate = today()

  console.log(`Source: ${REPO}`)
  console.log(`Git SHA: ${gitSha}`)
  console.log(`Output: ${OUT}`)

  // Clean and recreate output dir
  rmSync(join(OUT, 'references'), { recursive: true, force: true })
  mkdirp(join(OUT, 'references', 'api'))

  // 1. Discover and parse all components
  const componentNames = discoverComponents(REPO)
  console.log(`Found ${componentNames.length} components`)

  const componentDataMap = new Map<string, ComponentData>()
  const componentTokensMap = new Map<string, TokenInfo[]>()

  for (const name of componentNames) {
    const data = parseComponentData(REPO, name)
    componentDataMap.set(name, data)
    const tokens = extractComponentTokens(REPO, name)
    if (tokens.length > 0) {
      componentTokensMap.set(name, tokens)
    }
  }

  // 2. Generate task-oriented reference files
  for (const group of GROUPS) {
    console.log(`  Generating reference: ${group.slug}`)
    const content = generateTaskReference(group, componentDataMap)
    writeFileSync(join(OUT, 'references', `${group.slug}.md`), content)
  }
  console.log(`Generated ${GROUPS.length} task-oriented references`)

  // 3. Generate compact API reference files
  let apiCount = 0
  for (const name of componentNames) {
    const data = componentDataMap.get(name)!
    const tokens = componentTokensMap.get(name) || []
    const content = generateApiReference(data, tokens)
    writeFileSync(join(OUT, 'references', 'api', `${name}.md`), content)
    apiCount++
  }
  console.log(`Generated ${apiCount} API reference files`)

  // 4. Generate special reference files
  writeFileSync(join(OUT, 'references', 'getting-started.md'), generateGettingStartedMd(REPO))
  writeFileSync(join(OUT, 'references', 'theming-overview.md'), generateThemingOverviewMd(REPO))
  writeFileSync(join(OUT, 'references', 'i18n.md'), generateI18nMd(REPO))

  // 5. Global tokens
  const globalTokens = extractGlobalTokens(REPO)
  const hasGlobalTokens = globalTokens.length > 0
  if (hasGlobalTokens) {
    writeFileSync(join(OUT, 'references', 'theming-tokens.md'), generateGlobalTokenMd(globalTokens))
    console.log(`Extracted ${globalTokens.length} global tokens`)
  }

  // 6. Generate SKILL.md
  const skillMd = generateSkillMd(GROUPS, hasGlobalTokens, generatedDate)
  writeFileSync(join(OUT, 'SKILL.md'), skillMd)

  // 7. Generate GENERATION.md
  const genMd = generateGenerationMd(gitSha, generatedDate, {
    components: componentNames.length,
    taskReferences: GROUPS.length,
    apiFiles: apiCount,
    globalTokens: globalTokens.length,
  })
  writeFileSync(join(OUT, 'GENERATION.md'), genMd)

  console.log('\nDone!')
  console.log(`  Components: ${componentNames.length}`)
  console.log(`  Task references: ${GROUPS.length}`)
  console.log(`  API files: ${apiCount}`)
  if (hasGlobalTokens) console.log(`  Global tokens: ${globalTokens.length}`)
}

main()
