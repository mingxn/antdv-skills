---
name: result
description: Result - Used to feed back the results of a series of operational tasks.
---

# Result

Used to feed back the results of a series of operational tasks.

## API

| Property | Description | Type | Default |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| extra | operating area | slot | - |  |  |  |  |  |  |
| icon | custom back icon | slot | - |  |  |  |  |  |  |
| status | result status,decide icons and colors | `success` \| `error` \| `info` \| `warning` \| `404` \| `403` \| `500` | 'info' |
| subTitle | subTitle string | string \| VNode \| slot | - |  |  |  |  |  |  |
| title | title string | string \| VNode \| slot | - |  |  |  |  |  |  |

## Theme Tokens

Use via `theme.components.Result` in ConfigProvider.

| Token | Type | Description |
| --- | --- | --- |
| `imageWidth` | `number` | - |
| `imageHeight` | `number` | - |
