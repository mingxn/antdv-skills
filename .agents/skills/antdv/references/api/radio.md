---
name: radio
description: Radio - Radio.
---

# Radio

Radio.

## API

### Radio/Radio.Button

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| autofocus | get focus when component mounted | boolean | false |
| checked(v-model) | Specifies whether the radio is selected. | boolean | - |
| disabled | Disable radio | boolean | false |
| value | According to value for comparison, to determine whether the selected | any | - |

### RadioGroup

Radio group can wrap a group of `Radio`。

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| buttonStyle | style type of radio button | `outline` \| `solid` | `outline` |  |
| disabled | Disable all radio buttons | boolean | false |  |
| name | The `name` property of all `input[type="radio"]` children | string | - |  |
| options | set children optional | string\[] \| number\[] \| Array&lt;{ label: string value: string disabled?: boolean }> | - |  |
| optionType | Set Radio optionType | `default` \| `button` | `default` | 3.0.0 |
| size | size for radio button style | `large` \| `default` \| `small` | `default` |  |
| value(v-model) | Used for setting the currently selected value. | any | - |  |

### RadioGroup Events

| Events Name | Description | Arguments |
| --- | --- | --- |
| change | The callback function that is triggered when the state changes. | Function(e:Event) |

## Methods

### Radio

| Name    | Description  |
| ------- | ------------ |
| blur()  | remove focus |
| focus() | get focus    |

## Theme Tokens

Use via `theme.components.Radio` in ConfigProvider.

| Token | Type | Description |
| --- | --- | --- |
| `radioFocusShadow` | `string` | - |
| `radioButtonFocusShadow` | `string` | - |
| `radioSize` | `number` | - |
| `radioTop` | `number` | - |
| `radioDotSize` | `number` | - |
| `radioDotDisabledSize` | `number` | - |
| `radioCheckedColor` | `string` | - |
| `radioDotDisabledColor` | `string` | - |
| `radioSolidCheckedColor` | `string` | - |
| `radioButtonBg` | `string` | - |
| `radioButtonCheckedBg` | `string` | - |
| `radioButtonColor` | `string` | - |
| `radioButtonHoverColor` | `string` | - |
| `radioButtonActiveColor` | `string` | - |
| `radioButtonPaddingHorizontal` | `number` | - |
| `radioDisabledButtonCheckedBg` | `string` | - |
| `radioDisabledButtonCheckedColor` | `string` | - |
| `radioWrapperMarginRight` | `number` | - |
