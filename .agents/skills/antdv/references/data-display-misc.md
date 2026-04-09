---
name: data-display-misc
description: Avatar, Badge, Tag, Statistic, Empty, QRCode, Image, Carousel, Timeline, Comment, Typography, Skeleton
---

# Data Display Components

## When to Use

**Tag:** - It can be used to tag by dimension or property.
- When categorizing.

**Statistic:** - When want to highlight some data.
- When want to display statistic data with description.

**Empty:** - When there is no data provided, display for friendly tips.
- User tutorial to create something in fresh new situation.

**QRCode:** Used when the link needs to be converted into a QR Code.

**Image:** - When you need to display pictures.
- Display when loading a large image or fault tolerant handling when loading fail.

**Carousel:** - When there is a group of content on the same level.
- When there is insufficient content space, it can be used to save space in the form of a revolving door.
- Commonly used for a group of pictures/cards.

**Timeline:** - When a series of information needs to be ordered by time (ascending or descending).
- When you need a timeline to make a visual connection.

**Comment:** Comments can be used to enable discussions on an entity such as a page, blog post, issue or other.

**Typography:** - When need to display a title or paragraph contents in Articles/Blogs/Notes.
- When you need copyable/editable/ellipsis texts.

**Skeleton:** - When a resource needs long time to load.
- When the component contains lots of information, such as List or Card.
- Only works when loading data for the first time.
- Could be replaced by Spin in any situation, but can provide a better user experience.

## Components

Avatar, Badge, Tag, Statistic, Empty, QRCode, Image, Carousel, Timeline, Comment, Typography, Skeleton

### Avatar

### Basic

Three sizes and two shapes are available.

```vue
<template>
  <a-space direction="vertical" :size="32">
    <a-space wrap :size="16">
      <a-avatar :size="64">
        <template #icon><UserOutlined /></template>
      </a-avatar>
      <a-avatar size="large">
        <template #icon><UserOutlined /></template>
      </a-avatar>
      <a-avatar>
        <template #icon><UserOutlined /></template>
      </a-avatar>
      <a-avatar size="small">
        <template #icon><UserOutlined /></template>
      </a-avatar>
    </a-space>
    <a-space wrap :size="16">
      <a-avatar shape="square" :size="64">
        <template #icon><UserOutlined /></template>
      </a-avatar>
      <a-avatar shape="square" size="large">
        <template #icon><UserOutlined /></template>
      </a-avatar>
      <a-avatar shape="square">
        <template #icon><UserOutlined /></template>
      </a-avatar>
      <a-avatar shape="square" size="small">
        <template #icon><UserOutlined /></template>
      </a-avatar>
    </a-space>
  </a-space>
</template>

<script lang="ts" setup>
import { UserOutlined } from '@ant-design/icons-vue';
</script>
```

### Tag

### Basic Usage

Usage of basic Tag, and it could be closable by set `closable` property. Closable Tag supports `close` events.

```vue
<template>
  <div>
    <a-tag>Tag 1</a-tag>
    <a-tag><a href="https://github.com/vueComponent/ant-design">Link</a></a-tag>
    <a-tag closable @close="log">Tag 2</a-tag>
    <a-tag closable @close.prevent>Prevent Default</a-tag>
  </div>
</template>
<script lang="ts" setup>
const log = (e: MouseEvent) => {
  console.log(e);
};
</script>
```

### Statistic

### Basic usage

Simplest Usage.

```vue
<template>
  <a-row>
    <a-col :span="12">
      <a-statistic title="Active Users" :value="112893" style="margin-right: 50px" />
    </a-col>
    <a-col :span="12">
      <a-statistic title="Account Balance (CNY)" :precision="2" :value="112893" />
    </a-col>
  </a-row>
</template>
```

### Empty

### Basic usage

Simplest Usage.

```vue
<template>
  <a-empty />
</template>
```

### QRCode

### Base

Basic Usage.

