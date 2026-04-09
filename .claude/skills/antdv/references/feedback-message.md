---
name: feedback-message
description: Message toasts and Notification panels for user feedback
---

# Messages & Notifications

## When to Use

**Message:** - To provide feedback such as success, warning, error etc.
- A message is displayed at top and center and will be dismissed automatically, as a non-interrupting light-weighted prompt.

**Notification:** To display a notification message at any of the four corners of the viewport. Typically it can be used in the following cases:

- A notification with complex content.
- A notification providing a feedback based on the user interaction. Or it may show some details about upcoming steps the user may have to follow.
- A notification that is pushed by the application.

**When to use which:**
- **Message**: brief, auto-dismissing feedback at top-center (success/error/info/warning/loading)
- **Notification**: richer feedback at viewport corner, supports title + description + actions

**Recommended pattern:** Use hooks API (`message.useMessage()`, `notification.useNotification()`) to get context support. Place the `contextHolder` in your template.

```vue
<script setup>
import { message } from 'ant-design-vue';
const [messageApi, contextHolder] = message.useMessage();
const showSuccess = () => messageApi.success('Done!');
</script>
<template>
  <component :is="contextHolder" />
  <a-button @click="showSuccess">Success</a-button>
</template>
```

## Components

Message, Notification

### Message

### Other types of message

Messages of success, error and warning types.

```vue
<template>
  <a-space>
    <a-button @click="success">Success</a-button>
    <a-button @click="error">Error</a-button>
    <a-button @click="warning">Warning</a-button>
  </a-space>
</template>
<script lang="ts" setup>
import { message } from 'ant-design-vue';
const success = () => {
  message.success('This is a success message');
};
const error = () => {
  message.error('This is an error message');
};
const warning = () => {
  message.warning('This is a warning message');
};
</script>
```

### Message with loading indicator

Display a global loading indicator, which is dismissed by itself asynchronously.

```vue
<template>
  <a-button @click="success">Display a loading indicator</a-button>
</template>
<script lang="ts" setup>
import { message } from 'ant-design-vue';
const success = () => {
  const hide = message.loading('Action in progress..', 0);
  setTimeout(hide, 2500);
};
</script>
```

### Notification

### Basic usage

The simplest usage that close the notification box after 4.5s.

```vue
<template>
  <a-button type="primary" @click="openNotification">Open the notification box</a-button>
</template>
<script lang="ts" setup>
import { notification } from 'ant-design-vue';
const openNotification = () => {
  notification.open({
    message: 'Notification Title',
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};
</script>
```

### Notification with icon

A notification box with a icon at the left side.

```vue
<template>
  <div>
    <a-button @click="() => openNotificationWithIcon('success')">Success</a-button>
    <a-button @click="() => openNotificationWithIcon('info')">Info</a-button>
    <a-button @click="() => openNotificationWithIcon('warning')">Warning</a-button>
    <a-button @click="() => openNotificationWithIcon('error')">Error</a-button>
  </div>
</template>
<script lang="ts" setup>
import { notification } from 'ant-design-vue';
const openNotificationWithIcon = (type: string) => {
  notification[type]({
    message: 'Notification Title',
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
  });
};
</script>
```

## API Reference

- [Message](api/message.md)
- [Notification](api/notification.md)
