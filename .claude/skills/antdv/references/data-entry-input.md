---
name: data-entry-input
description: Input, InputNumber, Textarea, AutoComplete, and Mentions components
---

# Text & Number Input

## When to Use

**Input:** - A user input in a form field is needed.
- A search input is required.

**InputNumber:** When a numeric value needs to be provided.

**AutoComplete:** - When you need an input box instead of a selector.
- When you need input suggestions or helping text.

The differences with Select are:

- AutoComplete is an input box with text hints, and users can type freely. The keyword is aiding **input**.
- Select is selecting among given choices. The keyword is **select**.

**Mentions:** When you need to mention someone or something.

## Components

Input, InputNumber, AutoComplete, Mentions

### Input

### Basic usage

Basic usage example.

```vue
<template>
  <a-space direction="vertical">
    <a-input v-model:value="value" placeholder="Basic usage" />
    <a-input v-model:value.lazy="value1" autofocus placeholder="Lazy usage" />
  </a-space>
</template>
<script lang="ts" setup>
import { watch, ref } from 'vue';
const value = ref<string>('');
const value1 = ref<string>('');
watch(value, () => {
  console.log(value.value);
});
watch(value1, () => {
  console.log(value1.value);
});
</script>
```

### Borderless

No border.

```vue
<template>
  <a-input v-model:value="value" :bordered="false" placeholder="Borderless" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const value = ref<string>('');
</script>
```

### InputNumber

### Basic usage

Numeric-only input box.

```vue
<template>
  <div>
    <a-input-number id="inputNumber" v-model:value="value" :min="1" :max="10" />
    当前值：{{ value }}
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const value = ref<number>(3);
</script>
```

### Disabled

Click the button to toggle between available and disabled states.

```vue
<template>
  <div>
    <a-input-number v-model:value="value" :min="1" :max="10" :disabled="disabled" />
    <div style="margin-top: 20px">
      <a-button type="primary" @click="toggle">Toggle disabled</a-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const value = ref<number>(3);
const disabled = ref<boolean>(true);

const toggle = () => {
  disabled.value = !disabled.value;
};
</script>
```

### AutoComplete

### Basic Usage

Basic Usage, set datasource of autocomplete with `options` property.

```vue
<template>
  <a-auto-complete
    v-model:value="value"
    :options="options"
    style="width: 200px"
    placeholder="input here"
    @select="onSelect"
    @search="onSearch"
  />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

interface MockVal {
  value: string;
}
const mockVal = (str: string, repeat = 1): MockVal => {
  return {
    value: str.repeat(repeat),
  };
};
const value = ref('');
const options = ref<MockVal[]>([]);
const onSearch = (searchText: string) => {
  console.log('searchText');
  options.value = !searchText
    ? []
    : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];
};
const onSelect = (value: string) => {
  console.log('onSelect', value);
};
watch(value, () => {
  console.log('value', value.value);
});
</script>
```

### Customized

For 3.0+, You could pass `v-slot:option` to custom option.

```vue
<template>
  <a-auto-complete
    v-model:value="value"
    style="width: 200px"
    placeholder="input here"
    :options="options"
    @search="handleSearch"
  >
    <template #option="{ value: val }">
      {{ val.split('@')[0] }} @
      <span style="font-weight: bold">{{ val.split('@')[1] }}</span>
    </template>
  </a-auto-complete>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const value = ref('');
const options = ref<{ value: string }[]>([]);
const handleSearch = (val: string) => {
  let res: { value: string }[];
  if (!val || val.indexOf('@') >= 0) {
    res = [];
  } else {
    res = ['gmail.com', '163.com', 'qq.com'].map(domain => ({ value: `${val}@${domain}` }));
  }
  options.value = res;
};
</script>
```

### Mentions

### Basic usage

Basic usage.

```vue
<template>
  <a-mentions v-model:value="value" autofocus :options="options" @select="onSelect"></a-mentions>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
const value = ref<string>('@afc163');
watch(value, () => {
  console.log('value', value);
});
const onSelect = (option: { value: string }) => {
  console.log('select', option);
};

const options = [
  {
    value: 'afc163',
    label: 'afc163',
  },
  {
    value: 'zombieJ',
    label: 'zombieJ',
  },
  {
    value: 'yesmeck',
    label: 'yesmeck',
  },
];
</script>
```

### Asynchronous loading

async.

```vue
<template>
  <a-mentions v-model:value="value" :options="options" :loading="loading" @search="onSearch">
    <template #option="{ payload }">
      <img :src="payload.avatar_url" :alt="payload.login" />
      <span>{{ payload.login }}</span>
    </template>
  </a-mentions>
</template>

<script lang="ts" setup>
import { debounce } from 'lodash-es';
import { computed, ref } from 'vue';
import { MentionsProps } from '..';
const value = ref<string>('');
const loading = ref<boolean>(false);
const users = ref<{ login: string; avatar_url: string }[]>([]);
const search = ref<string>('');
const loadGithubUsers = debounce((key: string) => {
  if (!key) {
    users.value = [];
    return;
  }

  fetch(`https://api.github.com/search/users?q=${key}`)
    .then(res => res.json())
    .then(({ items = [] }) => {
      if (search.value !== key) return;
      users.value = items.slice(0, 10);
      loading.value = false;
    });
}, 800);

const onSearch = (searchValue: string) => {
  search.value = searchValue;
  loading.value = !!searchValue;
  console.log(!!searchValue);
  users.value = [];
  console.log('Search:', searchValue);
  loadGithubUsers(searchValue);
};
const options = computed<MentionsProps['options']>(() =>
  users.value.map(user => ({
    key: user.login,
    value: user.login,
    class: 'antd-demo-dynamic-option',
    payload: user,
  })),
);
</script>
<style scoped>
.antd-demo-dynamic-option img {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
</style>
```

## API Reference

- [Input](api/input.md)
- [InputNumber](api/input-number.md)
- [AutoComplete](api/auto-complete.md)
- [Mentions](api/mentions.md)
