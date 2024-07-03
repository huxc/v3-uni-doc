# 图标

## wot-ui

在 `wot-ui` 有 `Icon` 图标组件可以直接使用：

```html
<wd-icon name="add-circle" />
<wd-icon name="add-circle" size="20px" />
<wd-icon name="add-circle" color="#0083ff" />
```

## 自定义图标

如果需要在现有 [Icon](https://wot-design-uni.netlify.app/component/icon.html) 的基础上使用更多图标，可以引入第三方 [iconfont](https://www.iconfont.cn/) 对应的字体文件和`CSS`文件，之后就可以在`Icon`组件中直接使用。

```scss
/* 引入第三方或自定义的字体图标样式 */
@font-face {
  font-family: "my-icon";
  src: url("./my-icon.ttf") format("truetype");
}

.my-icon {
  font-family: "my-icon";
}

.my-icon-extra::before {
  content: "\e626";
}
```

```html
<!-- 通过 class-prefix 指定类名为 my-icon -->
<wd-icon class-prefix="my-icon" name="extra" />
```

## unocss icons

::: info 提示
我们可以单独使用此预设作为现有 UI 框架的补充，以获得纯 CSS 图标！
:::

因为我们的项目中预设使用了 `unocss`，所以我们可以使用 `unocss` 提供的图标预设。在 `unocss` 包中可以直接导入使用：

```js
import { presetIcons } from 'unocss'
import { presetUni } from '@uni-helper/unocss-preset-uni'

export default defineConfig({
  presets: [
    ...
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
...
})
```

### 安装

此预设是使用[Iconify](https://iconify.design/)作为图标数据源。它将 `100 多个图标集`与上万个图标统一为 一致的 `JSON` 格式。我们可以通过简单地提供集合和图标 `ID` 的方式来获取任意图标集中的 `SVG`， 只需要 `devDependencies` 按照以下@iconify-json/\*模式安装相应的图标集。例如，`@iconify-json/mdi` 对应 `Material Design Icons`，`@iconify-json/tabler` 对应 `Tabler`。

::: code-group

```bash [pnpm]
pnpm add -D  @iconify-json/[the-collection-you-want]
```

```bash [yarn]
yarn add -D  @iconify-json/[the-collection-you-want]
```

```bash [npm]
npm install -D  @iconify-json/[the-collection-you-want]
```

:::

### 额外属性

我们还可以提供额外的` CSS` 属性来控制图标的默认行为。以下是默认将图标设为内联的示例：

```js
presetIcons({
  extraProperties: {
    display: "inline-block",
    "vertical-align": "middle",
    // ...
  },
});
```

### 使用

此项目中已经安装了所有可用的图标集`~130MB`，方便大家直接到官网复制所需要的图标名称，无需再安装图标了。如下图：<br/>

**查询到你所需要的图标**：

![unocss](/imgs/unocss06.png)

**点击复制**

![unocss](/imgs/unocss07.png)

遵循以下约定来使用图标

- `<prefix><collection>-<icon>`
- `<prefix><collection>:<icon>`

```html
<view class="i-ph-anchor-simple-thin" />
<!-- 改变图标颜色 -->
<view class="i-mdi-alarm text-orange-400" />
<!-- 改变大小 -->
<view class="i-logos-vue text-3xl" />
<!-- 黑暗主题模式 -->
<button class="i-carbon-sun dark:i-carbon-moon" />
<!-- 根据hover改变图标 -->
<view
  class="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy"
/>
```
