---
name: misc-components
description: Button, Divider, Watermark, FloatButton, App, Icon, and ConfigProvider
---

# Utility & General Components

## When to Use

**Button:** A button means an operation (or a series of operations). Clicking a button will trigger corresponding business logic.

In Ant Design Vue we provide 5 types of button.

- Primary button: indicate the main action, one primary button at most in one section.
- Default button: indicate a series of actions without priority.
- Dashed button: used for adding action commonly.
- Text button: used for the most secondary action.
- Link button: used for external links.

And 4 other properties additionally.

- `danger`: used for actions of risk, like deletion or authorization.
- `ghost`: used in situations with complex background, home pages usually.
- `disabled`: when actions are not available.
- `loading`: add loading spinner in button, avoiding multiple submits too.

**Divider:** - Divide sections of article.
- Divide inline text and links such as the operation column of table.

**Watermark:** - Use when the page needs to be watermarked to identify the copyright.
- Suitable for preventing information theft.

**FloatButton:** - For global functionality on the site.
- Buttons that can be seen wherever you browse.

**App:** - Provide reset styles based on `.ant-app` element.
- You could use static methods of `message/notification/Modal` form `useApp` without writing `contextHolder` manually.

**Button types:** `primary`, `default`, `dashed`, `text`, `link`. Add `danger` prop for destructive actions. Use `html-type="submit"` in forms.

**Icons:** Import from `@ant-design/icons-vue`. Example: `import { SearchOutlined } from '@ant-design/icons-vue'`.

## Components

Button, Divider, Watermark, FloatButton, App, Icon, ConfigProvider

### Button

### Icon

`Button` components can contain an `Icon`. This is done by setting the `icon` property or placing an `Icon` component within the `Button`.

If you want specific control over the positioning and placement of the `Icon`, then that should be done by placing the `Icon` component within the `Button` rather than using the `icon` property.

```vue
<template>
  <a-space direction="vertical">
    <a-space wrap>
      <a-tooltip title="search">
        <a-button type="primary" shape="circle" :icon="h(SearchOutlined)" />
      </a-tooltip>
      <a-button type="primary" shape="circle">A</a-button>
      <a-button type="primary" :icon="h(SearchOutlined)">Search</a-button>
      <a-tooltip title="search">
        <a-button shape="circle" :icon="h(SearchOutlined)" />
      </a-tooltip>
      <a-button :icon="h(SearchOutlined)">Search</a-button>
    </a-space>
    <a-space wrap>
      <a-tooltip title="search">
        <a-button shape="circle" :icon="h(SearchOutlined)" />
      </a-tooltip>
      <a-button :icon="h(SearchOutlined)">Search</a-button>
      <a-tooltip title="search">
        <a-button type="dashed" shape="circle" :icon="h(SearchOutlined)" />
      </a-tooltip>
      <a-button type="dashed" :icon="h(SearchOutlined)">Search</a-button>
      <a-button :icon="h(SearchOutlined)" href="https://www.google.com" />
    </a-space>
  </a-space>
</template>
<script lang="ts" setup>
import { h } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';
</script>
```

### Loading

A loading indicator can be added to a button by setting the `loading` property on the `Button`.

```vue
<template>
  <a-space direction="vertical">
    <a-space>
      <a-button type="primary" loading>Loading</a-button>
      <a-button type="primary" size="small" loading>Loading</a-button>
    </a-space>
    <a-space>
      <a-button type="primary" :loading="loading" @mouseenter="loading = true">
        mouseenter me!
      </a-button>
      <a-button type="primary" :loading="iconLoading" @click="enterIconLoading">
        <template #icon><PoweroffOutlined /></template>
        延迟1s
      </a-button>
    </a-space>
    <a-space>
      <a-button type="primary" loading />
      <a-button type="primary" shape="circle" loading />
      <a-button danger shape="round" loading />
    </a-space>
  </a-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { PoweroffOutlined } from '@ant-design/icons-vue';

interface DelayLoading {
  delay: number;
}
const loading = ref<boolean>(false);
const iconLoading = ref<boolean | DelayLoading>(false);
const enterIconLoading = () => {
  iconLoading.value = { delay: 1000 };

  setTimeout(() => {
    iconLoading.value = false;
  }, 6000);
};
</script>
```

### Divider

### Horizontal

Divider is `horizontal` by default. You can add text within Divider.

