---
name: tour
description: Tour - A popup component for guiding users through a product. Available since `4.0.0`.
---

# Tour

A popup component for guiding users through a product. Available since `4.0.0`.

## API

### Tour

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| arrow | Whether to show the arrow, including the configuration whether to point to the center of the element | `boolean`\|`{ pointAtCenter: boolean}` | `true` |  |
| placement | Position of the guide card relative to the target element | `left` `leftTop` `leftBottom` `right` `rightTop` `rightBottom` `top` `topLeft` `topRight` `bottom` `bottomLeft` `bottomRight` | `bottom` |  |
| mask | Whether to enable masking, change mask style and fill color by pass custom props | `boolean` \| `{ style?: CSSProperties; color?: string; }` | `true` |  |
| type | Type, affects the background color and text color | `default` `primary` | `default` |  |
| open | Open tour | `boolean` | - |  |
| current(v-model) | What is the current step | `number` | - |  |
| scrollIntoViewOptions | support pass custom scrollIntoView options | `boolean` \| `ScrollIntoViewOptions` | `true` |  |
| indicatorsRender | custom indicator | `v-slot:indicatorsRender="{current, total}"` | - |  |
| zIndex | Tour's zIndex | `number` | `1001` |  |

### Tour events

| Events Name | Description | Arguments | Version |
| --- | --- | --- | --- | --- |
| close | Callback function on shutdown | `Function` | - |  |
| finish | Callback function on finished | `Function` | - |  |
| change | Callback when the step changes. Current is the previous step | `(current: number) => void` |

### TourStep

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| target | Get the element the guide card points to. Empty makes it show in center of screen | `() => HTMLElement` `HTMLElement` | - |  |
| arrow | Whether to show the arrow, including the configuration whether to point to the center of the element | `boolean` `{ pointAtCenter: boolean}` | `true` |  |
| cover | Displayed pictures or videos | `VueNode` | - |  |
| title | title | `VueNode` | - |  |
| description | description | `VueNode` | - |  |
| placement | Position of the guide card relative to the target element | `left` `leftTop` `leftBottom` `right` `rightTop` `rightBottom` `top` `topLeft` `topRight` `bottom` `bottomLeft` `bottomRight` | `bottom` |  |
| mask | Whether to enable masking, change mask style and fill color by pass custom props, the default follows the `mask` property of Tour | `boolean` \| `{ style?: CSSProperties; color?: string; }` | `true` |  |
| type | Type, affects the background color and text color | `default` `primary` | `default` |  |
| nextButtonProps | Properties of the Next button | `{ children: VueNode; onClick: Function }` | - |  |
| prevButtonProps | Properties of the previous button | `{ children: VueNode; onClick: Function }` | - |  |
| scrollIntoViewOptions | support pass custom scrollIntoView options, the default follows the `scrollIntoViewOptions` property of Tour | `boolean` \| `ScrollIntoViewOptions` | `true` |  |

### TourStep events

| Events Name | Description                   | Arguments  | Version |
| ----------- | ----------------------------- | ---------- | ------- | --- |
| close       | Callback function on shutdown | `Function` | -       |     |

## Theme Tokens

Use via `theme.components.Tour` in ConfigProvider.

| Token | Type | Description |
| --- | --- | --- |
| `tourZIndexPopup` | `number` | - |
| `indicatorWidth` | `number` | - |
| `indicatorHeight` | `number` | - |
| `tourBorderRadius` | `number` | - |
| `tourCloseSize` | `number` | - |
