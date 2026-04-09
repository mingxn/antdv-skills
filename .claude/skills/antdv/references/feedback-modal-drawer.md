---
name: feedback-modal-drawer
description: Modal dialogs and Drawer panels for overlays, confirmations, and side forms
---

# Modal & Drawer

## When to Use

**Modal:** When requiring users to interact with the application, but without jumping to a new page and interrupting the user's workflow, you can use `Modal` to create a new floating layer over the current page to get user feedback or display information. Additionally, if you need show a simple confirmation dialog, you can use `antd.Modal.confirm()`, and so on.

**Drawer:** A Drawer is a panel that is typically overlaid on top of a page and slides in from the side. It contains a set of information or actions. Since the user can interact with the Drawer without leaving the current page, tasks can be achieved more efficiently within the same context.

- Use a Form to create or edit a set of information.
- Processing subtasks. When subtasks are too heavy for a Popover and we still want to keep the subtasks in the context of the main task, Drawer comes very handy.
- When the same Form is needed in multiple places.

**When to use which:**
- **Modal**: confirmations, short forms, critical actions that need attention
- **Drawer**: editing forms, detail panels, subtasks that keep main context visible

**Imperative confirmation:** Use `Modal.confirm()`, `Modal.info()`, `Modal.success()`, `Modal.error()`, `Modal.warning()` for programmatic dialogs without template.

**Form in Modal/Drawer:** Set `destroyOnClose` to reset form state, or manually call `formRef.resetFields()` on close.

## Components

Modal, Drawer

### Modal

### Basic usage

Basic modal.

```vue
<template>
  <div>
    <a-button type="primary" @click="showModal">Open Modal</a-button>
    <a-modal v-model:open="open" title="Basic Modal" @ok="handleOk">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const open = ref<boolean>(false);

const showModal = () => {
  open.value = true;
};

const handleOk = (e: MouseEvent) => {
  console.log(e);
  open.value = false;
};
</script>
```

### Confirmation modal dialog

To use `confirm()` to show a confirmation modal dialog.

```vue
<template>
  <a-space wrap>
    <a-button @click="showConfirm">Confirm</a-button>
    <a-button @click="showPromiseConfirm">With promise</a-button>
    <a-button type="dashed" @click="showDeleteConfirm">Delete</a-button>
    <a-button type="dashed" @click="showPropsConfirm">With extra props</a-button>
  </a-space>
</template>
<script lang="ts" setup>
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode } from 'vue';
import { Modal } from 'ant-design-vue';
const showConfirm = () => {
  Modal.confirm({
    title: 'Do you Want to delete these items?',
    icon: createVNode(ExclamationCircleOutlined),
    content: createVNode('div', { style: 'color:red;' }, 'Some descriptions'),
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
    class: 'test',
  });
};
const showDeleteConfirm = () => {
  Modal.confirm({
    title: 'Are you sure delete this task?',
    icon: createVNode(ExclamationCircleOutlined),
    content: 'Some descriptions',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};
const showPropsConfirm = () => {
  Modal.confirm({
    title: 'Are you sure delete this task?',
    icon: createVNode(ExclamationCircleOutlined),
    content: 'Some descriptions',
    okText: 'Yes',
    okType: 'danger',
    okButtonProps: {
      disabled: true,
    },
    cancelText: 'No',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

function showPromiseConfirm() {
  Modal.confirm({
    title: 'Do you want to delete these items?',
    icon: createVNode(ExclamationCircleOutlined),
    content: 'When clicked the OK button, this dialog will be closed after 1 second',
    async onOk() {
      try {
        return await new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        });
      } catch {
        return console.log('Oops errors!');
      }
    },
    onCancel() {},
  });
}
</script>
```

### Asynchronously close

Asynchronously close a modal dialog when the OK button is pressed.

For example, you can use this pattern when you submit a form.

```vue
<template>
  <div>
    <a-button type="primary" @click="showModal">Open Modal with async logic</a-button>
    <a-modal v-model:open="open" title="Title" :confirm-loading="confirmLoading" @ok="handleOk">
      <p>{{ modalText }}</p>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const modalText = ref<string>('Content of the modal');
const open = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);

const showModal = () => {
  open.value = true;
};

const handleOk = () => {
  modalText.value = 'The modal will be closed after two seconds';
  confirmLoading.value = true;
  setTimeout(() => {
    open.value = false;
    confirmLoading.value = false;
  }, 2000);
};
</script>
```

