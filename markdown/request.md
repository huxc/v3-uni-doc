# 网络请求

## http 请求封装

基于 `uni-network`(类似于 `Axios`) 请求库进行策略封装

### BaseUrl 配置

在环境变量配置中，修改接口请求的域名（`env/.env.xxx`）

```sh
# 接口请求的 BaseUrl
VITE_API_BASE_URL = 'http://172.16.164.37:3000'
# 接口请求的上传接口
VITE_API_UPLOAD_URL = 'http://172.16.164.37:3000'
```

### 微服务多域名配置

在环境变量的配置中，可配置微服务多域名（`env/.env.xxx`）

```
# 微服务的 BaseUrl（多服务配置）
VITE_API_DOMAIN_JSON = '{
  "basics": "http://172.16.164.37:3001",
  "xxxx": "http://172.16.164.37:3000/business"
}'
```

配置完成后把对应的服务名传入请求实例的参数对象`domain`属性中，代码如下：

```js
/**
 * api_user_getCustomers
 * 获取客户信息列表
 */
export function getCustomers(data: any, prop = {}) {
  return http.request({
    data,
    ...prop,
    method: "GET",
    domain: "basics", // 此处配置服务名
    url: "/customer",
  });
}
```

### 统一获取登录态

在登录成功后，会将登录信息保存到 `pinia` 中（`src/store/modules/userStore.ts`），读取登录信息中的，如下代码：

```js
import appStore from "@/store";

const userInfo = appStore.userStore;
```

在请求中我们需要把 `token` 传到服务端，根据请求接口配置需要在 `headers` 中传参的字段名，在配置文件(文件路径：`env/.env`)中修改

```sh
...
# header里传token的键名
VITE_ACCESS_TOKEN_KEY = 'Authorization'
...

```

### 请求去重

当`请求方式`、`请求 URL 地址`和`请求参数`都一样时，就可以认为请求是一样的。因此在每次发起请求时，我们就可以根据当前请求的`请求方式`、`请求 URL 地址`和`请求参数`来生成一个唯一的 `key`，同时为每个请求创建一个专属的 `CancelToken`，然后把 `key` 和 `cancel` 函数以键值对的形式保存到 `Map` 对象中，当出现重复请求的时候，我们就可以使用 `cancel` 函数来取消前面已经发出的请求。此时取消请求，该请求就会被立即取消，不会真正发起请求。

### 参数统一 Data

在`uni-network`中 `get` 请求参数为`params`，`post` 请求参数为`data`,在项目中封装为统一传入 `data` 字段

### 全局 loading

在使用请求实例的时候，默认是全局弹出请求 `loading` 的，可以配置全局参数为 `false`，(文件路径：`env/.env`)，即可关闭

```sh
// env/.env
...
# 请求接口是否显示loading (全局)
VITE_IS_LOADING = false
...
```

如果想局部某个请求关闭 `loading` 可以给实例传参，如下示例

```js
import http from "@/utils/uni-network/index";

// 此处http.request实例方法对象参数可配置 isLoading:false
export function getCustomers(data: any, prop = {}) {
  return http.request({
    data,
    ...prop,
    // isLoading: false,
    method: "GET",
    domain: "basics",
    url: "/customer",
  });
}
```

或者在调用函数的时候配置（推荐）示例：

```js
// 此处的isLoading:false即可关闭
api_user_getCustomers({ pageNum, pageSize }, { isLoading: false })
  .then((res) => {
    // 成功
  })
  .catch(() => {
    // 失败
  });
```

### 错误统一弹框

在使用请求实例的时候，请求失败后默认会自动弹出错误（根据接口返回的错误字段，可在请求实例参数中关闭

```js
// 此处的isMsg:false即可关闭
api_user_getCustomers({ pageNum, pageSize }, { isMsg: false }).then(
  (res) => {
    // 成功
  },
  (error) => {
    // 在这里处理错误信息
  }
);
```

### 无感刷新登录态

无感刷新登录态的核心代码在 `src/utils/uni-network/refresh.ts` 中，如果使用需要根据业务接口做相应的调整 <br/>

#### 修改配置文件

在 env/.env 文件中修改登录态过期状态码

```sh
# token 过期状态码
VITE_ACCESS_TOKEN_EXP = 401
```

#### 修改刷新 token 接口

在 `src/utils/uni-network/refresh.ts` 中修改刷新 `token` 的接口

```ts
// src/utils/uni-network/refresh.ts

function refreshToken(): Promise<void> {
  ...
  return new Promise((resolve, reject) => {
    // 刷新token
    un.post('/users/refresh'}, {
      baseUrl: import.meta.env.VITE_API_BASE_URL,
      header: {
        // 根据业务接口需求添加
      },
    })
      .then(res => ((res.data as ApiRes).code === 200 ? res : Promise.reject(res)))
      .then((res: UnResponse) => {
        const result = res.data as ApiRes
        store.userStore.refToken(result.data) // 更新pinia中的token
        ...
      })
      .catch((err: UnError) => {
       ...
      })
      .finally(() => {
        isRefreshing = false
      })
  })
}
```
