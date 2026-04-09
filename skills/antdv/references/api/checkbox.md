---
name: checkbox
description: Checkbox - Checkbox component.
---

# Checkbox

Checkbox component.

## API

### Props

#### Checkbox

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| autofocus | get focus when component mounted | boolean | false |  |
| checked(v-model) | Specifies whether the checkbox is selected. | boolean | false |  |
| disabled | Disable checkbox | boolean | false |  |
| indeterminate | indeterminate checked state of checkbox | boolean | false |  |
| value | value of checkbox in CheckboxGroup | boolean \| string \| number | - |  |

#### events

| Events Name | Description | Arguments | Version |
| --- | --- | --- | --- |
| change | The callback function that is triggered when the state changes. | Function(e:Event) |  |

#### Checkbox Group

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| disabled | Disable all checkboxes | boolean | false |  |
| name | The `name` property of all `input[type="checkbox"]` children | string | - | 1.5.0 |
| options | Specifies options, you can customize `label` with slot = "label" slot-scope="option" | string\[] \| Array&lt;{ label: string value: string disabled?: boolean, indeterminate?: boolean, onChange?: function }> | \[] |  |
| value(v-model) | Used for setting the currently selected value. | (boolean \| string \| number)\[] | \[] |  |

#### events

| Events Name | Description | Arguments | Version |
| --- | --- | --- | --- |
| change | The callback function that is triggered when the state changes. | Function(checkedValue) |  |

### Methods

#### Checkbox

| Name    | Description  | Version |
| ------- | ------------ | ------- |
| blur()  | remove focus |         |
| focus() | get focus    |         |

## Theme Tokens

Use via `theme.components.Checkbox` in ConfigProvider.

| Token | Type | Description |
| --- | --- | --- |
| `checkboxCls` | `string` | - |
| `checkboxSize` | `number` | - |
