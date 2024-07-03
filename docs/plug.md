# 按平台编译

## 样式

开箱即用的平台支持，允许你按平台编写相应样式。

```js
<!-- 只在 H5 编译出 mx-auto 类 -->
<div class='uni-h5:mx-auto'></div>

<!-- 只在 APP 编译出 mx-auto 类 -->
<div class='uni-app:mx-auto'></div>

<!-- 只在小程序编译出 mx-auto 类 -->
<div class='uni-mp:mx-auto'></div>

<!-- 只在微信小程序编译出 mx-auto 类，类名也可以写成 uni-mp-weixin:mx-auto -->
<div class='uni-weixin:mx-auto'></div>

<!-- 只在支付宝小程序编译出 mx-auto 类，类名也可以写成 uni-alipay:mx-auto -->
<div class='uni-mp-alipay:mx-auto'></div>
...

```

你也可以通过自定义 theme.platforms 来自定义平台匹配规则:

```ts
// uno.config.ts
import { defineConfig } from "unocss";
import { presetUni } from "@uni-helper/unocss-preset-uni";

export default defineConfig({
  presets: [presetUni()],
  theme: {
    platforms: {
      wechat: "mp-weixin", // 支持 uni-wechat，等同于 uni-mp-weixin
      "my-app": "my-app", // 自定义平台，支持 uni-my-app
    },
  },
});
```

```html
<!-- 注意：你不能省略 uni- 的类名前缀 -->
<div class="uni-wechat:mx-auto"></div>
<div class="uni-my-app:mx-auto"></div>
```

内置的平台匹配规则

```text
platforms = {
  '360': 'mp-360',
  'mp': 'mp',
  'app': 'app',
  'quickapp': 'quickapp',
  'app-plus': 'app-plus',
  'h5': 'h5',
  'mp-360': 'mp-360',
  'mp-alipay': 'mp-alipay',
  'alipay': 'mp-alipay',
  'mp-baidu': 'mp-baidu',
  'baidu': 'mp-baidu',
  'mp-jd': 'mp-jd',
  'jd': 'mp-jd',
  'mp-kuaishou': 'mp-kuaishou',
  'kuaishou': 'mp-kuaishou',
  'mp-lark': 'mp-lark',
  'lark': 'mp-lark',
  'mp-qq': 'mp-qq',
  'qq': 'mp-qq',
  'mp-toutiao': 'mp-toutiao',
  'toutiao': 'mp-toutiao',
  'mp-weixin': 'mp-weixin',
  'weixin': 'mp-weixin',
  'quickapp-webview': 'quickapp-webview',
  'quickapp-webview-huawei': 'quickapp-webview-huawei',
  'quickapp-webview-union': 'quickapp-webview-union'
}
```

## 属性

为属性、指令提供平台修饰符并按需编译<br/>

编写代码

```js
<button
  v-text="'hello'"
  v-text.h5.mp-weixin="'h5&mp-weixin'"
  class.h5="h5-class"
  class="default-class"
  @click.h5="handleH5Click"
  @click="handleDefaultClick"
/>
```

编译到 H5

```js
<button
  v-text="'h5&mp-weixin'"
  class="h5-class"
  @click="handleH5Click"
/>
```

编译到微信小程序

```js
<button
  v-text="'h5&mp-weixin'"
  class="default-class"
  @click="handleDefaultClick"
/>
```

编译到其他平台

```js
<button
  v-text="'hello'"
  class="default-class"
  @click="handleDefaultClick"
/>
```

支持的修饰符

```js
[
  "app",
  "app-plus",
  "h5",
  "mp-360",
  "mp-alipay",
  "mp-baidu",
  "mp-jd",
  "mp-kuaishou",
  "mp-lark",
  "mp-qq",
  "mp-toutiao",
  "mp-weixin",
  "quickapp-webview",
  "quickapp-webview-huawei",
  "quickapp-webview-union",
];
```

## 文件名

基于文件名 `.<h5|mp-weixin|app>. `的按平台编译插件，所有的带有平台标识符的文件都会被自动替换
![arr](/imgs/pt.png)
