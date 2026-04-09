---
name: data-entry-select
description: Select dropdown, Cascader, TreeSelect, and Transfer for choosing from options
---

# Selection Components

## When to Use

**Select:** - A dropdown menu for displaying choices - an elegant alternative to the native `<select>` element.
- Utilizing [Radio](/components/radio/) is recommended when there are fewer total options (less than 5).

**Cascader:** - When you need to select from a set of associated data set. Such as province/city/district, company level, things classification.
- When selecting from a large data set, with multi-stage classification separated for easy selection.
- Chooses cascade items in one float layer for better user experience.

**TreeSelect:** `TreeSelect` is similar to `Select`, but the values are provided in a tree like structure. Any data whose entries are defined in a hierarchical manner is fit to use this control. Examples of such case may include a corporate hierarchy, a directory structure, and so on.

**Transfer:** - When you need to show alert messages to users.
- When you need a persistent static container which is closable by user actions.

Transfer the elements between two columns in an intuitive and efficient way.

One or more elements can be selected from either column, one click on the proper `direction` button, and the transfer is done. The left column is considered the `source` and the right column is considered the `target`. As you can see in the API description, these names are reflected in.

**When to use which:**
- **Select**: single or multiple choice from a flat list of options
- **Cascader**: hierarchical/nested options (e.g., country > city > district)
- **TreeSelect**: tree-structured data with expand/collapse
- **Transfer**: move items between two lists (e.g., assign permissions)

## Components

Select, Cascader, TreeSelect, Transfer

### Select

### Basic Usage

Basic Usage

```vue
<template>
  <h2>use a-select-option</h2>
  <a-space>
    <a-select
      ref="select"
      v-model:value="value1"
      style="width: 120px"
      @focus="focus"
      @change="handleChange"
    >
      <a-select-option value="jack">Jack</a-select-option>
      <a-select-option value="lucy">Lucy</a-select-option>
      <a-select-option value="disabled" disabled>Disabled</a-select-option>
      <a-select-option value="Yiminghe">yiminghe</a-select-option>
    </a-select>
    <a-select v-model:value="value2" style="width: 120px" disabled>
      <a-select-option value="lucy">Lucy</a-select-option>
    </a-select>
    <a-select v-model:value="value3" style="width: 120px" loading>
      <a-select-option value="lucy">Lucy</a-select-option>
    </a-select>
  </a-space>
  <h2 style="margin-top: 10px">use options (recommend)</h2>
  <a-space>
    <a-select
      ref="select"
      v-model:value="value1"
      style="width: 120px"
      :options="options1"
      @focus="focus"
      @change="handleChange"
    ></a-select>
    <a-select v-model:value="value2" style="width: 120px" disabled :options="options2"></a-select>
    <a-select v-model:value="value3" style="width: 120px" loading :options="options3"></a-select>
  </a-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { SelectProps } from 'ant-design-vue';
const value1 = ref('lucy');
const value2 = ref('lucy');
const value3 = ref('lucy');
const options1 = ref<SelectProps['options']>([
  {
    value: 'jack',
    label: 'Jack',
  },
  {
    value: 'lucy',
    label: 'Lucy',
  },
  {
    value: 'disabled',
    label: 'Disabled',
    disabled: true,
  },
  {
    value: 'yiminghe',
    label: 'Yiminghe',
  },
]);
const options2 = ref<SelectProps['options']>([
  {
    value: 'lucy',
    label: 'Lucy',
  },
]);
const options3 = ref<SelectProps['options']>([
  {
    value: 'lucy',
    label: 'Lucy',
  },
]);
const focus = () => {
  console.log('focus');
};

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};
</script>
```

### Search Box

Search with remote data.

