---
name: divider
description: Divider - A divider line separates different content.
---

# Divider

A divider line separates different content.

## API

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| dashed | whether line is dashed | boolean | false |  |
| orientation | position of title inside divider | `left` \| `right` \| `center` | `center` |  |
| orientationMargin | The margin-left/right between the title and its closest border, while the `orientation` must be `left` or `right` | string \| number | - | 3.0 |
| plain | Divider text show as plain style | boolean | true | 2.2.0 |
| type | direction type of divider | `horizontal` \| `vertical` | `horizontal` |  |

## Theme Tokens

Use via `theme.components.Divider` in ConfigProvider.

| Token | Type | Description |
| --- | --- | --- |
| `sizePaddingEdgeHorizontal` | `number` | - |