```vue
<template>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
    probare, quae sunt a te dicta? Refert tamen, quo modo.
  </p>
  <a-divider />
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
    probare, quae sunt a te dicta? Refert tamen, quo modo.
  </p>
  <a-divider>With Text</a-divider>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
    probare, quae sunt a te dicta? Refert tamen, quo modo.
  </p>
  <a-divider dashed />
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
    probare, quae sunt a te dicta? Refert tamen, quo modo.
  </p>
</template>
```

### Divider with title

Divider with inner title, set `orientation="left/right"` to align it.

```vue
<template>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
    probare, quae sunt a te dicta? Refert tamen, quo modo.
  </p>
  <a-divider>Text</a-divider>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
    probare, quae sunt a te dicta? Refert tamen, quo modo.
  </p>
  <a-divider orientation="left">Left Text</a-divider>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
    probare, quae sunt a te dicta? Refert tamen, quo modo.
  </p>
  <a-divider orientation="right">Right Text</a-divider>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
    probare, quae sunt a te dicta? Refert tamen, quo modo.
  </p>
  <a-divider orientation="left" orientation-margin="0px">
    Left Text with 0 orientationMargin
  </a-divider>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
    probare, quae sunt a te dicta? Refert tamen, quo modo.
  </p>
  <a-divider orientation="right" orientation-margin="50px">
    Right Text with 50px orientationMargin
  </a-divider>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
    probare, quae sunt a te dicta? Refert tamen, quo modo.
  </p>
</template>
```

### Watermark

### Basic

The most basic usage.

```vue
<template>
  <a-watermark content="Ant Design Vue">
    <div style="height: 500px" />
  </a-watermark>
</template>
```

### Custom

Preview the watermark effect by configuring custom parameters.

```vue
<template>
  <div style="display: flex">
    <a-watermark v-bind="model">
      <a-typography>
        <a-typography-paragraph>
          The light-speed iteration of the digital world makes products more complex. However, human
          consciousness and attention resources are limited. Facing this design contradiction, the
          pursuit of natural interaction will be the consistent direction of Ant Design.
        </a-typography-paragraph>
        <a-typography-paragraph>
          Natural user cognition: According to cognitive psychology, about 80% of external
          information is obtained through visual channels. The most important visual elements in the
          interface design, including layout, colors, illustrations, icons, etc., should fully
          absorb the laws of nature, thereby reducing the user&apos;s cognitive cost and bringing
          authentic and smooth feelings. In some scenarios, opportunely adding other sensory
          channels such as hearing, touch can create a richer and more natural product experience.
        </a-typography-paragraph>
        <a-typography-paragraph>
          Natural user behavior: In the interaction with the system, the designer should fully
          understand the relationship between users, system roles, and task objectives, and also
          contextually organize system functions and services. At the same time, a series of methods
          such as behavior analysis, artificial intelligence and sensors could be applied to assist
          users to make effective decisions and reduce extra operations of users, to save
          users&apos; mental and physical resources and make human-computer interaction more
          natural.
        </a-typography-paragraph>
      </a-typography>
      <img
        style="z-index: 10; width: 100%; max-width: 800px; position: relative"
        src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*zx7LTI_ECSAAAAAAAAAAAABkARQnAQ"
        alt="示例图片"
      />
    </a-watermark>
    <a-form
      style="
        width: 280px;
        flex-shrink: 0;
        border-left: 1px solid #eee;
        padding-left: 20px;
        margin-left: 20px;
      "
      layout="vertical"
      :model="model"
    >
      <a-form-item name="content" label="Content">
        <a-input v-model:value="model.content" />
      </a-form-item>
      <a-form-item name="font.fontSize" label="FontSize">
        <a-slider v-model:value="model.font.fontSize" :step="1" :min="0" :max="100" />
      </a-form-item>
      <a-form-item name="zIndex" label="zIndex">
        <a-slider v-model:value="model.zIndex" :step="1" :min="0" :max="100" />
      </a-form-item>
      <a-form-item name="rotate" label="Rotate">
        <a-slider v-model:value="model.rotate" :step="1" :min="-180" :max="180" />
      </a-form-item>
      <a-form-item label="Gap" style="margin-bottom: 0">
        <a-space style="display: flex" align="baseline">
          <a-form-item :name="['gap', 0]">
            <a-input-number v-model:value="model.gap[0]" placeholder="gapX" />
          </a-form-item>
          <a-form-item :name="['gap', 1]">
            <a-input-number v-model:value="model.gap[1]" placeholder="gapY" />
          </a-form-item>
        </a-space>
      </a-form-item>
      <a-form-item label="Offset" style="margin-bottom: 0">
        <a-space style="display: flex" align="baseline">
          <a-form-item :name="['offset', 0]">
            <a-input-number v-model:value="model.offset[0]" placeholder="offsetLeft" />
          </a-form-item>
          <a-form-item :name="['offset', 1]">
            <a-input-number v-model:value="model.offset[1]" placeholder="offsetTop" />
          </a-form-item>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
const model = reactive({
  content: 'Ant Design Vue',
  font: {
    fontSize: 16,
  },
  zIndex: 11,
  rotate: -22,
  gap: [100, 100] as [number, number],
  offset: [],
});
</script>
```

