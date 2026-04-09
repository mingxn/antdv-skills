---
name: layout-navigation
description: Menu, breadcrumb, pagination, anchor, steps, and other navigation components
---

# Navigation

## When to Use

**Menu:** Navigation is an important part of any website, as a good navigation setup allows users to move around the site quickly and efficiently. Ant Design offers two navigation options: top and side. Top navigation provides all the categories and functions of the website. Side navigation provides the multi-level structure of the website.

More layouts with navigation: [Layout](/components/layout).

**Breadcrumb:** - When the system has more than two layers in a hierarchy.
- When you need to inform the user of where they are.
- When the user may need to navigate back to a higher level.

**Dropdown:** When there are more than a few options to choose from, you can wrap them in a `Dropdown`. By hovering or clicking on the trigger, a dropdown menu will appear, which allows you to choose an option and execute the relevant action.

**PageHeader:** PageHeader can be used to highlight the page topic, display important information about the page, and carry the action items related to the current page (including page-level operations, inter-page navigation, etc.) It can also be used as inter-page navigation.

**Pagination:** - When it will take a long time to load/render all items.
- If you want to browse the data by navigating through pages.

**Anchor:** For displaying anchor hyperlinks on page and jumping between them.

**Affix:** On longer web pages, its helpful for some content to stick to the viewport. This is common for menus and actions.

Please note that Affix should not cover other content on the page, especially when the size of the viewport is small.

## Components

Menu, Breadcrumb, Dropdown, PageHeader, Pagination, Anchor, Affix, Steps

### Menu

### Inline menu

Vertical menu with inline submenus.

```vue
<template>
  <a-menu
    id="dddddd"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    style="width: 256px"
    mode="inline"
    :items="items"
    @click="handleClick"
  ></a-menu>
</template>
<script lang="ts" setup>
import { reactive, ref, watch, VueElement, h } from 'vue';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
import type { MenuProps, ItemType } from 'ant-design-vue';

const selectedKeys = ref<string[]>(['1']);
const openKeys = ref<string[]>(['sub1']);

function getItem(
  label: VueElement | string,
  key: string,
  icon?: any,
  children?: ItemType[],
  type?: 'group',
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as ItemType;
}

const items: ItemType[] = reactive([
  getItem('Navigation One', 'sub1', () => h(MailOutlined), [
    getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
    getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
  ]),

  getItem('Navigation Two', 'sub2', () => h(AppstoreOutlined), [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),

  { type: 'divider' },

  getItem('Navigation Three', 'sub4', () => h(SettingOutlined), [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),

  getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
]);

const handleClick: MenuProps['onClick'] = e => {
  console.log('click', e);
};

watch(openKeys, val => {
  console.log('openKeys', val);
});
</script>
```

### Top Navigation

Horizontal top navigation menu.

```vue
<template>
  <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" />
</template>
<script lang="ts" setup>
import { h, ref } from 'vue';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
import { MenuProps } from 'ant-design-vue';
const current = ref<string[]>(['mail']);
const items = ref<MenuProps['items']>([
  {
    key: 'mail',
    icon: () => h(MailOutlined),
    label: 'Navigation One',
    title: 'Navigation One',
  },
  {
    key: 'app',
    icon: () => h(AppstoreOutlined),
    label: 'Navigation Two',
    title: 'Navigation Two',
  },
  {
    key: 'sub1',
    icon: () => h(SettingOutlined),
    label: 'Navigation Three - Submenu',
    title: 'Navigation Three - Submenu',
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
  {
    key: 'alipay',
    label: h('a', { href: 'https://antdv.com', target: '_blank' }, 'Navigation Four - Link'),
    title: 'Navigation Four - Link',
  },
]);
</script>
```

### Breadcrumb

### Basic Usage

The simplest use.

```vue
<template>
  <a-breadcrumb>
    <a-breadcrumb-item>Home</a-breadcrumb-item>
    <a-breadcrumb-item><a href="">Application Center</a></a-breadcrumb-item>
    <a-breadcrumb-item><a href="">Application List</a></a-breadcrumb-item>
    <a-breadcrumb-item>An Application</a-breadcrumb-item>
  </a-breadcrumb>
</template>
```

### With an Icon

The icon should be placed in front of the text.

```vue
<template>
  <a-breadcrumb>
    <a-breadcrumb-item href="">
      <home-outlined />
    </a-breadcrumb-item>
    <a-breadcrumb-item href="">
      <user-outlined />
      <span>Application List</span>
    </a-breadcrumb-item>
    <a-breadcrumb-item>Application</a-breadcrumb-item>
  </a-breadcrumb>
</template>
<script lang="ts" setup>
import { HomeOutlined, UserOutlined } from '@ant-design/icons-vue';
</script>
```

### Dropdown

### Basic Usage

The most basic dropdown menu.

```vue
<template>
  <a-dropdown>
    <a class="ant-dropdown-link" @click.prevent>
      Hover me
      <DownOutlined />
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <a href="javascript:;">1st menu item</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">2nd menu item</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">3rd menu item</a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script lang="ts" setup>
import { DownOutlined } from '@ant-design/icons-vue';
</script>
```

### Placement

Support 6 placements.

```vue
<template>
  <div id="components-dropdown-demo-placement">
    <template v-for="(placement, index) in placements" :key="placement">
      <a-dropdown :placement="placement">
        <a-button>{{ placement }}</a-button>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                1st menu item
              </a>
            </a-menu-item>
            <a-menu-item>
              <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                2nd menu item
              </a>
            </a-menu-item>
            <a-menu-item>
              <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                3rd menu item
              </a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <br v-if="index === 2" />
    </template>
  </div>
</template>
<script lang="ts" setup>
import type { DropdownProps } from 'ant-design-vue';
const placements = [
  'bottomLeft',
  'bottom',
  'bottomRight',
  'topLeft',
  'top',
  'topRight',
] as DropdownProps['placement'][];
</script>
<style scoped>
#components-dropdown-demo-placement .ant-btn {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
```

