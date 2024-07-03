# 状态管理 Pinia (函数式)

## 介绍

> `uni-app` 内置了 `Pinia` 。`Vue 2` 项目暂不支持

::: info

- 使用 `HBuilder X`

  `HBuilder X` 已内置了 `Pinia`，无需手动安装，按照下方示例使用即可。

  `App` 升级时，如果之前使用 `HBuilder X` 版本 `< 4.14` 打包，现在使用 `HBuilder X` 版本` >= 4.14`，更新时需要整包更新不可使用 `wgt` 更新（在 `4.14 `时升级了 `vue` 版本，低版本的基座和高版本 `wgt` 资源包会导致使用 `Pinia` 时报错）

- 使用 `CLI`

  `4.14` 之前：执行 `pnpm add pinia@2.0.36` 或 `npm install pinia@2.0.36` 安装，要固定版本

` 4.14` 之后：执行 `pnpm add pinia` 或 `npm install pinia` 安装，可不指定版本
:::

## 配置

### 全局配置

我们项目使用的事 `vue3 + vite` 的 `cli` 版本，使用 `pnpm` 安装的包需要配置 `pinia`, 代码如下：

```js
// src/store/register.ts
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

const store = createPinia();
store.use(
  createPersistedState({
    storage: {
      getItem: uni.getStorageSync, // 配置getStorageSync
      setItem: uni.setStorageSync, // 配置setStorageSync
    },
  })
);
export default store;
```

## 全局注册机

### 常规用法

我们知道，在使用 `store` 时要先把 `store` 的定义 `import` 进来，再执行定义函数使得实例化。但是，在项目逐渐庞大起来后，每个组件要使用时候都要实例化，又或者当你在指令中调用的时候，可能会报错说使用的某个 `store` 没有实例化，如我们定义一个 `userStore`:

```ts
// src\store\modules\userStore.ts
import { defineStore } from "pinia";
import storeWithExpiry from "@/utils/storage";

function storeSetup() {
  const state = reactive<any>({
    access_token: "",
  });

  /**
   * 刷新用户信息
   */
  const refToken = (data: object) => {
    Object.assign(state, data);
  };

  /**
   * 登录
   */
  const logIn = (loginForm: LoginForm): Promise<any> => {
    return new Promise((resolve, reject) => {
      api_user_login(loginForm)
        .then(({ data }: any) => {
          refToken(data);
          resolve(data);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  };

  return {
    logIn,
    state,
    refToken,
  };
}

export const useUserStore = defineStore("userStore", storeSetup, {
  persist: true,
});
```

在使用的时候我们需要这样：

```vue
<template>
  <view> Pinia的state: count = {{ count }} </view>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserStore } from "@/store/userStore";

// setup composition API模式
const userStore = useUserStore();
const { count } = storeToRefs(userStore);
</script>
```

### 创建总入口

在 `src/store` 目录下创建一个入口 `index.ts`，其中包含一个注册函数 `registerStore()`，其作用是把整个项目的 `store` 都提前注册好，最后把所有的 `store` 实例挂到 `appStore` 透传出去。这样以后，只要我们在项目任何组件要使用 `pinia` 时，只要 `import appStore` 进来，取对应的 `store` 实例就行

```ts
import { useUserStore } from "./modules/userStore";

const appStore: Record<string, any> = {};

/**
 * 注册app状态库
 */
export function registerStore() {
  appStore.userStore = useUserStore();
}

export default appStore;
```

### 总线注册

在 `src/main.ts` 项目总线执行注册操作：

```ts
import { createSSRApp } from "vue";
import App from "./App.vue";
import { registerStore } from "./store";
import store from "@/store/register";

/**
 * createApp
 */
export function createApp() {
  const app = createSSRApp(App);
  app.use(store);

  // 注册pinia状态管理库
  registerStore();

  return {
    app,
  };
}
```

业务组件内直接使用

```vue
<template>
  <view> Pinia的state: count = {{ count }} </view>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import appStore from "@/store";

const { count } = storeToRefs(appStore.userStore);
</script>
```

## 过期时间

在 `src\utils\storage.ts` 中，封装 `uni` 的 `StorageSync`，设置带过期时间的本地缓存

```ts
interface StorageItem<T> {
  value: T;
  expiry: number;
}
/**
 * 封装uni的StorageSync，
 * 设置带过期时间的本地缓存
 */
const StorageWithExpiry = {
  /**
   * 编辑
   */
  set<T>(key: string, value: T, expiryInHours: number): void {
    const now = Date.now();
    const item: StorageItem<T> = {
      value,
      expiry: now + expiryInHours * 3600 * 1000, // 以小时为单位
    };
    uni.setStorageSync(key, JSON.stringify(item));
  },
  /**
   * 获取
   */
  get<T>(key: string): T | null {
    const itemStr = uni.getStorageSync(key);
    if (!itemStr) {
      return null;
    }
    try {
      const item: StorageItem<T> = JSON.parse(itemStr);
      const now = Date.now();
      console.log("🚀 ~ now > item.expiry:", now > item.expiry, key);
      if (now > item.expiry) {
        uni.removeStorageSync(key);
        return null;
      }
      return item.value;
    } catch (e) {
      // 如果解析出错，返回null
      return null;
    }
  },
  /**
   * 删除
   */
  remove(key: string): void {
    uni.removeStorageSync(key);
  },
};

export default StorageWithExpiry;
```

在状态管理的局部 `store` 中我们可以给状态管理加过期时间，例如我们给 `user` 状态添加过期时间，代码如下：

```js
// src\store\modules\userStore.ts

... // 此处代码省略

export const useUserStore = defineStore("userStore", storeSetup, {
  persist: {
    storage: {
      /**
       * 获取缓存
       */
      getItem: key => storeWithExpiry.get(key),
      /**
       * 设置过期缓存（单位：时）
       * 此时为2小时过期
       */
      setItem: (key, value) => storeWithExpiry.set(key, value, 2),
    },
  },
});
```