### FloatButton

### Basic Usage

The most basic usage.

```vue
<template>
  <a-float-button @click="handleClick" />
</template>

<script lang="ts" setup>
const handleClick = () => console.log('click');
</script>
```

### Type

Change the type of the FloatButton with `type`.

```vue
<template>
  <a-float-button
    type="primary"
    :style="{
      right: '24px',
    }"
  >
    <template #icon>
      <QuestionCircleOutlined />
    </template>
  </a-float-button>

  <a-float-button
    type="default"
    :style="{
      right: '94px',
    }"
  >
    <template #icon>
      <QuestionCircleOutlined />
    </template>
  </a-float-button>
</template>

<script lang="ts" setup>
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
</script>
```

### App

### Basic Usage

Static method for `message`, `notification`, `modal`.

```vue
<template>
  <a-app>
    <my-page />
  </a-app>
</template>

<script lang="ts" setup>
import myPage from './myPage.vue';
</script>
```

### myPage

```vue
<template>
  <a-space>
    <a-button type="primary" @click="showMessage">Open message</a-button>
    <a-button type="primary" @click="showModal">Open modal</a-button>
    <a-button type="primary" @click="showNotification">Open notification</a-button>
  </a-space>
</template>

<script setup lang="ts">
import { App } from 'ant-design-vue';

const { message, modal, notification } = App.useApp();

const showMessage = () => {
  message.success('Success!');
};

const showModal = () => {
  modal.warning({
    title: 'This is a warning message',
    content: 'some messages...some messages...',
  });
};

const showNotification = () => {
  notification.info({
    message: `Notification topLeft`,
    description: 'Hello, Ant Design Vue!!',
    placement: 'topLeft',
  });
};
</script>
```

### Icon

### Basic

Import icons from `@ant-design/icons-vue`, component name of icons with different theme is the icon name suffixed by the theme name. Specific the `spin` property to show spinning animation.

```vue
<template>
  <a-space>
    <home-outlined />
    <setting-filled />
    <smile-outlined />
    <sync-outlined spin />
    <smile-outlined :rotate="180" />
    <loading-outlined />
  </a-space>
</template>
<script lang="ts" setup>
import {
  HomeOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
  LoadingOutlined,
} from '@ant-design/icons-vue';
</script>
```

### Custom Icon

Create a reusable Vue component by using `Icon`. The property / slot `component` takes a Vue component that renders to `svg` element.