```vue
<template>
  <a-select
    v-model:value="value"
    show-search
    placeholder="input search text"
    style="width: 200px"
    :default-active-first-option="false"
    :show-arrow="false"
    :filter-option="false"
    :not-found-content="null"
    :options="data"
    @search="handleSearch"
    @change="handleChange"
  ></a-select>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import jsonp from 'fetch-jsonp';

let timeout: any;
let currentValue = '';

function fetch(value: string, callback: any) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    const params = new URLSearchParams({
      code: 'utf-8',
      q: value,
    });
    jsonp(`https://suggest.taobao.com/sug?${params}`)
      .then(response => response.json())
      .then(d => {
        if (currentValue === value) {
          const result = d.result;
          const data: any[] = [];
          result.forEach((r: any) => {
            data.push({
              value: r[0],
              label: r[0],
            });
          });
          callback(data);
        }
      });
  }

  timeout = setTimeout(fake, 300);
}

const data = ref<any[]>([]);
const value = ref();

const handleSearch = (val: string) => {
  fetch(val, (d: any[]) => (data.value = d));
};
const handleChange = (val: string) => {
  console.log(val);
  value.value = val;
  fetch(val, (d: any[]) => (data.value = d));
};
</script>
```

### Cascader

### Basic

Cascade selection box for selecting province/city/district.

```vue
<template>
  <a-cascader v-model:value="value" :options="options" placeholder="Please select" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { CascaderProps } from 'ant-design-vue';
const options: CascaderProps['options'] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
const value = ref<string[]>([]);
</script>
```

### Custom trigger

Separate trigger button and result.

```vue
<template>
  <span>
    {{ text }} &nbsp;
    <a-cascader
      v-model:value="value"
      placeholder="Please select"
      :options="options"
      @change="onChange"
    >
      <a href="#">Change city</a>
    </a-cascader>
  </span>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { CascaderProps } from 'ant-design-vue';
const options: CascaderProps['options'] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
const value = ref<string[]>([]);
const text = ref<string>('Unselect');

const onChange: CascaderProps['onChange'] = (_value, selectedOptions) => {
  text.value = selectedOptions.map(o => o.label).join(', ');
};
</script>
```

### TreeSelect

### Basic usage

The most basic usage.

```vue
<template>
  <a-tree-select
    v-model:value="value"
    show-search
    style="width: 100%"
    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
    placeholder="Please select"
    allow-clear
    tree-default-expand-all
    :tree-data="treeData"
    tree-node-filter-prop="label"
  >
    <template #title="{ value: val, label }">
      <b v-if="val === 'parent 1-1'" style="color: #08c">sss</b>
      <template v-else>{{ label }}</template>
    </template>
  </a-tree-select>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import type { TreeSelectProps } from 'ant-design-vue';
const value = ref<string>();
const treeData = ref<TreeSelectProps['treeData']>([
  {
    label: 'root 1',
    value: 'root 1',
    children: [
      {
        label: 'parent 1',
        value: 'parent 1',
        children: [
          {
            label: 'parent 1-0',
            value: 'parent 1-0',
            children: [
              {
                label: 'my leaf',
                value: 'leaf1',
              },
              {
                label: 'your leaf',
                value: 'leaf2',
              },
            ],
          },
          {
            label: 'parent 1-1',
            value: 'parent 1-1',
          },
        ],
      },
      {
        label: 'parent 2',
        value: 'parent 2',
      },
    ],
  },
]);
watch(value, () => {
  console.log(value.value);
});
</script>
```

### Highlight

Search Value Hightlight

```vue
<template>
  <a-tree-select
    v-model:value="value"
    v-model:searchValue="searchValue"
    show-search
    style="width: 100%"
    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
    placeholder="Please select"
    allow-clear
    tree-default-expand-all
    :tree-data="treeData"
    tree-node-filter-prop="label"
  >
    <template #title="{ value: val, label }">
      <b v-if="val === 'parent 1-1'" style="color: #08c">sss</b>
      <template v-else>
        <template
          v-for="(fragment, i) in label
            .toString()
            .split(new RegExp(`(?<=${searchValue})|(?=${searchValue})`, 'i'))"
        >
          <span
            v-if="fragment.toLowerCase() === searchValue.toLowerCase()"
            :key="i"
            style="color: #08c"
          >
            {{ fragment }}
          </span>
          <template v-else>{{ fragment }}</template>
        </template>
      </template>
    </template>
  </a-tree-select>
