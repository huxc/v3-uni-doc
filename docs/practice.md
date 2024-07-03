# 实战指南

`小程序`和 `App` 的 `vue` 页面，主体是 `webview` 渲染的。为了提升性能，小程序和 `App` 的 `vue` 页面下部分 `ui` 元素，比如`导航栏`、`tabbar`、`video`、`map` 使用了原生控件。这种方式被称为混合渲染。<br>

开发中应注意原生组件带来的问题：

- 前端组件无法覆盖原生控件的层级问题
- 原生组件不能嵌入特殊前端组件(如 `scroll-view`)
- 原生控件` ui` 无法灵活自定义
- 原生控件在 `Android` 上，字体会渲染为 `rom` 的主题字体，而 `webview` 如果不经过单独改造不会使用 `rom` 主题字体

## 自定义导航栏

在 `pages.json` 中提供 `tabBar` 配置，在 `App` 和小程序端提升性能。在这两个平台，底层原生引擎在启动时无需等待 `js` 引擎初始化，即可直接读取 `pages.json` 中配置的 `tabBar` 信息，渲染原生 `tab`。但无法自定义 `tabBar` 样式，因此如果自带 `tabBar` 无法满足需求的时候，需要自定义导航栏<br/>
自定义导航栏跳转各个导航栏页面的时候的，因为页面的渲染会有闪动的效果，建议将导航栏中的所有页面写成组件，在页面中做组件切换，来达到原生组件的视觉效果<br/>
示例如下：

```text
+---src
|   +---pages
|   |   \---home
|   |       |   index.vue
|   |       \---components
|   |           +---home
|   |           |       index.vue
|   |           +---list
|   |           |       index.vue
|   |           \---user
|   |                   index.vue
```

在`src/pages/home/index.vue`中用 v-if 来切换组件页面

```vue
<template>
  <view v-if="isInit" w-100vw h-100vh>
    <wd-navbar title="标题" :fixed="true" placeholder safe-area-inset-top />
    <Home v-if="tabbar === 'home'" />
    <List v-if="tabbar === 'list'" />
    <User v-if="tabbar === 'user'" />
    <wd-tabbar
      v-model="tabbar"
      custom-class="cus-tabbar"
      :fixed="true"
      placeholder
      safe-area-inset-bottom
    >
      <wd-tabbar-item name="home" title="首页" icon="home" />
      <wd-tabbar-item name="list" title="列表" icon="chart" />
      <wd-tabbar-item name="user" title="我的" icon="user" />
    </wd-tabbar>
  </view>
</template>

<script lang="ts" setup>
import Home from "./components/home/index.vue";
import List from "./components/list/index.vue";
import User from "./components/user/index.vue";

const tabbar = ref<string>("home");
</script>
```

## 加快页面渲染

页面每次跳转的后，到新的页面都会请求接口再进行渲染，如何提高页面加载和渲染速度？<br/>因为所有的 `IO` 操作是最费时，所以建议对页面初始化的数据进行缓存。<br/>当进入页面的时候先读取缓存数据，然后再在进行接口请求，对请求数据做更新，`vue` 在先渲染缓存数据后会为每个节点生成 `key`，在进行列表渲染时，会尽可能高效地复用已存在的 `DOM` 元素，而不是重新创建或销毁。`Vue `使用`key`来识别列表中每个节点的唯一性，从而确定是否需要复用现有的 `DOM `元素。所以当再次渲染接口请求数据时速度很很快。<br/>这样给用户的视觉效果更加友好<br/>
示例如下：

```vue
<template>
  <view>
    <view>姓名：{{ userInfo.name }}</view>
    <view>年龄：{{ userInfo.age }}</view>
    <view>注册时间：{{ userInfo.created_at }}</view>
  </view>
</template>

<script lang="ts" setup>
import { getStorage, setStorage } from "@/utils/cache";

const userInfo = reactive({});

onMounted(() => {
  // 读取缓存
  const userCache = getStorage("about");
  if (userCache) {
    // 存在即赋值
    Object.assign(userInfo, userCache);
  }
  // 接口请求
  api_user_getCustomerById(2, { isLoading: false }).then((res) => {
    Object.assign(userInfo, res.data);
    // 设置缓存
    setStorage("about", res.data);
  });
});
</script>
```
