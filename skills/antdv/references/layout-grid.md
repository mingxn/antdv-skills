---
name: layout-grid
description: Responsive 24-column grid, Flex layout, and Space for element spacing
---

# Grid System & Spacing

## When to Use

**Flex:** - Good for setting spacing between elements.
- Suitable for setting various horizontal and vertical alignments.

### Difference with Space component

- Space is used to set the spacing between inline elements. It will add a wrapper element for each child element for inline alignment. Suitable for equidistant arrangement of multiple child elements in rows and columns.
- Flex is used to set the layout of block-level elements. It does not add a wrapper element. Suitable for layout of child elements in vertical or horizontal direction, and provides more flexibility and control.

**Space:** - Avoid components clinging together and set a unified space.
- Use Space.Compact when child form components are compactly connected and the border is collapsed (After version `ant-design-vue@4.0.0` Supported).

Grid uses a 24-column system: `<a-row>` + `<a-col :span="N">`. Use `:gutter` for spacing. Flex component is for CSS flexbox shortcuts. Space is for inline element gaps.

## Components

Grid, Flex, Space

### Grid

### Basic Grid

From the stack to the horizontal arrangement.

You can create a basic grid system by using a single set of `Row` and `Col` grid assembly, all of the columns (Col) must be placed in `Row`.

```vue
<template>
  <a-row>
    <a-col :span="24">col</a-col>
  </a-row>
  <a-row>
    <a-col :span="12">col-12</a-col>
    <a-col :span="12">col-12</a-col>
  </a-row>
  <a-row>
    <a-col :span="8">col-8</a-col>
    <a-col :span="8">col-8</a-col>
    <a-col :span="8">col-8</a-col>
  </a-row>
  <a-row>
    <a-col :span="6">col-6</a-col>
    <a-col :span="6">col-6</a-col>
    <a-col :span="6">col-6</a-col>
    <a-col :span="6">col-6</a-col>
  </a-row>
</template>
```

### Responsive

Referring to the Bootstrap [responsive design](http://getbootstrap.com/css/#grid-media-queries), here preset six dimensions: `xs` `sm` `md` `lg` `xl` `xxl`.

```vue
<template>
  <a-row>
    <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10">Col</a-col>
    <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="4">Col</a-col>
    <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10">Col</a-col>
  </a-row>
</template>
```

### Flex

### Basic

The basic usage.

```vue
<template>
  <a-flex gap="middle" vertical>
    <a-radio-group v-model:value="value">
      <a-radio value="horizontal">horizontal</a-radio>
      <a-radio value="vertical">vertical</a-radio>
    </a-radio-group>
    <a-flex :vertical="value === 'vertical'">
      <div
        v-for="(item, index) in new Array(4)"
        :key="item"
        :style="{ ...baseStyle, background: `${index % 2 ? '#1677ff' : '#1677ffbf'}` }"
      />
    </a-flex>
  </a-flex>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { CSSProperties } from 'vue';
const value = ref('horizontal');
const baseStyle: CSSProperties = {
  width: '25%',
  height: '54px',
};
</script>
```

### gap

Set the `gap` between elements, which has three preset sizes: `small`, `middle`, `large`, You can also customize the gap size.

```vue
<template>
  <a-flex gap="middle" vertical>
    <a-radio-group v-model:value="gapSize">
      <a-radio value="small">small</a-radio>
      <a-radio value="middle">middle</a-radio>
      <a-radio value="large">large</a-radio>
      <a-radio value="customize">customize</a-radio>
    </a-radio-group>
    <template v-if="gapSize === 'customize'">
      <a-slider v-model:value="customGapSize" />
    </template>
    <a-flex :gap="gapSize !== 'customize' ? gapSize : customGapSize">
      <a-button type="primary">Primary</a-button>
      <a-button>Default</a-button>
      <a-button type="dashed">Dashed</a-button>
      <a-button type="link">Link</a-button>
    </a-flex>
  </a-flex>
</template>

<script setup lang="ts">
import { ref } from 'vue';

type SizeType = 'small' | 'middle' | 'large' | undefined;

const gapSize = ref<SizeType | 'customize'>('small');

const customGapSize = ref<number>(0);
</script>
```

### Space

### Basic Usage

Crowded components horizontal spacing.

```vue
<template>
  <a-space>
    Space
    <a-button type="primary">Button</a-button>
    <a-upload>
      <a-button>
        <UploadOutlined />
        Click to Upload
      </a-button>
    </a-upload>
    <a-popconfirm title="Are you sure delete this task?" ok-text="Yes" cancel-text="No">
      <a-button>Confirm</a-button>
    </a-popconfirm>
  </a-space>
</template>
<script lang="ts" setup>
import { UploadOutlined } from '@ant-design/icons-vue';
</script>
```

### Split

Crowded components split.

```vue
<template>
  <a-space>
    <template #split>
      <a-divider type="vertical" />
    </template>
    <a-typography-link>Link</a-typography-link>
    <a-typography-link>Link</a-typography-link>
    <a-typography-link>Link</a-typography-link>
  </a-space>
</template>
```

## API Reference

- [Grid](api/grid.md)
- [Flex](api/flex.md)
- [Space](api/space.md)