```vue
<template>
  <a-space>
    <icon :style="{ color: 'hotpink' }">
      <template #component>
        <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
          <path
            d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z"
          />
        </svg>
      </template>
    </icon>

    <icon :style="{ fontSize: '32px' }">
      <template #component="svgProps">
        <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor" v-bind="svgProps">
          <path
            d="M99.096 315.634s-82.58-64.032-82.58-132.13c0-66.064 33.032-165.162 148.646-148.646 83.37 11.91 99.096 165.162 99.096 165.162l-165.162 115.614zM924.906 315.634s82.58-64.032 82.58-132.13c0-66.064-33.032-165.162-148.646-148.646-83.37 11.91-99.096 165.162-99.096 165.162l165.162 115.614z"
            fill="#6B676E"
            p-id="1143"
          />
          <path
            d="M1024 561.548c0 264.526-229.23 429.42-512.002 429.42S0 826.076 0 561.548 283.96 66.064 512.002 66.064 1024 297.022 1024 561.548z"
            fill="#FFEBD2"
            p-id="1144"
          />
          <path
            d="M330.324 842.126c0 82.096 81.34 148.646 181.678 148.646s181.678-66.55 181.678-148.646H330.324z"
            fill="#E9D7C3"
            p-id="1145"
          />
          <path
            d="M644.13 611.098C594.582 528.516 561.55 512 512.002 512c-49.548 0-82.58 16.516-132.13 99.096-42.488 70.814-78.73 211.264-49.548 247.742 66.064 82.58 165.162 33.032 181.678 33.032 16.516 0 115.614 49.548 181.678-33.032 29.18-36.476-7.064-176.93-49.55-247.74z"
            fill="#FFFFFF"
            p-id="1146"
          />
          <path
            d="M611.098 495.484c0-45.608 36.974-82.58 82.58-82.58 49.548 0 198.194 99.098 198.194 165.162s-79.934 144.904-148.646 99.096c-49.548-33.032-132.128-148.646-132.128-181.678zM412.904 495.484c0-45.608-36.974-82.58-82.58-82.58-49.548 0-198.194 99.098-198.194 165.162s79.934 144.904 148.646 99.096c49.548-33.032 132.128-148.646 132.128-181.678z"
            fill="#6B676E"
            p-id="1147"
          />
          <path
            d="M512.002 726.622c-30.06 0-115.614 5.668-115.614 33.032 0 49.638 105.484 85.24 115.614 82.58 10.128 2.66 115.614-32.944 115.614-82.58-0.002-27.366-85.556-33.032-115.614-33.032z"
            fill="#464655"
            p-id="1148"
          />
          <path
            d="M330.324 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z"
            fill="#464655"
            p-id="1149"
          />
          <path
            d="M693.678 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z"
            fill="#464655"
            p-id="1150"
          />
        </svg>
      </template>
    </icon>
    <icon>
      <template #component><HomeOutlined /></template>
    </icon>
    <HomeOutlined />
  </a-space>
</template>
<script lang="ts" setup>
import Icon, { HomeOutlined } from '@ant-design/icons-vue';
</script>
<style scoped>
.custom-icons-list :deep(.anticon) {
  margin-right: 6px;
}
</style>
```

### ConfigProvider

### Locale

Components which need localization support are listed here, you can toggle the language in the demo.

