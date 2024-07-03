# 样式

项目预设了`UnoCss`。原子化 `CSS` 引擎，通过只生成在实际页面上使用的样式，大幅减少了样式表的体积，提升了加载速度和页面响应性。

## 使用 UnoCss

在页面或组件中，可以直接使用 Unocss 预设提供的类名来定义样式。如果你还不熟悉[UnoCss 原子类](https://unocss.dev/)，查阅[windcss](https://tailwindcss.com/)。也可在工具网站转换[CssToUnocss](https://to-unocss.netlify.app/)<br/>
在组件中使用：

```vue
<template>
  <div class="bg-blue-500 text-white p-4">这是一个带有白色文本的蓝框</div>
  <!-- 或者 -->
  <div bg-blue-500 text-white p-4>这是一个带有白色文本的蓝框</div>
</template>

<style scoped></style>
```

在上面的例子中，`.bg-blue-500, .text-white, p-4` 等类名会在构建时被 `UnoCss` 自动提取和优化。<br/>
安装`VSCode`插件`unocss`后，鼠标移动到原子类上可显示预览如：

![unocss](/imgs/unocss02.png)

安装`VSCode`插件`To Unocss`后，可以将`css`的样式转换为`UnoCss`的原子类，如图：

![unocss](/imgs/unocss03.png)
点击类名前面的复制按钮可直接复制在页面中使用

## 配置 UnoCss

在 `unocss.config.{t,j}s`配置文件中， 可以通过配置 `shortcuts` 来定义和管理组合样式，如下代码：

```js
/**
* 自定义
* @see https://github.com/unocss/unocss#shortcuts
*/
export default defineConfig({
  ...
  shortcuts: {
    'h-safe-bottom': 'h-[constant(safe-area-inset-bottom)] h-[env(safe-area-inset-bottom)]',
    'h-safe-top': 'h-[var(--status-bar-height)]',
  },
  ...
})

```

## 尺寸单位

在一定的设计理念下，无论是`unocss`默认预设，还是`tailwindcss`和`windicss`框架，默认的单位都是 `rem`

![unocss](/imgs/unocss04.png)

如果要改变单位就要在属性后面添加单位，如：使用 `w-[10rpx]` 可以表示 `width: 10rpx`；但这种方式不够简洁且不能使用属性的方式编写

### 如何实现 1 单位=1rpx

`rem` 是相对于 `html` 的 `font-size` 计算的， `html` 默认 `font-size` 是 `16px`, 也就是说 `1rem = 16px`
但是, 在原子 css 的默认预设中，`1 单位 = 0.25rem`，如下图

![unocss](/imgs/unocss04.png)

反之就是`1rem = 4px`, 所以将 `font-size` 修改成 `4px`，然后就不用再去计算了， `w-1` 就是 `width: 1px`, `w-100` 就是 `width: 100px`<br/>
在 uniapp 中的 rpx 换算公式如下：<br/>
`设计稿 1px / 设计稿基准宽度 = 框架样式 1rpx / 750rpx` <br/>

换言之，页面元素宽度在 uni-app 中的宽度计算公式：<br/>
`750 * 元素在设计稿中的宽度 / 设计稿基准宽度`<br/>

**举例说明**

- 若设计稿宽度为 `750px`，元素 `A` 在设计稿上的宽度为 `100px`，那么元素 `A` 在 `uni-app` 里面的宽度应该设为：`750 \* 100 / 750`，结果为：`100rpx`。
- 若设计稿宽度为 `640px`，元素 `A` 在设计稿上的宽度为 `100px`，那么元素 `A` 在 `uni-app` 里面的宽度应该设为：`750 \* 100 / 640`，结果为：`117rpx`。
- 若设计稿宽度为 `375px`，元素 `B` 在设计稿上的宽度为 `200px`，那么元素 `B` 在 `uni-app` 里面的宽度应该设为：`750 \* 200 / 375`，结果为：`400rpx`。<br/>

---

所以在设计稿宽度为 750 的时候:
`1单位 = 1px = 1rpx`<br/>

在`unocss.config.{t,j}s`中使用`unocss-preset-uni`预设，配置如下：

```js
import { presetUni } from "@uni-helper/unocss-preset-uni";

export default defineConfig({
  presets: [
    presetUni({
      //   remRpx: false // 此项为关闭配置
      remRpx: {
        baseFontSize: 4,
        screenWidth: 750,
      },
    }),
  ],
});
```

此时就是 `1单位 = 1px = 1rpx`；如图：

![unocss](/imgs/unocss04.png)

::: danger 注意

- 此预设要求设计师必须使用 iPhone6 作为视觉稿的标准。如果设计稿不是 750px。需要自行修改配置文件。
- rpx 是和宽度相关的单位，屏幕越宽，该值实际像素越大。如不想根据屏幕宽度缩放，则应该使用 px 单位。关闭配置文件中 remRpx 配置
  :::
