---
name: data-entry-toggle
description: Checkbox, Radio, Switch, Rate, Slider, and Segmented for boolean/choice input
---

# Toggle & Choice Controls

## When to Use

**Checkbox:** - Used for selecting multiple values from several options.
- If you use only one checkbox, it is the same as using Switch to toggle between two states. The difference is that Switch will trigger the state change directly, but Checkbox just marks the state as changed and this needs to be submitted.

**Radio:** - Used to select a single state from multiple options.
- The difference from Select is that Radio is visible to the user and can facilitate the comparison of choice, which means there shouldn't be too many of them.

**Switch:** - If you need to represent the switching between two states or on-off state.
- The difference between `Switch` and `Checkbox` is that `Switch` will trigger a state change directly when you toggle it, while `Checkbox` is generally used for state marking, which should work in conjunction with submit operation.

**Slider:** To input a value in a range.

**Segmented:** - When displaying multiple options and user can select a single option;
- When switching the selected option, the content of the associated area changes.

**v-model binding:** Checkbox and Switch use `v-model:checked`, not `v-model:value`. Radio, Rate, Slider, and Segmented use `v-model:value`.

## Components

Checkbox, Radio, Switch, Rate, Slider, Segmented

### Checkbox

### Basic

Basic usage of checkbox

```vue
<template>
  <a-checkbox v-model:checked="checked">Checkbox</a-checkbox>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const checked = ref(false);
</script>
```

### Checkbox group

Generate a group of checkboxes from an array

```vue
<template>
  <a-checkbox-group v-model:value="state.value1" name="checkboxgroup" :options="plainOptions" />
  <br />
  <br />
  <a-checkbox-group v-model:value="state.value2" :options="plainOptions" />
  <br />
  <br />
  <a-checkbox-group v-model:value="state.value3" :options="options" />
  <br />
  <br />
  <a-checkbox-group v-model:value="state.value4" :options="optionsWithDisabled" disabled>
    <template #label="{ label }">
      <span style="color: red">{{ label }}</span>
    </template>
  </a-checkbox-group>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';

const plainOptions = ['Apple', 'Pear', 'Orange'];
const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];
const optionsWithDisabled = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: false },
];
const state = reactive({
  value1: [],
  value2: ['Apple'],
  value3: ['Pear'],
  value4: ['Apple'],
});
</script>
```

### Radio

### Basic usage

The simplest usage.

```vue
<template>
  <a-radio v-model:checked="checked">Radio</a-radio>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const checked = ref<boolean>(false);
</script>
```

### Vertical RadioGroup

Vertical RadioGroup, with more radios.

```vue
<template>
  <a-radio-group v-model:value="value">
    <a-radio :style="radioStyle" :value="1">Option A</a-radio>
    <a-radio :style="radioStyle" :value="2">Option B</a-radio>
    <a-radio :style="radioStyle" :value="3">Option C</a-radio>
    <a-radio :style="radioStyle" :value="4">
      More...
      <a-input v-if="value === 4" style="width: 100px; margin-left: 10px" />
    </a-radio>
  </a-radio-group>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
const value = ref<number>(1);
const radioStyle = reactive({
  display: 'flex',
  height: '30px',
  lineHeight: '30px',
});
</script>
```

### Switch

### Basic Usage

The most basic usage.

```vue
<template>
  <a-switch v-model:checked="checked" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const checked = ref<boolean>(false);
</script>
```

### Disabled

Disabled state of `Switch`.

```vue
<template>
  <a-space direction="vertical">
    <a-switch v-model:checked="checked" :disabled="disabled" />
    <a-button type="primary" @click="onToggle">Toggle disabled</a-button>
  </a-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const checked = ref<boolean>(true);
const disabled = ref<boolean>(true);

const onToggle = () => {
  disabled.value = !disabled.value;
};
</script>
```

### Rate

### Basic usage

The simplest usage.

```vue
<template>
  <a-rate v-model:value="value" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const value = ref<number>(2);
</script>
```

### Half star

Support select half star.

```vue
<template>
  <a-rate v-model:value="value" allow-half />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const value = ref<number>(2.5);
</script>
```

### Slider

### Basic

Basic slider. When `range` is `true`, display as dual thumb mode. When `disable` is `true`, the slider will not be interactable.

```vue
<template>
  <div>
    <a-slider id="test" v-model:value="value1" :disabled="disabled" />
    <a-slider v-model:value="value2" range :disabled="disabled" />
    Disabled:
    <a-switch v-model:checked="disabled" size="small" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const value1 = ref<number>(0);
const value2 = ref<[number, number]>([20, 50]);
const disabled = ref<boolean>(false);
</script>
<style scoped>
.code-box-demo .ant-slider {
  margin-bottom: 16px;
}
</style>
```

### Slider with InputNumber

Synchronize with [InputNumber](/components/input-number/) component.

```vue
<template>
  <div>
    <a-row>
      <a-col :span="12">
        <a-slider v-model:value="inputValue1" :min="1" :max="20" />
      </a-col>
      <a-col :span="4">
        <a-input-number v-model:value="inputValue1" :min="1" :max="20" style="margin-left: 16px" />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="12">
        <a-slider v-model:value="inputValue" :min="0" :max="1" :step="0.01" />
      </a-col>
      <a-col :span="4">
        <a-input-number
          v-model:value="inputValue"
          :min="0"
          :max="1"
          :step="0.01"
          style="margin-left: 16px"
        />
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const inputValue = ref<number>(0);
const inputValue1 = ref<number>(1);
</script>
<style scoped>
.code-box-demo .ant-slider {
  margin-bottom: 16px;
}
</style>
```

### Segmented

### Basic Usage

The most basic usage.

```vue
<template>
  <a-segmented v-model:value="value" :options="data" />
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
const data = reactive(['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']);
const value = ref(data[0]);
</script>
```

### Block Segmented

`block` property will make the `Segmented` fit to its parent width.

```vue
<template>
  <a-segmented v-model:value="value" block :options="data" />
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
const data = reactive([123, 456, 'longtext-longtext-longtext-longtext']);
const value = ref(data[0]);
</script>
```

## API Reference

- [Checkbox](api/checkbox.md)
- [Radio](api/radio.md)
- [Switch](api/switch.md)
- [Rate](api/rate.md)
- [Slider](api/slider.md)
- [Segmented](api/segmented.md)
