---
name: skeleton
description: Skeleton - Provide a placeholder while you wait for content to load, or to visualise content that doesn't exist yet.
---

# Skeleton

Provide a placeholder while you wait for content to load, or to visualise content that doesn't exist yet.

## API

### Skeleton

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| active | Show animation effect | boolean | false |
| avatar | Show avatar placeholder | boolean \| [SkeletonAvatarProps](#skeletonavatarprops) | false |
| loading | Display the skeleton when `true` | boolean | - |
| paragraph | Show paragraph placeholder | boolean \| [SkeletonParagraphProps](#skeletonparagraphprops) | true |
| title | Show title placeholder | boolean \| [SkeletonTitleProps](#skeletontitleprops) | true |

## SkeletonAvatarProps

| Property | Description             | Type                                      | Default |
| -------- | ----------------------- | ----------------------------------------- | ------- |
| shape    | Set the shape of avatar | `circle` \| `square`                      | -       |
| size     | Set the size of avatar  | number \| `large` \| `small` \| `default` | -       |

### SkeletonTitleProps

| Property | Description            | Type             | Default |
| -------- | ---------------------- | ---------------- | ------- |
| width    | Set the width of title | number \| string | -       |

### SkeletonParagraphProps

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| rows | Set the row count of paragraph | number | - |
| width | Set the width of paragraph. When width is an Array, it can set the width of each row. Otherwise only set the last row width | number \| string \| Array&lt;number \| string> | - |

### SkeletonButtonProps (3.0+)

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| active | Show animation effect | boolean | false |  |
| block | Option to fit button width to its parent width | boolean | false |  |
| shape | Set the shape of button | `circle` \| `round` \| `default` | - |  |
| size | Set the size of button | `large` \| `small` \| `default` | - |  |

### SkeletonInputProps (3.0+)

| Property | Description           | Type                            | Default |
| -------- | --------------------- | ------------------------------- | ------- |
| active   | Show animation effect | boolean                         | false   |
| size     | Set the size of input | `large` \| `small` \| `default` | -       |
