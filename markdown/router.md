# 路由

## 文件路由插件

`vite-plugin-uni-pages` 是一个用于 `UniApp` 项目的 `Vite` 插件，帮助开发者自动生成页面路由，简化多页面应用程序的开发过程，旨在为 `UniApp` 开发提供类似的便捷路由管理功能

### 主要功能

- 根据项目中的文件结构自动生成页面路由，不再需要手动配置每个页面的路由
- 为 `<route> `块 提供 IntelliSense
- 为 uni-app 的 pages.json 提供 schema

### 使用

在` pages.config.(ts|mts|cts|js|cjs|mjs|json)` 定义全局属性，你可以在文件中使用 `#ifdef H5` 类似语法。

```js
// pages.config.ts
import { defineUniPages } from "@uni-helper/vite-plugin-uni-pages";

export default defineUniPages({
  // 你也可以定义 pages 字段，它具有最高的优先级。
  pages: [],
  globalStyle: {
    navigationBarTextStyle: "black",
    navigationBarTitleText: "@uni-helper",
  },
});
```

现在所有的 `page` 都会被自动发现！

### 配置选项

如下参数可配置修改，在 `pages.config.(ts|mts|cts|js|cjs|mjs|json)`文件中

```ts
export interface Options {
  /**
   * 为页面路径生成 TypeScript 声明
   *
   * 接受布尔值或与相对项目根目录的路径
   *
   * 默认为 uni-pages.d.ts
   *
   * @default true
   */
  dts?: boolean | string

  /**
   * 配置文件
   * @default 'pages.config.(ts|mts|cts|js|cjs|mjs|json)',
   */
  configSource: ConfigSource

  /**
   * 设置默认路由入口
   * @default 'pages/index' || 'pages/index/index'
   */
  homePage: string

  /**
   * 是否扫描并合并 pages.json 中 pages 字段
   * @default true
   */
  mergePages: boolean

  /**
   * 扫描的目录
   * @default 'src/pages'
   */
  dir: string

  /**
   * subPackages 扫描的目录，例如：src/pages-sub
   */
  subPackages: string[]

  /**
   * 输出 pages.json 目录
   * @default "src"
   */
  outDir: string

  /**
   * 排除的页面，相对于 dir 和 subPackages
   * @default []
   * @example ['**/components/**/*.*']
   */
  exclude: string[]

  /**
   * 自定义块语言
   * @default 'json5'
   */
  routeBlockLang: 'json5' | 'json' | 'yaml' | 'yml'

  onBeforeLoadUserConfig: (ctx: PageContext) => void
  onAfterLoadUserConfig: (ctx: PageContext) => void
  onBeforeScanPages: (ctx: PageContext) => void
  onAfterScanPages: (ctx: PageContext) => void
  onBeforeMergePageMetaData: (ctx: PageContext) => void
  onAfterMergePageMetaData: (ctx: PageContext) => void
  onBeforeWriteFile: (ctx: PageContext) => void
  onAfterWriteFile: (ctx: PageContext) => void
}
```

### 示例项目结构

假设项目结构如下：

```
src/
  ├─ pages/
  │   ├─ index.vue
  │   ├─ about.vue
  │   └─ user/
  │       └─ profile.vue
```

该插件会自动生成如下路由：

```js
[
  {
    path: "/pages/index",
    name: "Index",
    component: () => import("@/pages/index.vue"),
  },
  {
    path: "/pages/about",
    name: "About",
    component: () => import("@/pages/about.vue"),
  },
  {
    path: "/pages/user/profile",
    name: "UserProfile",
    component: () => import("@/pages/user/profile.vue"),
  },
];
```

### 自定义块用于路由数据

通过添加一个 `<route>` 块到 `SFC `中来添加路由元数据。这将会在路由生成后直接添加到路由中，并且会覆盖。你可以使用` <route lang="yaml">` 来指定一个解析器，或者使用 `routeBlockLang` 选项来设置一个默认的解析器。

- **解析器支持**： JSON, JSON5, YAML
- **默认**： JSON5

```vue
<!-- index.vue -->
<!-- 使用 type="home" 属性设置首页 -->
<route type="home" lang="json">
{
  "style": { "navigationBarTitleText": "页面名称" }
}
</route>

<!-- other.vue -->
<route lang="yaml">
style:
  navigationBarTitleText: "页面名称"
</route>
```

## 页面路由

> 使用 `` uniapp`-router-next` 一个类似于 `vue-router `的路由器，用于  ``uniapp`（vue3）`，支持 `h5` 和`微信小程序`和 `app`，其他小程序请自测

### 全局组册组件

```html
<template>
  <router-navigate to="/pages/index/index">go</router-navigate>
</template>
```

### 组件 props

```js
// 跳转类型
navType = "navigate" | "redirect" | "reLaunch" | "switchTab" | "navigateBack";

// navType = navigateBack时，可传回退页面层数
delta; //默认值为1
```

### api 跳转

```typescript
// useRouter 无需import
const router = useRouter()


router.navigateTo({
  path: '/pages/index/index',
  //参数
  query: {
    name: 'name'
  }
})
router.navigateTo...
router.reLaunch...
router.redirectTo...
router.switchTab..
router.navigateBack...
```

### 路由信息

```typescript
// useRoute 无需import
const route = useRoute();
console.log(route);
//   fullPath: '/pages/index/index'
//   meta: {}
//   query: {}  上一个页面的参数
//   path: '/pages/index/home'
//   name: ''
```

### 路由守卫

用法与[vue-router](https://router.vuejs.org/zh/guide/)类似  
目前只有 `beforeEach` 和 ` afterEach``，beforeEach ` `支持拦截，在页面跳转前出发，afterEach` 在页面的 `onShow` 生命周期触发  
`beforeEach` 在返回 `false`,抛出错误,返回 `Promise.reject`,调用 `next(false)`时会停止，返回其它或者调用 `next()`则执行下一个守卫，`next({path: 'xxx'})`后终止当前并执行跳转

```typescript
router.beforeEach(async (to, form, next) => {
  console.log(to, form, "beforeEach");
});

router.afterEach((to, form) => {
  console.log(to, form, "afterEach");
});
```
