---
name: page-header
description: PageHeader - A header with common actions and design elements built in.
---

# PageHeader

A header with common actions and design elements built in.

## API

| Param | Description | Type | Default value |
| --- | --- | --- | --- |
| avatar | Avatar next to the title bar | [avatar props](/components/avatar/) | - |
| backIcon | custom back icon, if false the back icon will not be displayed | string\|slot | `<ArrowLeft />` |
| breadcrumb | Breadcrumb configuration | [breadcrumb](/components/breadcrumb/) | - |
| extra | Operating area, at the end of the line of the title line | string\|slot | - |
| footer | PageHeader's footer, generally used to render TabBar | string\|slot | - |
| ghost | PageHeader type, will change background color | boolean | true |
| subTitle | custom subTitle text | string\|slot | - |
| tags | Tag list next to title | [Tag](/components/tag/)\[] \| [Tag](/components/tag/) | - |
| title | custom title text | string\|slot | - |

### Events

| Events Name | Description           | Arguments   |
| ----------- | --------------------- | ----------- |
| back        | back icon click event | function(e) |