```vue
<template>
  <div style="margin-bottom: 16px">
    <span style="margin-right: 16px">Change locale of components:</span>
    <a-radio-group v-model:value="locale">
      <a-radio-button key="en" :value="enUS.locale">English</a-radio-button>
      <a-radio-button key="cn" :value="zhCN.locale">中文</a-radio-button>
    </a-radio-group>
  </div>
  <a-config-provider :locale="locale === 'en' ? enUS : zhCN">
    <a-space
      direction="vertical"
      :size="[0, 16]"
      :style="{ width: '100%', paddingTop: '16px', borderTop: `1px solid ${token.colorBorder}` }"
    >
      <a-pagination :total="50" show-size-changer />
      <a-space wrap>
        <a-select show-search style="width: 200px">
          <a-select-option value="jack">jack</a-select-option>
          <a-select-option value="lucy">lucy</a-select-option>
        </a-select>
        <a-date-picker />
        <a-time-picker />
        <a-range-picker style="width: 200px" />
      </a-space>
      <a-space wrap>
        <a-button type="primary" @click="visible = true">Show Modal</a-button>
        <a-button @click="info">Show info</a-button>
        <a-button @click="confirm">Show confirm</a-button>
        <a-popconfirm title="Question?">
          <a href="#">Click to confirm</a>
        </a-popconfirm>
      </a-space>
      <a-transfer :data-source="[]" show-search :target-keys="[]" :render="item => item.title" />
      <div
        :style="{
          width: '320px',
          border: `1px solid ${token.colorBorder}`,
          'border-radius': '8px',
        }"
      >
        <a-calendar :fullscreen="false" />
      </div>
      <a-form
        name="basic"
        :model="formModel"
        auto-complete="off"
        :label-col="{ sm: { span: 4 } }"
        :wrapper-col="{ span: 6 }"
      >
        <a-form-item label="UserName" name="username" :rules="[{ required: true }]">
          <a-input v-model:value="formModel.username" :width="200" />
        </a-form-item>
        <a-form-item label="Age" name="age" :rules="[{ type: 'number', min: 0, max: 99 }]">
          <a-input-number v-model:value="formModel.age" :width="200" />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 2, span: 6 }">
          <a-button type="primary" html-type="submit">submit</a-button>
        </a-form-item>
      </a-form>
      <a-table :data-source="[]" :columns="columns" />
      <a-modal v-model:open="visible" title="Locale Modal">
        <p>Locale Modal</p>
      </a-modal>
      <a-space wrap :size="80">
        <a-qrcode
          value="https://antdv.com"
          status="expired"
          @refresh="() => console.log('refresh')"
        />
        <a-image
          :width="160"
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      </a-space>
      <a-upload list-type="picture-card" :file-list="fileList" />
      <a-divider orientation="left">Tour</a-divider>
      <a-button type="primary" @click="() => (tourOpen = true)">Begin Tour</a-button>
      <a-space>
        <a-button ref="ref1">upload</a-button>
        <a-button ref="ref2" type="primary">save</a-button>
        <a-button ref="ref3">
          <template #icon>
            <ellipsis-outlined />
          </template>
        </a-button>
      </a-space>
      <a-tour
        v-model:current="current"
        :open="tourOpen"
        :steps="steps"
        @close="() => (tourOpen = false)"
      ></a-tour>
    </a-space>
  </a-config-provider>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import { Modal, theme } from 'ant-design-vue';
import type { TourProps, UploadFile } from 'ant-design-vue';
import { EllipsisOutlined } from '@ant-design/icons-vue';
import enUS from 'ant-design-vue/es/locale/en_US';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('en');

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'filter1',
        value: 'filter1',
      },
    ],
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
];

const visible = ref(false);
const locale = ref(enUS.locale);
watch(locale, val => {
  dayjs.locale(val);
});
const info = () => {
  Modal.info({
    title: 'some info',
    content: 'some info',
  });
};
const confirm = () => {
  Modal.confirm({
    title: 'some info',
    content: 'some info',
  });
};

const formModel = ref({
  username: '',
  age: '100',
});

const { token } = theme.useToken();

const fileList: UploadFile[] = [
  {
    uid: '-1',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-2',
    percent: 50,
    name: 'image.png',
    status: 'uploading',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-3',
    name: 'image.png',
    status: 'error',
  },
];

const ref1 = ref(null);
const ref2 = ref(null);
const ref3 = ref(null);
const current = ref(0);
const tourOpen = ref(false);
const steps: TourProps['steps'] = [
  {
    title: 'Upload File',
    description: 'Put your files here.',
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
</script>
```

### Direction

Components which support rtl direction are listed here, you can toggle the direction in the demo.

