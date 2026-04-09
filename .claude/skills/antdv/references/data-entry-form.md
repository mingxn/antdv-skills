---
name: data-entry-form
description: Form layout, validation rules, dynamic fields, useForm composition API, and form patterns
---

# Forms & Validation

## When to Use

- When you need to create an instance or collect information.
- When you need to validate fields in certain rules.

**Key concepts:**
- Bind form data with `:model="formState"` on `<a-form>`
- Each `<a-form-item name="fieldName">` must match a key in the model object
- Rules can be inline on FormItem or centralized via `:rules` on Form
- Use `v-model:value` for most inputs, `v-model:checked` for Checkbox/Switch
- Call `formRef.validate()` to trigger validation programmatically
- Use `Form.useForm()` for composition API validation without Form component

## Components

Form

### Basic Usage

Basic Form data control. Includes layout, initial values, validation and submit.

```vue
<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="Username"
      name="username"
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item
      label="Password"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
      <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
});
const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>
```

### Custom validation rules

This example shows how to customize your own validation rules to finish a two-factor password verification.
You can use `has-feedback` to reflect validation result as an icon.
See more advanced usage at [async-validator](https://github.com/yiminghe/async-validator).

```vue
<template>
  <a-form
    ref="formRef"
    name="custom-validation"
    :model="formState"
    :rules="rules"
    v-bind="layout"
    @finish="handleFinish"
    @validate="handleValidate"
    @finishFailed="handleFinishFailed"
  >
    <a-form-item has-feedback label="Password" name="pass">
      <a-input v-model:value="formState.pass" type="password" autocomplete="off" />
    </a-form-item>
    <a-form-item has-feedback label="Confirm" name="checkPass">
      <a-input v-model:value="formState.checkPass" type="password" autocomplete="off" />
    </a-form-item>
    <a-form-item has-feedback label="Age" name="age">
      <a-input-number v-model:value="formState.age" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';
import type { FormInstance } from 'ant-design-vue';
interface FormState {
  pass: string;
  checkPass: string;
  age: number | undefined;
}
const formRef = ref<FormInstance>();
const formState = reactive<FormState>({
  pass: '',
  checkPass: '',
  age: undefined,
});
const checkAge = async (_rule: Rule, value: number) => {
  if (!value) {
    return Promise.reject('Please input the age');
  }
  if (!Number.isInteger(value)) {
    return Promise.reject('Please input digits');
  } else {
    if (value < 18) {
      return Promise.reject('Age must be greater than 18');
    } else {
      return Promise.resolve();
    }
  }
};
const validatePass = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('Please input the password');
  } else {
    if (formState.checkPass !== '') {
      formRef.value.validateFields('checkPass');
    }
    return Promise.resolve();
  }
};
const validatePass2 = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('Please input the password again');
  } else if (value !== formState.pass) {
    return Promise.reject("Two inputs don't match!");
  } else {
    return Promise.resolve();
  }
};

const rules: Record<string, Rule[]> = {
  pass: [{ required: true, validator: validatePass, trigger: 'change' }],
  checkPass: [{ validator: validatePass2, trigger: 'change' }],
  age: [{ validator: checkAge, trigger: 'change' }],
};
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};
const handleFinish = (values: FormState) => {
  console.log(values, formState);
};
const handleFinishFailed = errors => {
  console.log(errors);
};
const resetForm = () => {
  formRef.value.resetFields();
};
const handleValidate = (...args) => {
  console.log(args);
};
</script>
```

### Dynamic Form Item

Add or remove form items dynamically.

```vue
<template>
  <a-form
    ref="formRef"
    name="dynamic_form_item"
    :model="dynamicValidateForm"
    v-bind="formItemLayoutWithOutLabel"
  >
    <a-form-item
      v-for="(domain, index) in dynamicValidateForm.domains"
      :key="domain.key"
      v-bind="index === 0 ? formItemLayout : {}"
      :label="index === 0 ? 'Domains' : ''"
      :name="['domains', index, 'value']"
      :rules="{
        required: true,
        message: 'domain can not be null',
        trigger: 'change',
      }"
    >
      <a-input
        v-model:value="domain.value"
        placeholder="please input domain"
        style="width: 60%; margin-right: 8px"
      />
      <MinusCircleOutlined
        v-if="dynamicValidateForm.domains.length > 1"
        class="dynamic-delete-button"
        @click="removeDomain(domain)"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayoutWithOutLabel">
      <a-button type="dashed" style="width: 60%" @click="addDomain">
        <PlusOutlined />
        Add field
      </a-button>
    </a-form-item>
    <a-form-item v-bind="formItemLayoutWithOutLabel">
      <a-button type="primary" html-type="submit" @click="submitForm">Submit</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
import type { FormInstance } from 'ant-design-vue';

interface Domain {
  value: string;
  key: number;
}
const formRef = ref<FormInstance>();
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};
const dynamicValidateForm = reactive<{ domains: Domain[] }>({
  domains: [],
});
const submitForm = () => {
  formRef.value
    .validate()
    .then(() => {
      console.log('values', dynamicValidateForm.domains);
    })
    .catch(error => {
      console.log('error', error);
    });
};
const resetForm = () => {
  formRef.value.resetFields();
};
const removeDomain = (item: Domain) => {
  const index = dynamicValidateForm.domains.indexOf(item);
  if (index !== -1) {
    dynamicValidateForm.domains.splice(index, 1);
  }
};
const addDomain = () => {
  dynamicValidateForm.domains.push({
    value: '',
    key: Date.now(),
  });
};
</script>

<style scoped>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
```

### Form in Modal to Create

When user visit a page with a list of items, and want to create a new item. The page can popup a form in Modal, then let user fill in the form to create an item.

```vue
<template>
  <div>
    <a-button type="primary" @click="visible = true">New Collection</a-button>
    <a-modal
      v-model:open="visible"
      title="Create a new collection"
      ok-text="Create"
      cancel-text="Cancel"
      @ok="onOk"
    >
      <a-form ref="formRef" :model="formState" layout="vertical" name="form_in_modal">
        <a-form-item
          name="title"
          label="Title"
          :rules="[{ required: true, message: 'Please input the title of collection!' }]"
        >
          <a-input v-model:value="formState.title" />
        </a-form-item>
        <a-form-item name="description" label="Description">
          <a-textarea v-model:value="formState.description" />
        </a-form-item>
        <a-form-item name="modifier" class="collection-create-form_last-form-item">
          <a-radio-group v-model:value="formState.modifier">
            <a-radio value="public">Public</a-radio>
            <a-radio value="private">Private</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, toRaw } from 'vue';
import type { FormInstance } from 'ant-design-vue';

interface Values {
  title: string;
  description: string;
  modifier: string;
}

const formRef = ref<FormInstance>();
const visible = ref(false);
const formState = reactive<Values>({
  title: '',
  description: '',
  modifier: 'public',
});

const onOk = () => {
  formRef.value
    .validateFields()
    .then(values => {
      console.log('Received values of form: ', values);
      console.log('formState: ', toRaw(formState));
      visible.value = false;
      formRef.value.resetFields();
      console.log('reset formState: ', toRaw(formState));
    })
    .catch(info => {
      console.log('Validate Failed:', info);
    });
};
</script>
<style scoped>
.collection-create-form_last-form-item {
  margin-bottom: 0;
}
</style>
```

## API Reference

See [api/form.md](api/form.md) for full props, events, slots, and methods.
