# 组件库

以下介绍支持 `vue3` 开发的 `uniapp` 组件库，根据需求选择合适的组件库

## 分页组件

`z-paging` 一个 `uni-app (opens new window)`分页组件。
全平台兼容，支持自定义下拉刷新、上拉加载更多，支持自动管理空数据图、点击返回顶部，支持聊天分页、本地分页，支持展示最后更新时间，支持国际化等等。

### 基础使用

组件全局已预设，可直接使用，[使用详情](http://www.zxlee.cn/start/intro.html)

```vue
<template>
  <z-paging ref="paging" v-model="list" @query="getList">
    <wd-card v-for="item in list" :key="item.id" type="rectangle">
      <template #title>
        <view class="title">
          <view>{{ item.created_at }}</view>
          <view class="title-tip">
            <wd-icon
              name="warning"
              size="14px"
              custom-style="vertical-align: bottom"
            />
            身份证：{{ item.id_card }}
          </view>
        </view>
      </template>
      <view h-40px class="content">
        <image
          :src="item.avatar"
          alt="joy"
          class="border-rd-4 mr-12 h-80 w-80"
        />
        <view>
          <view class="text-[rgba(0,0,0,0.85)] text-1">
            {{ item.name }}
          </view>
          <view class="text-[rgba(0,0,0,0.25)] text-24">
            邮箱：{{ item.email }} | 年龄：{{ item.age }}
          </view>
        </view>
      </view>

      <template #footer>
        <view>
          <wd-button size="small" plain @click="handleDetail">
            查看详情
          </wd-button>
        </view>
      </template>
    </wd-card>
  </z-paging>
</template>

<script lang="ts" setup>
const router = useRouter();

const list = ref<User[]>([]);
const paging = ref<ZPagingInstance<any> | null>(null);
/**
 * 分页查询数据
 */
function getList(pageNum: number, pageSize: number) {
  api_user_getCustomers({ pageNum, pageSize })
    .then((res) => {
      const newList = (res.data as Pagination<User>)?.list || [];
      paging.value!.complete(newList);
    })
    .catch(() => {
      paging.value!.complete(false);
    });
}
/**
 * taioz
 */
function handleDetail() {
  router.navigateTo({
    path: "/pages-sub/detail/index",
    // 参数
    query: {
      name: "name",
    },
  });
}
</script>

<style scoped lang="scss">
.content,
.title {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.content {
  justify-content: flex-start;
}
.title {
  justify-content: space-between;
}
.title-tip {
  color: rgba(0, 0, 0, 0.25);
  font-size: 12px;
}
</style>
```

### 预览

<div style="display: grid; grid-template-columns: repeat(2, auto); gap: 10px;">
  <img src="http://www.zxlee.cn/github/uni-z-paging/uni-z-paging.gif" alt="演示图1">
  <img src="http://www.zxlee.cn/github/uni-z-paging/uni-z-paging2.gif" alt="演示图2">
</div>

## 开源组件库

### wot-design-uni

**项目默认预设 UI**，[wot-design-uni](https://wot-design-uni.netlify.app/) 组件库基于 `vue3+Typescript` 构建，参照 `wot design` 的设计规范进行开发，提供 `70+高质量组件`，支持`暗黑模式`、`国际化`和`自定义主题`，旨在给开发者提供统一的 `UI` 交互，同时提高研发的开发效率。

### nutui-uniapp

[nutui-uniapp](https://nutui-uniapp.netlify.app/)京东风格的轻量级移动端组件库，基于 uniapp 与 Vue3，支持移动端 H5 和 小程序开发

### uview-plus

[uview-plus](https://uview-plus.jiangruyi.com/)，是全面兼容 `nvue` 的 `uni-app` 生态框架，全面的组件和便捷的工具会让您信手拈来，如鱼得水，基于 `uView2.0` 初步修改，后续会陆续修复 `vue3` 兼容性，以及组合式 `API` 改造等。

### tuniao ui

美观易用是 [TuniaoUI](https://vue3.tuniaokj.com/) 追求的。`TuniaoUI` 现在已经发布了 `uni-app `跳转到 `vue2` 文档和 `vue3` 版本，当前文档为 `vue3` 文档，后续会不断的拓展其他原生版本，扩大生态，让更多的开发者可以使用 `TuniaoUI`。

### ano-ui

[ano-ui](https://ano-ui.netlify.app/)酷炫简洁 UI，使用 TypeScript 进行开发，提供了丰富的组件进行快速开发。缺点组件较少

### uv-ui

[uv-ui](https://www.uvui.cn/)基于 `uview2.x `版本改造而来。重命名也是为了避开发布冲突和很多组件 u-在 `nvue` 中不能使用的情况，所以这才诞生了 `uv-ui`。感谢 `uview-ui` 作者的开源奉献，再次为开源点赞。 同时 `uv-ui` 也是无条件开源。

### vin-ui

[vin-ui](https://github.com/vingogo/vin-ui)京东（`nutui`）风格的移动端 `Vue3 `组件库 、支持多端小程序（`uniapp` 版本）。

## 收费组件

### thorui-uni

轻量、简洁的移动端组件库。部分组件收费

### firstui-uni

基于 `uni-app` 开发的组件化、可复用、易扩展、低耦合的跨平台移动端 `UI` 组件库。收费组件