</template>
<script lang="ts" setup>
import type { TreeSelectProps } from 'ant-design-vue';
import { ref, watch } from 'vue';
const value = ref<string>();
const treeData = ref<TreeSelectProps['treeData']>([
  {
    label: 'parent 1',
    value: 'parent 1',
    children: [
      {
        label: 'parent 1-0',
        value: 'parent 1-0',
        children: [
          {
            label: 'parent 1-0-0',
            value: 'parent 1-0-0',
            children: [
              {
                label: 'my leaf',
                value: 'leaf1',
              },
              {
                label: 'your leaf',
                value: 'leaf2',
              },
            ],
          },
          {
            label: 'parent 1-0-1',
            value: 'parent 1-0-1',
          },
        ],
      },
      {
        label: 'parent 1-1',
        value: 'parent 1-1',
      },
    ],
  },
]);
watch(value, () => {
  console.log(value.value);
});
const searchValue = ref('');
</script>
```

### Transfer

### Basic usage

The most basic usage of `Transfer` involves providing the source data and target keys arrays, plus the rendering and some callback functions.

```vue
<template>
  <div>
    <a-transfer
      v-model:target-keys="targetKeys"
      v-model:selected-keys="selectedKeys"
      :data-source="mockData"
      :titles="['Source', 'Target']"
      :render="item => item.title"
      :disabled="disabled"
      @change="handleChange"
      @selectChange="handleSelectChange"
      @scroll="handleScroll"
    />
    <a-switch
      v-model:checked="disabled"
      un-checked-children="enabled"
      checked-children="disabled"
      style="margin-top: 16px"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
interface MockData {
  key: string;
  title: string;
  description: string;
  disabled: boolean;
}
const mockData: MockData[] = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 3 < 1,
  });
}

const oriTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);
const disabled = ref<boolean>(false);

const targetKeys = ref<string[]>(oriTargetKeys);

const selectedKeys = ref<string[]>(['1', '4']);

const handleChange = (nextTargetKeys: string[], direction: string, moveKeys: string[]) => {
  console.log('targetKeys: ', nextTargetKeys);
  console.log('direction: ', direction);
  console.log('moveKeys: ', moveKeys);
};
const handleSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
  console.log('sourceSelectedKeys: ', sourceSelectedKeys);
  console.log('targetSelectedKeys: ', targetSelectedKeys);
};
const handleScroll = (direction: string, e: Event) => {
  console.log('direction:', direction);
  console.log('target:', e.target);
};
</script>
```

### One Way

Use `oneWay` to makes Transfer to one way style.

```vue
<template>
  <div>
    <a-transfer
      v-model:target-keys="targetKeys"
      v-model:selected-keys="selectedKeys"
      :data-source="mockData"
      :one-way="true"
      :titles="['Source', 'Target']"
      :render="item => item.title"
      :disabled="disabled"
      @change="handleChange"
      @selectChange="handleSelectChange"
      @scroll="handleScroll"
    />
    <a-switch
      v-model:checked="disabled"
      un-checked-children="enabled"
      checked-children="disabled"
      style="margin-top: 16px"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
interface MockData {
  key: string;
  title: string;
  description: string;
  disabled: boolean;
}
const mockData: MockData[] = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 3 < 1,
  });
}

const disabled = ref<boolean>(false);

const targetKeys = ref<string[]>([]);

const selectedKeys = ref<string[]>(['1', '4']);

const handleChange = (nextTargetKeys: string[], direction: string, moveKeys: string[]) => {
  console.log('targetKeys: ', nextTargetKeys);
  console.log('direction: ', direction);
  console.log('moveKeys: ', moveKeys);
};
const handleSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
  console.log('sourceSelectedKeys: ', sourceSelectedKeys);
  console.log('targetSelectedKeys: ', targetSelectedKeys);
};
const handleScroll = (direction: string, e: Event) => {
  console.log('direction:', direction);
  console.log('target:', e.target);
};
</script>
```

## API Reference

- [Select](api/select.md)
- [Cascader](api/cascader.md)
- [TreeSelect](api/tree-select.md)
- [Transfer](api/transfer.md)
