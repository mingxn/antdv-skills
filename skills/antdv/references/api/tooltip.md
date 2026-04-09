---
name: tooltip
description: Tooltip - A simple text popup tip.
---

# Tooltip

A simple text popup tip.

## API

| Property | Description                   | Type         | Default |
| -------- | ----------------------------- | ------------ | ------- |
| title    | The text shown in the tooltip | string\|slot | -       |

### Common API

The following APIs are shared by Tooltip, Popconfirm, Popover.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| align | this value will be merged into placement's config, please refer to the settings [dom-align](https://github.com/yiminghe/dom-align) | Object | - |  |
| arrowPointAtCenter | Whether the arrow is pointed at the center of target | boolean | `false` |  |
| arrow | Change arrow's visible state and change whether the arrow is pointed at the center of target. | boolean \| { pointAtCenter: boolean} | `true` | 4.2.0 |
| autoAdjustOverflow | Whether to adjust popup placement automatically when popup is off screen | boolean | `true` |  |
| color | The background color | string | - |  |
| destroyTooltipOnHide | Whether to destroy tooltip on hide | boolean | false |  |
| getPopupContainer | The DOM container of the tip, the default behavior is to create a `div` element in `body`. | (triggerNode: HTMLElement) => HTMLElement | () => document.body |  |
| mouseEnterDelay | Delay in seconds, before tooltip is shown on mouse enter | number | 0.1 |  |
| mouseLeaveDelay | Delay in seconds, before tooltip is hidden on mouse leave | number | 0.1 |  |
| overlayClassName | Class name of the tooltip card | string | - |  |
| overlayStyle | Style of the tooltip card | object | - |  |
| overlayInnerStyle | Style of the tooltip inner content | object | - | 4.0.0 |
| placement | The position of the tooltip relative to the target, which can be one of `top` `left` `right` `bottom` `topLeft` `topRight` `bottomLeft` `bottomRight` `leftTop` `leftBottom` `rightTop` `rightBottom` | string | `top` |  |
| trigger | Tooltip trigger mode | `hover` \| `focus` \| `click` \| `contextmenu` | `hover` |  |
| open(v-model) | Whether the floating tooltip card is open or not, Use `visible` under 4.0.0 | boolean | `false` | 4.0.0 |

### events

| Events Name | Description | Arguments | Version |
| --- | --- | --- | --- |
| openChange | Callback executed when visibility of the tooltip card is changed | (visible) => void | 4.0 |

## Note

Please ensure that the child node of `Tooltip` accepts `mouseenter`, `mouseleave`, `focus`, `click` events.

## Theme Tokens

Use via `theme.components.Tooltip` in ConfigProvider.

| Token | Type | Description |
| --- | --- | --- |
| `zIndexPopup` | `number` | - |
| `colorBgDefault` | `string` | - |
