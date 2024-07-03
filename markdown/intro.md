# 简介

`v3-uni-dove`是一个为`uni-app`打造的项目模版框架。

## 特点

- `vite5`、`vue3` 使用 `vscode` 开发
- 路由封装，用 `vue-router` 的使用方式开发，实现路由守卫等功能点
- 请求封装，实现去重、全局请求加载、全局错误提示、无感刷新登录态，微服务多域名等功能
- 接口函数无需 `import`，可全局按需加载直接使用
- 使用 `Pinia` 简化跨平台应用的状态管理，提供更易于维护和模块化的状态管理方案，支持添加过期时间。
- 封装环境变量，使 `import.meta.env.xx` 的值不再只是字符串，而且真实的值如：`false`,`{a:1,b:2}`,`100` 等
- 预设 `UnoCss` 原子化 `CSS` 引擎,解决其在 `windows` 系统容易卡死的问题
- 预设`Z-paging`: 内置了高性能且易于使用的业务常用下拉分页组件模块，轻松实现下拉刷新、上拉加载等功能。
- 预设`Wot Design Uni` 基于` Vue3` 开发，提供 `70+`高质量组件，支持暗黑模式、国际化和自定义主题。
- 预设`uni-manifest`使用 `TypeScript` 编写 `uni-app` 的` manifest.json`。方便使用全局变量配置
- 预设`uni-pages`在 Vite 驱动的 `uni-app` 上使用基于文件的路由系统。无需手动在 `pages.json `中填写路由页面了
- 预设 `Anthony's ESLint` 配置，自动根据 `ESLint` 配置进行格式化
- 环境编译：可使属性、指令提供平台修饰符并按需编译； 基于文件名 `_.<h5|mp-weixin|app>._` 的按平台编译

## 目录结构

```sh
+---.vscode
|       settings.json
+---env
|       .env
|       .env.development
|       .env.local
|       .env.production
|       .env.test
+---src
|   |   App.vue
|   |   main.ts
|   |   manifest.json
|   |   pages.json
|   |   uni.scss
|   +---api
|   |       user.ts
|   +---components
|   |       .gitkeep
|   +---config
|   |       global.ts
|   +---hooks
|   |       .gitkeep
|   +---pages
|   |   +---about
|   |   |       index.vue
|   |   \---home
|   |       |   index.vue
|   |       \---components
|   |           +---home
|   |           |       index.vue
|   |           +---list
|   |           |       index.vue
|   |           \---user
|   |                   index.vue
|   +---pages-sub
|   |   \---detail
|   |           index.vue
|   +---router
|   |       index.ts
|   +---static
|   |       logo.png
|   +---store
|   |   |   index.ts
|   |   |   register.ts
|   |   \---modules
|   |           userStore.ts
|   +---typings
|   |       auto-import.d.ts
|   |       env.d.ts
|   |       globals.d.ts
|   |       shims-uni.d.ts
|   |       uni-pages.d.ts
|   \---utils
|       |   index.ts
|       |   regex.ts
|       |   storage.ts
|       \---uni-network
|               index.ts
|               refresh.ts
|               un-reuse.ts
\---viteConfig
        custom-auto-import.ts
        getApiFn.ts
        plugins.ts
|   .eslintrc-auto-import.json
|   .gitignore
|   .npmrc
|   directory_tree.txt
|   eslint.config.mjs
|   index.html
|   manifest.config.ts
|   package.json
|   pages.config.ts
|   pnpm-lock.yaml
|   tsconfig.json
|   uno.config.ts
|   vite.config.ts
```