```vue
<template>
  <a-space direction="vertical" align="center">
    <a-qrcode :value="text" />
    <a-input v-model:value="text" placeholder="-" :maxlength="60" />
  </a-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const text = ref('https://www.antdv.com/');
</script>
```

### Image

### Basic usage

Click the image to zoom in.

```vue
<template>
  <a-image
    :width="200"
    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
  />
</template>
```

### Carousel

### Basic

Basic usage.

```vue
<template>
  <a-carousel :after-change="onChange">
    <div><h3>1</h3></div>
    <div><h3>2</h3></div>
    <div><h3>3</h3></div>
    <div><h3>4</h3></div>
  </a-carousel>
</template>

<script lang="ts" setup>
const onChange = (current: number) => {
  console.log(current);
};
</script>

<style scoped>
/* For demo */
:deep(.slick-slide) {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

:deep(.slick-slide h3) {
  color: #fff;
}
</style>
```
```

### Timeline

### Basic usage

Basic timeline.

```vue
<template>
  <a-timeline>
    <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
    <a-timeline-item>Solve initial network problems 2015-09-01</a-timeline-item>
    <a-timeline-item>Technical testing 2015-09-01</a-timeline-item>
    <a-timeline-item>Network problems being solved 2015-09-01</a-timeline-item>
  </a-timeline>
</template>
```

### Comment

### Basic comment

A basic comment with author, avatar, time and actions.

```vue
<template>
  <a-comment>
    <template #actions>
      <span key="comment-basic-like">
        <a-tooltip title="Like">
          <template v-if="action === 'liked'">
            <LikeFilled @click="like" />
          </template>
          <template v-else>
            <LikeOutlined @click="like" />
          </template>
        </a-tooltip>
        <span style="padding-left: 8px; cursor: auto">
          {{ likes }}
        </span>
      </span>
      <span key="comment-basic-dislike">
        <a-tooltip title="Dislike">
          <template v-if="action === 'disliked'">
            <DislikeFilled @click="dislike" />
          </template>
          <template v-else>
            <DislikeOutlined @click="dislike" />
          </template>
        </a-tooltip>
        <span style="padding-left: 8px; cursor: auto">
          {{ dislikes }}
        </span>
      </span>
      <span key="comment-basic-reply-to">Reply to</span>
    </template>
    <template #author><a>Han Solo</a></template>
    <template #avatar>
      <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
    </template>
    <template #content>
      <p>
        We supply a series of design principles, practical patterns and high quality design
        resources (Sketch and Axure), to help people create their product prototypes beautifully and
        efficiently.
      </p>
    </template>
    <template #datetime>
      <a-tooltip :title="dayjs().format('YYYY-MM-DD HH:mm:ss')">
        <span>{{ dayjs().fromNow() }}</span>
      </a-tooltip>
    </template>
  </a-comment>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs';
