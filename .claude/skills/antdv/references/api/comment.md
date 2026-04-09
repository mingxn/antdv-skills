---
name: comment
description: Comment - A comment displays user feedback and discussion to website content.
---

# Comment

A comment displays user feedback and discussion to website content.

## API

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| actions | List of action items rendered below the comment content | Array \| slot | - |
| author | The element to display as the comment author | string\|slot | - |
| avatar | The element to display as the comment avatar - generally an antd `Avatar` or src | string\|slot | - |
| content | The main content of the comment | string\|slot | - |
| datetime | A datetime element containing the time to be displayed | string\|slot | - |

## Theme Tokens

Use via `theme.components.Comment` in ConfigProvider.

| Token | Type | Description |
| --- | --- | --- |
| `commentBg` | `string` | - |
| `commentPaddingBase` | `string` | - |
| `commentNestIndent` | `string` | - |
| `commentFontSizeBase` | `number` | - |
| `commentFontSizeSm` | `number` | - |
| `commentAuthorNameColor` | `string` | - |
| `commentAuthorTimeColor` | `string` | - |
| `commentActionColor` | `string` | - |
| `commentActionHoverColor` | `string` | - |
| `commentActionsMarginBottom` | `string` | - |
| `commentActionsMarginTop` | `number` | - |
| `commentContentDetailPMarginBottom` | `string` | - |
