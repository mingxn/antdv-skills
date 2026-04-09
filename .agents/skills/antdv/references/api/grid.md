---
name: grid
description: Grid - 24 Grids System.
---

# Grid

24 Grids System.

## API

### Row

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| align | Vertical alignment | `top` \| `middle` \| `bottom` \| `stretch` \| `{[key in 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl']: 'top' | 'middle' | 'bottom' | 'stretch'}` | `top` | object: 4.0 |
| gutter | Spacing between grids, could be a number or a object like `{ xs: 8, sm: 16, md: 24}`. or you can use array to make horizontal and vertical spacing work at the same time `[horizontal, vertical]` (supported after `1.5.0`) | number/object/array | 0 | - |
| justify | Horizontal arrangement | `start` \| `end` \| `center` \| `space-around` \| `space-between` \| `space-evenly` \| `{[key in 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl']: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'}` | `start` | object: 4.0 |
| wrap | Auto wrap line | boolean | false | - |

### Col

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| flex | the layout fill of flex | string\|number | - |
| offset | the number of cells to offset Col from the left | number | 0 |
| order | raster order, used in `flex` layout mode | number | 0 |
| pull | the number of cells that raster is moved to the left | number | 0 |
| push | the number of cells that raster is moved to the right | number | 0 |
| span | raster number of cells to occupy, 0 corresponds to `display: none` | number | none |
| xs | `<576px` and also default setting, could be a `span` value or an object containing above props | number\|object | - |
| sm | `≥576px`, could be a `span` value or an object containing above props | number\|object | - |
| md | `≥768px`, could be a `span` value or an object containing above props | number\|object | - |
| lg | `≥992px`, could be a `span` value or an object containing above props | number\|object | - |
| xl | `≥1200px`, could be a `span` value or an object containing above props | number\|object | - |
| xxl | `≥1600px`, could be a `span` value or an object containing above props | number\|object | - |

You can modify the breakpoints values using by modifying `screen[XS|SM|MD|LG|XL|XXL]` with [theme customization](/docs/vue/customize-theme) (since 4.0.0, [sandbox demo](https://codesandbox.io/s/usebreakpoint-hook-ant-design-vue-4-0-0-beta-4-forked-n2k1sy?file=/src/demo.vue)).

The breakpoints of responsive grid follow [BootStrap 4 media queries rules](https://getbootstrap.com/docs/4.0/layout/overview/#responsive-breakpoints)(not including `occasionally part`).