### PageHeader

### Basic Page Header

Standard header, suitable for use in scenarios that require a brief description.

```vue
<template>
  <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    title="Title"
    sub-title="This is a subtitle"
    @back="() => null"
  />
</template>
```

### white background mode

The default PageHeader is a transparent background. In some cases, PageHeader needs its own background color.

```vue
<template>
  <div class="demo-page-header" style="background-color: #f5f5f5; padding: 24px">
    <a-page-header
      :ghost="ghost"
      title="Title"
      sub-title="This is a subtitle"
      @back="() => $router.go(-1)"
    >
      <template #extra>
        <a-button key="3">Operation</a-button>
        <a-button key="2">Operation</a-button>
        <a-button key="1" type="primary">Primary</a-button>
      </template>
      <a-descriptions size="small" :column="3">
        <a-descriptions-item label="Created">Lili Qu</a-descriptions-item>
        <a-descriptions-item label="Association">
          <a>421421</a>
        </a-descriptions-item>
        <a-descriptions-item label="Creation Time">2017-01-10</a-descriptions-item>
        <a-descriptions-item label="Effective Time">2017-10-10</a-descriptions-item>
        <a-descriptions-item label="Remarks">
          Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
        </a-descriptions-item>
      </a-descriptions>
    </a-page-header>
  </div>
  <a-checkbox v-model:checked="ghost" style="margin-top: 0.5rem">toggle ghost</a-checkbox>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const ghost = ref(false);
</script>
<style scoped>
.demo-page-header :deep(tr:last-child td) {
  padding-bottom: 0;
}
</style>
```

### Pagination

### Basic

Basic pagination.

```vue
<template>
  <a-pagination v-model:current="current" :total="50" show-less-items />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const current = ref(2);
</script>
```

### More

More pages.

```vue
<template>
  <a-pagination v-model:current="current" :total="500" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const current = ref(6);
</script>
```

### Anchor

### Basic Usage

The simplest usage.

```vue
<template>
  <a-anchor
    :items="[
      {
        key: 'part-1',
        href: '#part-1',
        title: () => h('span', { style: 'color: red' }, 'Part 1'),
      },
      {
        key: 'part-2',
        href: '#part-2',
        title: 'Part 2',
      },
      {
        key: 'part-3',
        href: '#part-3',
        title: 'Part 3',
      },
    ]"
  />
</template>

<script lang="ts" setup>
import { h } from 'vue';
</script>
```

### Horizontally aligned anchors

Horizontally aligned anchors

```vue
<template>
  <div
    style="
       {
        padding: '20px';
      }
    "
  >
    <a-anchor
      direction="horizontal"
      :items="[
        {
          key: 'horizontally-part-1',
          href: '#horizontally-part-1',
          title: 'Part 1',
        },
        {
          key: 'horizontally-part-2',
          href: '#horizontally-part-2',
          title: 'Part 2',
        },
        {
          key: 'horizontally-part-3',
          href: '#horizontally-part-3',
          title: 'Part 3',
        },
        {
          key: 'horizontally-part-4',
          href: '#horizontally-part-4',
          title: 'Part 4',
        },
        {
          key: 'horizontally-part-5',
          href: '#horizontally-part-5',
          title: 'Part 5',
        },
        {
          key: 'horizontally-part-6',
          href: '#horizontally-part-6',
          title: 'Part 6',
        },
      ]"
    />
  </div>
</template>
```

### Affix

### Basic

The simplest usage.

```vue
<template>
  <a-affix :offset-top="top">
    <a-button type="primary" @click="top += 10">Affix top</a-button>
  </a-affix>
  <br />
  <a-affix :offset-bottom="bottom">
    <a-button type="primary" @click="bottom += 10">Affix bottom</a-button>
  </a-affix>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const top = ref<number>(10);
const bottom = ref<number>(10);
</script>
```

### Callback

Callback with affixed state.

```vue
<template>
  <a-affix :offset-top="120" @change="change">
    <a-button>120px to affix top</a-button>
  </a-affix>
</template>
<script lang="ts" setup>
const change = (affixed: boolean) => {
  console.log(affixed);
};
</script>
```

### Steps

### Basic

The most basic step bar.

```vue
<template>
  <a-steps
    :current="1"
    :items="[
      {
        title: 'Finished',
        description,
      },
      {
        title: 'In Progress',
        description,
        subTitle: 'Left 00:00:08',
      },
      {
        title: 'Waiting',
        description,
      },
    ]"
  ></a-steps>
</template>
<script lang="ts" setup>
const description = 'This is a description.';
</script>
```

### Mini version

By setting like this: `<Steps size="small">`, you can get a mini version.

```vue
<template>
  <a-steps
    :current="1"
    size="small"
    :items="[
      {
        title: 'Finished',
      },
      {
        title: 'In Progress',
      },
      {
        title: 'Waiting',
      },
    ]"
  ></a-steps>
</template>
```

## API Reference

- [Menu](api/menu.md)
- [Breadcrumb](api/breadcrumb.md)
- [Dropdown](api/dropdown.md)
- [PageHeader](api/page-header.md)
- [Pagination](api/pagination.md)
- [Anchor](api/anchor.md)
- [Affix](api/affix.md)
- [Steps](api/steps.md)
