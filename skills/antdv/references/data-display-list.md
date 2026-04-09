---
name: data-display-list
description: List, Card, Descriptions, Collapse, and Tabs for structured content display
---

# Lists, Cards & Panels

## When to Use

**List:** A list can be used to display content related to a single subject. The content can consist of multiple elements of varying type and size.

**Card:** A card can be used to display content related to a single subject. The content can consist of multiple elements of varying types and sizes.

**Descriptions:** Commonly displayed on the details page.

**Collapse:** - Can be used to group or hide complex regions to keep the page clean.
- 'Accordion' is a special kind of 'Collapse', which allows only one panel to be expanded at a time.

**Tabs:** Ant Design has 3 types of Tabs for different situations.

- Card Tabs: for managing too many closeable views.
- Normal Tabs: for functional aspects of a page.
- [RadioButton](/ant-design/components/radio/): for secondary tabs.

## Components

List, Card, Descriptions, Collapse, Tabs

### List

### Basic usage

Basic list.

```vue
<template>
  <a-list item-layout="horizontal" :data-source="data">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        >
          <template #title>
            <a href="https://www.antdv.com/">{{ item.title }}</a>
          </template>
          <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" />
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>
<script lang="ts" setup>
interface DataItem {
  title: string;
}
const data: DataItem[] = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];
</script>
```

### Vertical

Setting `itemLayout` property with `vertical` to create a vertical list.

```vue
<template>
  <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">
    <template #footer>
      <div>
        <b>ant design vue</b>
        footer part
      </div>
    </template>
    <template #renderItem="{ item }">
      <a-list-item key="item.title">
        <template #actions>
          <span v-for="{ icon, text } in actions" :key="icon">
            <component :is="icon" style="margin-right: 8px" />
            {{ text }}
          </span>
        </template>
        <template #extra>
          <img
            width="272"
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        </template>
        <a-list-item-meta :description="item.description">
          <template #title>
            <a :href="item.href">{{ item.title }}</a>
          </template>
          <template #avatar><a-avatar :src="item.avatar" /></template>
        </a-list-item-meta>
        {{ item.content }}
      </a-list-item>
    </template>
  </a-list>
</template>
<script lang="ts" setup>
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons-vue';
const listData: Record<string, string>[] = [];

for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://www.antdv.com/',
    title: `ant design vue part ${i}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const pagination = {
  onChange: (page: number) => {
    console.log(page);
  },
  pageSize: 3,
};
const actions: Record<string, any>[] = [
  { icon: StarOutlined, text: '156' },
  { icon: LikeOutlined, text: '156' },
  { icon: MessageOutlined, text: '2' },
];
</script>
```

### Card

### Basic card

A basic card containing a title, content and an extra corner content.
Supports two sizes: `default` and `small`.

```vue
<template>
  <a-card title="Default size card" style="width: 300px">
    <template #extra><a href="#">more</a></template>
    <p>card content</p>
    <p>card content</p>
    <p>card content</p>
  </a-card>
  <br />
  <a-card size="small" title="Small size card" style="width: 300px">
    <template #extra><a href="#">more</a></template>
    <p>card content</p>
    <p>card content</p>
    <p>card content</p>
  </a-card>
</template>
```

### Grid card

Grid style card content.

```vue
<template>
  <a-card title="Card Title">
    <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
    <a-card-grid style="width: 25%; text-align: center" :hoverable="false">Content</a-card-grid>
    <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
    <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
    <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
    <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
    <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
    <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
  </a-card>
</template>
```

### Descriptions

### Basic

Simplest Usage.

```vue
<template>
  <a-descriptions title="User Info">
    <a-descriptions-item label="UserName">Zhou Maomao</a-descriptions-item>
    <a-descriptions-item label="Telephone">1810000000</a-descriptions-item>
    <a-descriptions-item label="Live">Hangzhou, Zhejiang</a-descriptions-item>
    <a-descriptions-item label="Remark">empty</a-descriptions-item>
    <a-descriptions-item label="Address">
      No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
    </a-descriptions-item>
  </a-descriptions>
