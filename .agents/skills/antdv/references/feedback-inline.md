---
name: feedback-inline
description: Alert, Result, Progress, Spin, Popconfirm, Tooltip, Popover, and Tour components
---

# Inline Feedback & Overlays

## When to Use

**Alert:** - When you need to show alert messages to users.
- When you need a persistent static container which is closable by user actions.

**Result:** Use when important operations need to inform the user to process the results and the feedback is more complicated.

**Progress:** If it will take a long time to complete an operation, you can use `Progress` to show the current progress and status.

- When an operation will interrupt the current interface, or it needs to run in the background for more than 2 seconds.
- When you need to display the completion percentage of an operation.

**Spin:** When part of the page is waiting for asynchronous data or during a rendering process, an appropriate loading animation can effectively alleviate users' inquietude.

**Popconfirm:** A simple and compact dialog used for asking for user confirmation.

The difference with the 'confirm' modal dialog is that it's more lightweight than the static popped full-screen confirm modal.

**Tooltip:** - The tip is shown on mouse enter, and is hidden on mouse leave. The Tooltip doesn't support complex text or operations.
- To provide an explanation of a 'button/text/operation'. It's often used instead of the html 'title' attribute.

**Popover:** A simple popup menu to provide extra information or operations.

Comparing with `Tooltip`, besides information `Popover` card can also provide action elements like links and buttons.

**Tour:** Use when you want to guide users through a product.

**When to use which overlay:**
- **Tooltip**: brief text hint on hover
- **Popover**: richer content (title + body) on hover/click
- **Popconfirm**: yes/no confirmation before an action

## Components

Alert, Result, Progress, Spin, Popconfirm, Tooltip, Popover, Tour

### Alert

### Basic usage

The simplest usage for short messages.

```vue
<template>
  <a-alert message="Success Text" type="success" />
</template>
```

### Result

### Success

Show successful results.

```vue
<template>
  <a-result
    status="success"
    title="Successfully Purchased Cloud Server ECS!"
    sub-title="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
  >
    <template #extra>
      <a-button key="console" type="primary">Go Console</a-button>
      <a-button key="buy">Buy Again</a-button>
    </template>
  </a-result>
</template>
```

### Progress

### Square linecaps

By setting `strokeLinecap="square"`, you can change the linecaps from round to square.

```vue
<template>
  <div>
    <a-progress stroke-linecap="square" :percent="75" />
    <a-progress stroke-linecap="square" :percent="75" type="circle" />
    <a-progress stroke-linecap="square" :percent="75" type="dashboard" />
  </div>
</template>
```

### Spin

### Basic usage

A simple loading status.

```vue
<template>
  <a-spin />
</template>
```

### Popconfirm

### Basic usage

The basic example.

```vue
<template>
  <a-popconfirm
    title="Are you sure delete this task?"
    ok-text="Yes"
    cancel-text="No"
    @confirm="confirm"
    @cancel="cancel"
  >
    <a href="#">Delete</a>
  </a-popconfirm>
</template>
<script lang="ts" setup>
import { message } from 'ant-design-vue';
const confirm = (e: MouseEvent) => {
  console.log(e);
  message.success('Click on Yes');
};

const cancel = (e: MouseEvent) => {
  console.log(e);
  message.error('Click on No');
};
</script>
```

### Tooltip

### Basic usage

The simplest usage.

```vue
<template>
  <a-tooltip>
    <template #title>prompt text</template>
    Tooltip will show when mouse enter.
  </a-tooltip>
</template>
```

### Popover

### Basic usage

The most basic example. The size of the floating layer depends on the contents region.

```vue
<template>
  <a-popover title="Title">
    <template #content>
      <p>Content</p>
      <p>Content</p>
    </template>
    <a-button type="primary">Hover me</a-button>
  </a-popover>
</template>
```

### Tour

### Basic usage

The most basic usage.

```vue
<template>
  <a-button type="primary" @click="handleOpen(true)">Begin Tour</a-button>

  <a-divider />

  <a-space>
    <a-button ref="ref1">Upload</a-button>
    <a-button ref="ref2" type="primary">Save</a-button>
    <a-button ref="ref3"><EllipsisOutlined /></a-button>
  </a-space>

  <a-tour v-model:current="current" :open="open" :steps="steps" @close="handleOpen(false)" />
</template>

<script lang="ts" setup>
import { ref, createVNode } from 'vue';
import { EllipsisOutlined } from '@ant-design/icons-vue';
import type { TourProps } from 'ant-design-vue';

const open = ref<boolean>(false);

const ref1 = ref(null);
const ref2 = ref(null);
const ref3 = ref(null);
const current = ref(0);
const steps: TourProps['steps'] = [
  {
    title: 'Upload File',
    description: 'Put your files here.',
    cover: createVNode('img', {
      alt: 'tour.png',
      src: 'https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png',
    }),
    target: () => ref1.value && ref1.value.$el,
  },
  {
    title: 'Save',
    description: 'Save your changes.',
    target: () => ref2.value && ref2.value.$el,
  },
  {
    title: 'Other Actions',
    description: 'Click to see other actions.',
    target: () => ref3.value && ref3.value.$el,
  },
];

const handleOpen = (val: boolean): void => {
  open.value = val;
};
</script>
```

## API Reference

- [Alert](api/alert.md)
- [Result](api/result.md)
- [Progress](api/progress.md)
- [Spin](api/spin.md)
- [Popconfirm](api/popconfirm.md)
- [Tooltip](api/tooltip.md)
- [Popover](api/popover.md)
- [Tour](api/tour.md)
