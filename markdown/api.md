# API 请求

上一节我们介绍了封装的 `http` 请求库，这节主要介绍编写/生成 `api` 的约定，以及调用方式

## 编写/生成 api

`api` 接口函数的定义约定在 `src/api` 文件夹下面定义，这样我们使用的时候就无需 `import` 直接可用，如：`user.ts/js`

```sh
+---src
|   +---api
|   |       user.ts
```

定义函数

```js
// src/api/user.ts
import http from "@/utils/uni-network/index";

/**
 * api_user_getCustomers
 * 获取客户信息列表
 */
export function getCustomers(data: any, prop = {}) {
  return http.request({
    data,
    ...prop,
    method: "GET",
    domain: "basics",
    url: "/customer",
  });
}
```

## 使用 api

在调用 `api` 函数的时候，我们不需要 `import`，可根据`api_文件名_函数名`直接使用, 代码如下

```vue
<template>
  <view>客户</view>
</template>

<script setup>
onMounted(() => {
  // 获取客户信息
  api_user_getCustomers().then((res) => {
    // 业务处理
  });
});
</script>

<style scoped lang="scss"></style>
```
