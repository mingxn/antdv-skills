---
name: data-entry-date-time
description: DatePicker, TimePicker, RangePicker, and Calendar for temporal data entry
---

# Date & Time Pickers

## When to Use

**DatePicker:** By clicking the input box, you can select a date from a popup calendar.

**TimePicker:** By clicking the input box, you can select a time from a popup panel.

**Calendar:** When data is in the form of dates, such as schedules, timetables, prices calendar, lunar calendar. This component also supports Year/Month switch.

DatePicker uses dayjs by default. Import type `Dayjs` for TypeScript. Use `<a-range-picker>` for date ranges. For form validation with dates, set rule `type: 'object'` since dayjs values are objects.

## Components

DatePicker, TimePicker, Calendar

### DatePicker

### Basic Usage

Basic use case. Users can select or input a date in panel.

```vue
<template>
  <a-space direction="vertical" :size="12">
    <a-date-picker v-model:value="value1" />
    <a-date-picker v-model:value="value2" picker="week" />
    <a-date-picker v-model:value="value3" picker="month" />
    <a-date-picker v-model:value="value4" picker="quarter" />
    <a-date-picker v-model:value="value5" picker="year" />
  </a-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { Dayjs } from 'dayjs';
const value1 = ref<Dayjs>();
const value2 = ref<Dayjs>();
const value3 = ref<Dayjs>();
const value4 = ref<Dayjs>();
const value5 = ref<Dayjs>();
</script>
```

### Range Picker

Set range picker type by `picker` prop.

```vue
<template>
  <a-space direction="vertical" :size="12">
    <a-range-picker v-model:value="value1" />
    <a-range-picker v-model:value="value2" show-time />
    <a-range-picker v-model:value="value3" picker="week" />
    <a-range-picker v-model:value="value4" picker="month" />
    <a-range-picker v-model:value="value5" picker="year" />
  </a-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { Dayjs } from 'dayjs';
type RangeValue = [Dayjs, Dayjs];
const value1 = ref<RangeValue>();
const value2 = ref<RangeValue>();
const value3 = ref<RangeValue>();
const value4 = ref<RangeValue>();
const value5 = ref<RangeValue>();
</script>
```

### TimePicker

### Basic

Click `TimePicker`, and then we could select or input a time in panel.

```vue
<template>
  <a-space direction="vertical">
    <a-time-picker v-model:value="value" />
    <a-time-picker v-model:value="strValue" value-format="HH:mm:ss" />
  </a-space>
</template>
<script lang="ts" setup>
import dayjs, { Dayjs } from 'dayjs';
import { ref, watch } from 'vue';
const value = ref<Dayjs>(dayjs('08:00:00', 'HH:mm:ss'));
const strValue = ref<string>('09:00:00');

watch(value, () => {
  console.log(value.value);
});
watch(strValue, () => {
  console.log(strValue.value);
});
</script>
```

### Addon

Render addon contents to timepicker panel's bottom.

```vue
<template>
  <a-space direction="vertical">
    <a-time-picker v-model:value="value" v-model:open="open" @openChange="handleOpenChange">
      <template #renderExtraFooter="{ prefixCls }">
        <a-button size="small" type="primary" @click="handleClose">OK {{ prefixCls }}</a-button>
      </template>
    </a-time-picker>
    <a-time-picker v-model:value="value" v-model:open="open2">
      <template #renderExtraFooter>
        <a-button size="small" type="primary" @click="handleClose">OK</a-button>
      </template>
    </a-time-picker>
  </a-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Dayjs } from 'dayjs';
const open = ref(false);
const open2 = ref(false);
const value = ref<Dayjs>();

const handleOpenChange = (openStatus: boolean) => {
  console.log('open', openStatus);
  open.value = openStatus;
};

const handleClose = () => {
  open.value = false;
  open2.value = false;
};
</script>
```

### Calendar

### Basic

A basic calendar component with Year/Month switch.

```vue
<template>
  <a-calendar v-model:value="value" @panelChange="onPanelChange" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Dayjs } from 'dayjs';
const value = ref<Dayjs>();
const onPanelChange = (value: Dayjs, mode: string) => {
  console.log(value, mode);
};
</script>
```

### Card

Nested inside a container element for rendering in limited space.

```vue
<template>
  <div :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
    <a-calendar v-model:value="value" :fullscreen="false" @panelChange="onPanelChange" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Dayjs } from 'dayjs';

const value = ref<Dayjs>();
const onPanelChange = (value: Dayjs, mode: string) => {
  console.log(value, mode);
};
</script>
```

## API Reference

- [DatePicker](api/date-picker.md)
- [TimePicker](api/time-picker.md)
- [Calendar](api/calendar.md)
