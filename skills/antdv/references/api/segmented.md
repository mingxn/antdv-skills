---
name: segmented
description: Segmented - Segmented Controls.
---

# Segmented

Segmented Controls.

## API

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| block | Option to fit width to its parent\'s width | boolean | false |  |
| disabled | Disable all segments | boolean | false |  |
| options | Set children optional | string[] \| number[] \| SegmentedOption[] | [] |  |
| size | The size of the Segmented. | `large` \| `middle` \| `small` | - |  |
| value | Currently selected value | string \| number |  |  |
| label | custom label by slot | v-slot:label="SegmentedBaseOption" |  |  |

### events

| Events Name | Description | Arguments |  |
| --- | --- | --- | --- |
| change | The callback function that is triggered when the state changes | function(value: string \| number) | - |

#### SegmentedBaseOption、 SegmentedOption

```ts
interface SegmentedBaseOption {
  value: string | number;
  disabled?: boolean;
  payload?: any; // payload more data
  /**
   * html `title` property for label
   */
  title?: string;
  className?: string;
}
interface SegmentedOption extends SegmentedBaseOption {
  label?: VueNode | ((option: SegmentedBaseOption) => VueNode);
}
```

## Theme Tokens

Use via `theme.components.Segmented` in ConfigProvider.

| Token | Type | Description |
| --- | --- | --- |
| `segmentedPaddingHorizontal` | `number` | - |
| `segmentedPaddingHorizontalSM` | `number` | - |
| `segmentedContainerPadding` | `number` | - |
| `labelColor` | `string` | - |
| `labelColorHover` | `string` | - |
| `bgColor` | `string` | - |
| `bgColorHover` | `string` | - |
| `bgColorSelected` | `string` | - |
