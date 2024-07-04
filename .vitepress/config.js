import { defineConfig } from "vitepress";



export default defineConfig({
  base: "/v3-uni-doc/",
  title: "v3-uni-dove",
  titleTemplate: " v3-uni-dove",
  head: [["link", { rel: "icon", href: "/v3-uni-doc/svg/logo.svg" }]],
  description: "v3-uni-dove 文档",
  lang: "zh-CH",
  themeConfig: {
    search: {
      provider: "local",
    },
    logo: "/svg/logo.svg",
    nav: [
        { text: "v3-admin-el", link: "https://huxc.github.io/v3Press/" },
        { text: "vue", link: "https://cn.vuejs.org/" },
        { text: "uni-app", link: "https://uniapp.dcloud.net.cn/quickstart-cli.html" },
        { text: "v1.0.0",link: "" },
    ],
    sidebar: [
      {
        text: "指南",
        items: [
          { text: "简介", link: "/markdown/intro.md" },
          { text: "快速上手", link: "/markdown/start.md" },
          { text: "样式", link: "/markdown/style.md" },
          { text: "图标", link: "/markdown/icon.md" },
          { text: "路由", link: "/markdown/router.md" },
          { text: "组件库", link: "/markdown/component.md" },
          { text: "环境变量", link: "/markdown/envs.md" },
          { text: "状态管理", link: "/markdown/store.md" },
          { text: "网络封装", link: "/markdown/request.md" },
          { text: "API调用", link: "/markdown/api.md" },
          { text: "平台编译", link: "/markdown/plug.md" },
          { text: "实战指南", link: "/markdown/practice.md" },
        ]
      },
      {
        text: "扩展",
        items:[
            { text: "图表", link: "https://limeui.qcoon.cn/#/" },
            // { text: 'TypeScript', link:'/markdown/ts.md'},
        ]
      },
      {
        text: "其他",
        items:[
          { text: "v3-admin-el", link: "https://huxc.github.io/v3Press/" },
        ]
      }
    ],

    socialLinks: [
        { icon: "github", link: "https://github.com/huxc/uni-dove" },
    ],
    outline: {
      level: [2, 6],
      label: "目录",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    footer: {
      copyright: "Copyright © 2024 胡校川",
    },
  },
});
