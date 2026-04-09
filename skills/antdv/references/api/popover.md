---
name: popover
description: Popover - The floating card popped by clicking or hovering.
---

# Popover

The floating card popped by clicking or hovering.

## API

| Param   | Description         | Type                | Default value | Version |
| ------- | ------------------- | ------------------- | ------------- | ------- |
| content | Content of the card | string\|slot\|vNode | -             |         |
| title   | Title of the card   | string\|slot\|VNode | -             |         |

Consult [Tooltip's documentation](/components/tooltip/#api) to find more APIs.

## Note

Please ensure that the child node of `Popover` accepts `onMouseenter`, `onMouseleave`, `onFocus`, `onClick` events.

## Theme Tokens

Use via `theme.components.Popover` in ConfigProvider.

| Token | Type | Description |
| --- | --- | --- |
| `zIndexPopup` | `number` | - |
| `width` | `number` | - |