### Drawer

### Basic usage

Basic drawer.

```vue
<template>
  <a-button type="primary" @click="showDrawer">Open</a-button>
  <a-drawer
    v-model:open="open"
    class="custom-class"
    root-class-name="root-class-name"
    :root-style="{ color: 'blue' }"
    style="color: red"
    title="Basic Drawer"
    placement="right"
    @after-open-change="afterOpenChange"
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-drawer>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const open = ref<boolean>(false);

const afterOpenChange = (bool: boolean) => {
  console.log('open', bool);
};

const showDrawer = () => {
  open.value = true;
};
</script>
```

### Submit form in drawer

Use form in drawer with submit button.

```vue
<template>
  <a-button type="primary" @click="showDrawer">
    <template #icon><PlusOutlined /></template>
    New account
  </a-button>
  <a-drawer
    title="Create a new account"
    :width="720"
    :open="open"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <a-form :model="form" :rules="rules" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Name" name="name">
            <a-input v-model:value="form.name" placeholder="Please enter user name" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Url" name="url">
            <a-input
              v-model:value="form.url"
              style="width: 100%"
              addon-before="http://"
              addon-after=".com"
              placeholder="please enter url"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Owner" name="owner">
            <a-select v-model:value="form.owner" placeholder="Please a-s an owner">
              <a-select-option value="xiao">Xiaoxiao Fu</a-select-option>
              <a-select-option value="mao">Maomao Zhou</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Type" name="type">
            <a-select v-model:value="form.type" placeholder="Please choose the type">
              <a-select-option value="private">Private</a-select-option>
              <a-select-option value="public">Public</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Approver" name="approver">
            <a-select v-model:value="form.approver" placeholder="Please choose the approver">
              <a-select-option value="jack">Jack Ma</a-select-option>
              <a-select-option value="tom">Tom Liu</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="DateTime" name="dateTime">
            <a-date-picker
              v-model:value="form.dateTime"
              style="width: 100%"
              :get-popup-container="trigger => trigger.parentElement"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="Description" name="description">
            <a-textarea
              v-model:value="form.description"
              :rows="4"
              placeholder="please enter url description"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #extra>
      <a-space>
        <a-button @click="onClose">Cancel</a-button>
        <a-button type="primary" @click="onClose">Submit</a-button>
      </a-space>
    </template>
  </a-drawer>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import type { Rule } from 'ant-design-vue/es/form';
const form = reactive({
  name: '',
  url: '',
  owner: '',
  type: '',
  approver: '',
  dateTime: null,
  description: '',
});

const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: 'Please enter user name' }],
  url: [{ required: true, message: 'please enter url' }],
  owner: [{ required: true, message: 'Please select an owner' }],
  type: [{ required: true, message: 'Please choose the type' }],
  approver: [{ required: true, message: 'Please choose the approver' }],
  dateTime: [{ required: true, message: 'Please choose the dateTime', type: 'object' }],
  description: [{ required: true, message: 'Please enter url description' }],
};

const open = ref<boolean>(false);

const showDrawer = () => {
  open.value = true;
};

const onClose = () => {
  open.value = false;
};
</script>
```

### Multi-level drawer

Open a new drawer on top of an existing drawer to handle multi branch tasks.

```vue
<template>
  <a-button type="primary" @click="showDrawer">Open</a-button>
  <a-drawer
    v-model:open="open"
    title="Multi-level drawer"
    width="520"
    :closable="false"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <a-button type="primary" @click="showChildrenDrawer">Two-level drawer</a-button>
    <a-drawer v-model:open="childrenDrawer" title="Two-level Drawer" width="320" :closable="false">
      <a-button type="primary" @click="showChildrenDrawer">This is two-level drawer</a-button>
    </a-drawer>

    <template #footer>
      <a-button style="margin-right: 8px" @click="onClose">Cancel</a-button>
      <a-button type="primary" @click="onClose">Submit</a-button>
    </template>
  </a-drawer>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const open = ref<boolean>(false);

const childrenDrawer = ref<boolean>(false);

const showDrawer = () => {
  open.value = true;
};
const onClose = () => {
  open.value = false;
};
const showChildrenDrawer = () => {
  childrenDrawer.value = true;
};
</script>
```

## API Reference

- [Modal](api/modal.md)
- [Drawer](api/drawer.md)