</template>
```

### Bordered

Descriptions with border and background color.

```vue
<template>
  <a-descriptions title="User Info" bordered>
    <a-descriptions-item label="Product">Cloud Database</a-descriptions-item>
    <a-descriptions-item label="Billing Mode">Prepaid</a-descriptions-item>
    <a-descriptions-item label="Automatic Renewal">YES</a-descriptions-item>
    <a-descriptions-item label="Order time">2018-04-24 18:00:00</a-descriptions-item>
    <a-descriptions-item label="Usage Time" :span="2">2019-04-24 18:00:00</a-descriptions-item>
    <a-descriptions-item label="Status" :span="3">
      <a-badge status="processing" text="Running" />
    </a-descriptions-item>
    <a-descriptions-item label="Negotiated Amount">$80.00</a-descriptions-item>
    <a-descriptions-item label="Discount">$20.00</a-descriptions-item>
    <a-descriptions-item label="Official Receipts">$60.00</a-descriptions-item>
    <a-descriptions-item label="Config Info">
      Data disk type: MongoDB
      <br />
      Database version: 3.4
      <br />
      Package: dds.mongo.mid
      <br />
      Storage space: 10 GB
      <br />
      Replication factor: 3
      <br />
      Region: East China 1
      <br />
    </a-descriptions-item>
  </a-descriptions>
</template>
```

### Collapse

### Collapse

By default, any number of panels can be expanded at a time. The first panel is expanded in this example.

```vue
<template>
  <a-collapse v-model:activeKey="activeKey">
    <a-collapse-panel key="1" header="This is panel header 1">
      <p>{{ text }}</p>
    </a-collapse-panel>
    <a-collapse-panel key="2" header="This is panel header 2">
      <p>{{ text }}</p>
    </a-collapse-panel>
    <a-collapse-panel key="3" header="This is panel header 3" collapsible="disabled">
      <p>{{ text }}</p>
    </a-collapse-panel>
  </a-collapse>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';

const text = `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`;
const activeKey = ref(['1']);

watch(activeKey, val => {
  console.log(val);
});
</script>
```

### Accordion

In accordion mode, only one panel can be expanded at a time.

```vue
<template>
  <a-collapse v-model:activeKey="activeKey" accordion>
    <a-collapse-panel key="1" header="This is panel header 1">
      <p>{{ text }}</p>
    </a-collapse-panel>
    <a-collapse-panel key="2" header="This is panel header 2">
      <p>{{ text }}</p>
    </a-collapse-panel>
    <a-collapse-panel key="3" header="This is panel header 3">
      <p>{{ text }}</p>
    </a-collapse-panel>
  </a-collapse>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const activeKey = ref([]);
const text = `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`;
</script>
```

### Tabs

### Basic Usage

Default activate first tab.

```vue
<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="Tab 1">Content of Tab Pane 1</a-tab-pane>
    <a-tab-pane key="2" tab="Tab 2" force-render>Content of Tab Pane 2</a-tab-pane>
    <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
  </a-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const activeKey = ref('1');
</script>
```

### Card type tab

Another type Tabs, which doesn't support vertical mode.

```vue
<template>
  <a-tabs v-model:activeKey="activeKey" type="card">
    <a-tab-pane key="1" tab="Tab 1">Content of Tab Pane 1</a-tab-pane>
    <a-tab-pane key="2" tab="Tab 2">Content of Tab Pane 2</a-tab-pane>
    <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
  </a-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const activeKey = ref('1');
</script>
```

## API Reference

- [List](api/list.md)
- [Card](api/card.md)
- [Descriptions](api/descriptions.md)
- [Collapse](api/collapse.md)
- [Tabs](api/tabs.md)