```vue
<template>
  <span style="margin-right: 16px">Change direction of components:</span>
  <a-radio-group v-model:value="state.direction">
    <a-radio-button value="ltr">LTR</a-radio-button>
    <a-radio-button value="rtl">RTL</a-radio-button>
  </a-radio-group>
  <a-divider />
  <a-config-provider :direction="state.direction">
    <a-space direction="vertical" class="direction-components">
      <a-row>
        <a-col :span="24">
          <a-divider orientation="left">Cascader example</a-divider>
          <a-cascader
            :options="cascaderOptions"
            placeholder="یک مورد انتخاب کنید"
            :placement="state.popupPlacement"
            @change="onCascaderChange"
          >
            <template #suffixIcon><SearchIcon /></template>
          </a-cascader>
          &nbsp;&nbsp;&nbsp;&nbsp; With search:
          <a-cascader
            :options="cascaderOptions"
            placeholder="Select an item"
            :placement="state.popupPlacement"
            :show-search="{ filter: cascaderFilter }"
            @change="onCascaderChange"
          >
            <template #suffixIcon><SmileOutlined /></template>
          </a-cascader>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-divider orientation="left">Switch example</a-divider>
          <a-space>
            <a-switch default-checked />
            <a-switch loading default-checked />
            <a-switch size="small" loading />
          </a-space>
        </a-col>
        <a-col :span="12">
          <a-divider orientation="left">Radio Group example</a-divider>
          <a-radio-group default-value="c" button-style="solid">
            <a-radio-button value="a">تهران</a-radio-button>
            <a-radio-button value="b" disabled>اصفهان</a-radio-button>
            <a-radio-button value="c">فارس</a-radio-button>
            <a-radio-button value="d">خوزستان</a-radio-button>
          </a-radio-group>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-divider orientation="left">Button example</a-divider>
          <div class="button-demo">
            <a-button type="primary">
              <template #icon><DownloadOutlined /></template>
            </a-button>
            <a-button type="primary" shape="circle">
              <template #icon><DownloadOutlined /></template>
            </a-button>
            <a-button type="primary" shape="round">
              <template #icon><DownloadOutlined /></template>
            </a-button>
            <a-button type="primary" shape="round">
              <template #icon><DownloadOutlined /></template>
              Download
            </a-button>
            <a-button type="primary">
              <template #icon><DownloadOutlined /></template>
              Download
            </a-button>
            <br />
            <a-button-group>
              <a-button type="primary">
                <LeftOutlined />
                Backward
              </a-button>
              <a-button type="primary">
                Forward
                <RightOutlined />
              </a-button>
            </a-button-group>
            <a-button type="primary" loading>Loading</a-button>
            <a-button type="primary" size="small" loading>Loading</a-button>
          </div>
        </a-col>
        <a-col :span="12">
          <a-divider orientation="left">Tree example</a-divider>
          <a-tree
            v-model:expandedKeys="expandedKeys"
            v-model:selectedKeys="selectedKeys"
            v-model:checkedKeys="checkedKeys"
            show-line
            checkable
            :tree-data="treeData"
          >
            <template #title="{ title, key }">
              <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ title }}</span>
              <template v-else>{{ title }}</template>
            </template>
          </a-tree>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-divider orientation="left">Input (Input Group) example</a-divider>
          <a-space direction="vertical" style="width: 100%">
            <a-input-group size="large">
              <a-row :gutter="8">
                <a-col :span="5">
                  <a-input default-value="0571" />
                </a-col>
                <a-col :span="8">
                  <a-input default-value="26888888" />
                </a-col>
              </a-row>
            </a-input-group>
            <a-input-group compact>
              <a-input style="width: 20%" default-value="0571" />
              <a-input style="width: 30%" default-value="26888888" />
            </a-input-group>
            <a-input-group compact>
              <a-select default-value="Option1">
                <a-select-option value="Option1">Option1</a-select-option>
                <a-select-option value="Option2">Option2</a-select-option>
              </a-select>
              <a-input style="width: 50%" default-value="input content" />
              <a-inputNumber />
            </a-input-group>
            <a-input-search placeholder="input search text" enter-button="Search" size="large" />
            <div style="margin-bottom: 16px">
              <a-input default-value="mysite">
                <template #selectBefore>
                  <a-select default-value="Http://" style="width: 90px">
                    <a-select-option value="Http://">Http://</a-select-option>
                    <a-select-option value="Https://">Https://</a-select-option>
                  </a-select>
                </template>
                <template #selectAfter>
                  <a-select default-value=".com" style="width: 80px">
                    <a-select-option value=".com">.com</a-select-option>
                    <a-select-option value=".jp">.jp</a-select-option>
                    <a-select-option value=".cn">.cn</a-select-option>
                    <a-select-option value=".org">.org</a-select-option>
                  </a-select>
                </template>
              </a-input>
            </div>
            <a-row>
              <a-col :span="12">
                <a-divider orientation="left">Select example</a-divider>
                <a-space wrap>
                  <a-select mode="multiple" default-value="مورچه" style="width: 120px">
                    <a-select-option value="jack">Jack</a-select-option>
                    <a-select-option value="مورچه">مورچه</a-select-option>
                    <a-select-option value="disabled" disabled>Disabled</a-select-option>
                    <a-select-option value="Yiminghe">yiminghe</a-select-option>
                  </a-select>
                  <a-select default-value="مورچه" style="width: 120px" disabled>
                    <a-select-option value="مورچه">مورچه</a-select-option>
                  </a-select>
                  <a-select default-value="مورچه" style="width: 120px" loading>
                    <a-select-option value="مورچه">مورچه</a-select-option>
                  </a-select>
                  <a-select
                    show-search
                    style="width: 200px"
                    placeholder="Select a person"
                    option-filter-prop="children"
                    :filter-option="
                      (input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    "
                  >
                    <a-select-option value="jack">Jack</a-select-option>
                    <a-select-option value="سعید">سعید</a-select-option>
                    <a-select-option value="tom">Tom</a-select-option>
                  </a-select>
                </a-space>
              </a-col>
              <a-col :span="12">
                <a-divider orientation="left">TreeSelect example</a-divider>
                <div>
                  <a-tree-select
                    show-search
                    style="width: 100%"
                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                    placeholder="Please select"
                    allow-clear
                    tree-default-expand-all
                    :tree-data="treeSelectData"
                  ></a-tree-select>
                </div>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24">
                <a-divider orientation="left">Modal example</a-divider>
                <div>
                  <a-button type="primary" @click="showModal">Open Modal</a-button>
                  <a-modal v-model:open="state.modalVisible" title="پنچره ساده">
                    <p>نگاشته‌های خود را اینجا قراردهید</p>
                    <p>نگاشته‌های خود را اینجا قراردهید</p>
                    <p>نگاشته‌های خود را اینجا قراردهید</p>
                  </a-modal>
                </div>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24">
                <a-divider orientation="left">Steps example</a-divider>
                <div>
                  <a-steps
                    progress-dot
                    :current="state.currentStep"
                    :items="[
                      {
                        title: 'Finished',
                        description: 'This is a description.',
                      },
                      {
                        title: 'In Progress',
                        description: 'This is a description.',
                      },
                      {
                        title: 'Waiting',
                        description: 'This is a description.',
                      },
                    ]"
                  ></a-steps>
                  <br />
                  <a-steps
                    :current="state.currentStep"
                    :items="[
                      {
                        title: 'Step 1',
                        description: 'This is a description.',
                      },
                      {
                        title: 'Step 2',
                        description: 'This is a description.',
                      },
                      {
                        title: 'Step 3',
                        description: 'This is a description.',
                      },
                    ]"
                    @change="onStepsChange"
                  ></a-steps>
                </div>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-divider orientation="left">Rate example</a-divider>
                <div>
                  <a-rate v-model:value="rateValue" />
                  <br />
                  <strong>* Note:</strong>
                  Half star not implemented in RTL direction.
                </div>
              </a-col>
              <a-col :span="12">
                <a-divider orientation="left">Badge example</a-divider>
                <div>
                  <div>
                    <a-badge :count="state.badgeCount">
                      <a href="#" class="head-example" />
                    </a-badge>
                    <a-button-group>
                      <a-button @click="declineBadge">
                        <MinusOutlined />
                      </a-button>
                      <a-button @click="increaseBadge">
                        <PlusOutlined />
                      </a-button>
                    </a-button-group>
                  </div>
                  <div style="margin-top: 10px">
                    <a-badge :dot="state.showBadge">
                      <a href="#" class="head-example" />
                    </a-badge>
                    <a-switch :checked="state.showBadge" @change="onChangeBadge" />
                  </div>
                </div>
              </a-col>
            </a-row>
          </a-space>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-divider orientation="left">Pagination example</a-divider>
          <a-pagination show-size-changer :default-current="3" :total="500" />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-divider orientation="left">Grid System example</a-divider>
          <div class="grid-demo">
            <div class="code-box-demo">
              <p>
                <strong>* Note:</strong>
                Every calculation in RTL grid system is from right side (offset, push, etc.)
              </p>
              <a-row>
                <a-col :span="8">col-8</a-col>
                <a-col :span="8" :offset="8">col-8</a-col>
              </a-row>
              <a-row>
                <a-col :span="6" :offset="6">col-6 col-offset-6</a-col>
                <a-col :span="6" :offset="6">col-6 col-offset-6</a-col>
              </a-row>
              <a-row>
                <a-col :span="12" :offset="6">col-12 col-offset-6</a-col>
              </a-row>
              <a-row>
                <a-col :span="18" :push="6">col-18 col-push-6</a-col>
                <a-col :span="6" :pull="18">col-6 col-pull-18</a-col>
              </a-row>
            </div>
          </div>
        </a-col>
      </a-row>
    </a-space>
  </a-config-provider>
</template>
<script lang="ts" setup>
import { reactive, watch, ref } from 'vue';

import {
  SearchOutlined as SearchIcon,
  SmileOutlined,
  DownloadOutlined,
  LeftOutlined,
  RightOutlined,
  MinusOutlined,
  PlusOutlined,
} from '@ant-design/icons-vue';
import type { TreeProps, TreeSelectProps, CascaderProps } from 'ant-design-vue';

const state = reactive({
  currentStep: 0,
  modalVisible: false,

  badgeCount: 5,
  showBadge: true,
  direction: 'ltr' as 'ltr' | 'rtl',
  popupPlacement: 'bottomLeft' as CascaderProps['placement'],
});
const expandedKeys = ref<string[]>(['0-0-0', '0-0-1']);
const selectedKeys = ref<string[]>(['0-0-0', '0-0-1']);
const checkedKeys = ref<string[]>(['0-0-0', '0-0-1']);

const treeData: TreeProps['treeData'] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
        children: [
          { title: 'leaf', key: '0-0-0-0', disableCheckbox: true },
          { title: 'leaf', key: '0-0-0-1' },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ key: '0-0-1-0', title: 'sss' }],
      },
    ],
  },
];

const treeSelectData = ref<TreeSelectProps['treeData']>([
  {
    title: 'parent 1',
    value: 'parent 1',
    children: [
      {
        title: 'parent 1-0',
        value: 'parent 1-0',
        children: [
          {
            title: 'my leaf',
            value: 'leaf1',
          },
          {
            title: 'your leaf',
            value: 'leaf2',
          },
        ],
      },
      {
        title: 'parent 1-1',
        value: 'parent 1-1',
      },
    ],
  },
]);
watch(
  () => state.direction,
  directionValue => {
    if (directionValue === 'rtl') {
      state.popupPlacement = 'bottomRight';
    } else {
      state.popupPlacement = 'bottomLeft';
    }
  },
);
const cascaderOptions = [
  {
    value: 'tehran',
    label: 'تهران',
    children: [
      {
        value: 'tehran-c',
        label: 'تهران',
        children: [
          {
            value: 'saadat-abad',
            label: 'سعادت آیاد',
          },
        ],
      },
    ],
  },
  {
    value: 'ardabil',
    label: 'اردبیل',
    children: [
      {
        value: 'ardabil-c',
        label: 'اردبیل',
        children: [
          {
            value: 'primadar',
            label: 'پیرمادر',
          },
        ],
      },
    ],
  },
  {
    value: 'gilan',
    label: 'گیلان',
    children: [
      {
        value: 'rasht',
        label: 'رشت',
        children: [
          {
            value: 'district-3',
            label: 'منطقه ۳',
          },
        ],
      },
    ],
  },
];

// ==== Cascader ====
const cascaderFilter = (inputValue, path) =>
  path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);

const onCascaderChange = value => {
  console.log(value);
};
// ==== End Cascader ====

// ==== Modal ====
const showModal = () => {
  state.modalVisible = true;
};

// ==== End Modal ====

const onStepsChange = currentStep => {
  console.log('onChange:', currentStep);
  state.currentStep = currentStep;
};

// ==== Badge ====

const increaseBadge = () => {
  const badgeCount = state.badgeCount + 1;
  state.badgeCount = badgeCount;
};

const declineBadge = () => {
  let badgeCount = state.badgeCount - 1;
  if (badgeCount < 0) {
    badgeCount = 0;
  }
  state.badgeCount = badgeCount;
};

const onChangeBadge = showBadge => {
  state.showBadge = showBadge;
};
const rateValue = ref(2);
</script>
<style lang="less" scoped>
.direction-components {
  width: 100%;
  .button-demo .ant-btn,
  .button-demo .ant-btn-group {
    margin-right: 8px;
    margin-bottom: 12px;
  }
  .button-demo .ant-btn-group > .ant-btn,
  .button-demo .ant-btn-group > span > .ant-btn {
    margin-right: 0;
    margin-left: 0;
  }

  .head-example {
    display: inline-block;
    width: 42px;
    height: 42px;
    vertical-align: middle;
    background: #eee;
    border-radius: 4px;
  }

  .ant-badge:not(.ant-badge-not-a-wrapper) {
    margin-right: 20px;
  }
  .ant-badge-rtl:not(.ant-badge-not-a-wrapper) {
    margin-right: 0;
    margin-left: 20px;
  }
}

[data-theme='dark'] .head-example {
  background: rgba(255, 255, 255, 0.12);
}
</style>
```

## API Reference

- [Button](api/button.md)
- [Divider](api/divider.md)
- [Watermark](api/watermark.md)
- [FloatButton](api/float-button.md)
- [App](api/app.md)
- [Icon](api/icon.md)
- [ConfigProvider](api/config-provider.md)
