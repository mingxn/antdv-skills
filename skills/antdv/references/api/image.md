---
name: image
description: Image - Previewable image.
---

# Image

Previewable image.

## API

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| alt | Image description | string | - | 2.0.0 |
| fallback | Load failure fault-tolerant src | string | - | 2.0.0 |
| height | Image height | string \| number | - | 2.0.0 |
| placeholder | Load placeholder, use default placeholder when set `true` | boolean \| slot | - | 2.0.0 |
| preview | preview config, disabled when `false` | boolean \| [previewType](#previewtype) | true | 2.0.0 |
| src | Image path | string | - | 2.0.0 |
| previewMask | custom mask | false \| function \| slot | - | 3.2.0 |
| width | Image width | string \| number | - | 2.0.0 |

### events

| Events Name | Description          | Arguments              | Version |
| ----------- | -------------------- | ---------------------- | ------- |
| error       | Load failed callback | (event: Event) => void | 3.2.0   |

### previewType

```ts
{
  visible?: boolean;
  onVisibleChange?: (visible, prevVisible) => void;
  getContainer?: string | HTMLElement | (() => HTMLElement);
  src?: string;
  maskClassName?: string;
  current?: number;
}
```

Other attributes [&lt;img>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes)

## Theme Tokens

Use via `theme.components.Image` in ConfigProvider.

| Token | Type | Description |
| --- | --- | --- |
| `zIndexPopup` | `number` | - |
| `previewOperationSize` | `number` | - |
| `previewOperationColor` | `string` | - |
| `previewOperationColorDisabled` | `string` | - |