import { LikeFilled, LikeOutlined, DislikeFilled, DislikeOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const likes = ref<number>(0);
const dislikes = ref<number>(0);
const action = ref<string>();

const like = () => {
  likes.value = 1;
  dislikes.value = 0;
  action.value = 'liked';
};

const dislike = () => {
  likes.value = 0;
  dislikes.value = 1;
  action.value = 'disliked';
};
</script>
```

### Typography

### Basic

Display the document sample.

```vue
<template>
  <a-typography>
    <a-typography-title>Introduction</a-typography-title>
    <a-typography-paragraph>
      In the process of internal desktop applications development, many different design specs and
      implementations would be involved, which might cause designers and developers difficulties and
      duplication and reduce the efficiency of development.
    </a-typography-paragraph>
    <a-typography-paragraph>
      After massive project practice and summaries, Ant Design, a design language for background
      applications, is refined by Ant UED Team, which aims to
      <a-typography-text strong>
        uniform the user interface specs for internal background projects, lower the unnecessary
        cost of design differences and implementation and liberate the resources of design and
        front-end development.
      </a-typography-text>
    </a-typography-paragraph>
    <a-typography-title :level="2">Guidelines and Resources</a-typography-title>
    <a-typography-paragraph>
      We supply a series of design principles, practical patterns and high quality design resources
      (
      <a-typography-text code>Sketch</a-typography-text>
      and
      <a-typography-text code>Axure</a-typography-text>
      ), to help people create their product prototypes beautifully and efficiently.
    </a-typography-paragraph>

    <a-typography-paragraph>
      <ul>
        <li>
          <a-typography-link href="/docs/resources">Resource Download</a-typography-link>
        </li>
      </ul>
    </a-typography-paragraph>

    <a-typography-paragraph>
      Press
      <a-typography-text keyboard>Esc</a-typography-text>
      to exit...
    </a-typography-paragraph>

    <a-divider />

    <a-typography-title>介绍</a-typography-title>
    <a-typography-paragraph>
      蚂蚁的企业级产品是一个庞大且复杂的体系。这类产品不仅量级巨大且功能复杂，而且变动和并发频繁，常常需要设计与开发能够快速的做出响应。同时这类产品中有存在很多类似的页面以及组件，可以通过抽象得到一些稳定且高复用性的内容。
    </a-typography-paragraph>
    <a-typography-paragraph>
      随着商业化的趋势，越来越多的企业级产品对更好的用户体验有了进一步的要求。带着这样的一个终极目标，我们（蚂蚁金服体验技术部）经过大量的项目实践和总结，逐步打磨出一个服务于企业级产品的设计体系
      Ant Design。基于
      <a-typography-text mark>『确定』和『自然』</a-typography-text>
      的设计价值观，通过模块化的解决方案，降低冗余的生产成本，让设计者专注于
      <a-typography-text strong>更好的用户体验</a-typography-text>
      。
    </a-typography-paragraph>
    <a-typography-title :level="2">设计资源</a-typography-title>
    <a-typography-paragraph>
      我们提供完善的设计原则、最佳实践和设计资源文件（
      <a-typography-text code>Sketch</a-typography-text>
      和
      <a-typography-text code>Axure</a-typography-text>
      ），来帮助业务快速设计出高质量的产品原型。
    </a-typography-paragraph>

    <a-typography-paragraph>
      <ul>
        <li>
          <a-typography-link href="/docs/resources-cn">设计资源</a-typography-link>
        </li>
      </ul>
    </a-typography-paragraph>

    <a-typography-paragraph>
      <blockquote>{{ blockContent }}</blockquote>
      <pre>{{ blockContent }}</pre>
    </a-typography-paragraph>

    <a-typography-paragraph>
      按
      <a-typography-text keyboard>Esc</a-typography-text>
      键退出阅读……
    </a-typography-paragraph>
  </a-typography>
</template>
<script lang="ts" setup>
const blockContent = `AntV 是蚂蚁金服全新一代数据可视化解决方案，致力于提供一套简单方便、专业可靠、不限可能的数据可视化最佳实践。得益于丰富的业务场景和用户需求挑战，AntV 经历多年积累与不断打磨，已支撑整个阿里集团内外 20000+ 业务系统，通过了日均千万级 UV 产品的严苛考验。
我们正在基础图表，图分析，图编辑，地理空间可视化，智能可视化等各个可视化的领域耕耘，欢迎同路人一起前行。`;
</script>
```

### Skeleton

### Basic usage

Simplest Skeleton usage.

```vue
<template>
  <a-skeleton />
</template>
```

## API Reference

- [Avatar](api/avatar.md)
- [Tag](api/tag.md)
- [Statistic](api/statistic.md)
- [Empty](api/empty.md)
- [QRCode](api/qrcode.md)
- [Image](api/image.md)
- [Carousel](api/carousel.md)
- [Timeline](api/timeline.md)
- [Comment](api/comment.md)
- [Typography](api/typography.md)
- [Skeleton](api/skeleton.md)
