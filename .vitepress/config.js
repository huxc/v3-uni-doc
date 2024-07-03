import { defineConfig } from "vitepress";



export default defineConfig({
  base: "/v3-uni-doc/",
  title: "v3-uni-template",
  titleTemplate: " v3-uni-template",
  head: [["link", { rel: "icon", href: "/uni/imgs/logo.png" }]],
  description: "v3-uni-template 文档",
  lang: "zh-CH",
  themeConfig: {
    search: {
      provider: "local",
    },
    logo: "/imgs/logo.png",
    nav: [
        { text: "v3-admin-el", link: "http://180.100.200.14/v3Press/" },
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
          { text: "v3-admin-el", link: "https://www.baidu.com" },
        ]
      }
    ],

    socialLinks: [
      //   { icon: "github", link: "https://github.com/huxc/v3-uni-template" },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="1.09em" height="1em" viewBox="0 0 256 236"><path fill="#e24329" d="m128.075 236.075l47.104-144.97H80.97z" /><path fill="#fc6d26" d="M128.075 236.074L80.97 91.104H14.956z" /><path fill="#fca326" d="M14.956 91.104L.642 135.16a9.752 9.752 0 0 0 3.542 10.903l123.891 90.012z" /><path fill="#e24329" d="M14.956 91.105H80.97L52.601 3.79c-1.46-4.493-7.816-4.492-9.275 0z" /><path fill="#fc6d26" d="m128.075 236.074l47.104-144.97h66.015z" /><path fill="#fca326" d="m241.194 91.104l14.314 44.056a9.752 9.752 0 0 1-3.543 10.903l-123.89 90.012z" /><path fill="#e24329" d="M241.194 91.105h-66.015l28.37-87.315c1.46-4.493 7.816-4.492 9.275 0z" /></svg>',
        },
        link: "http://192.168.1.223/huxiaochuan/v3-uni-template",
      },
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
