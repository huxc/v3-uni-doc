# 环境变量

在 `Vite` 中，环境变量的使用是通过 `.env` 文件以及在代码中访问这些变量来实现

## 定义环境变量

`.env`文件定义在跟目标 `/env` 文件夹下面：<br/>

- `.env`：默认的环境变量
- `.env.production`：生产环境的变量
- `.env.development`：开发环境的变量
- `.env.local`：本地覆盖，可以覆盖 `.env` 文件中的默认变量，不提交到版本控制。

示例内容：

```env
# 微信小程序的 appid
VITE_MPWX_APPID = "wx92c1da09cd0d523b"

# 微服务的 BaseUrl（多服务配置）
VITE_API_DOMAIN_JSON = '{
  "basics": "http://172.16.164.37:3001/basics",
  "xxxx": "http://172.16.164.37:3000/xxxx"
}'
```

## 优先级

在加载环境变量时，`Vite` 会按照以下优先级从高到低加载：

- `.env.local`
- `.env.[mode].local`（如 `.env.development.local`、`.env.production.local`）
- `.env.[mode]`（如 `.env.development`、`.env.production`）
- `.env`

## 使用环境变量

在 `Vite` 中，环境变量需要以 `VITE\_ `开头。你可以通过 `import.meta.env` 访问这些变量。例如：

```js
console.log(import.meta.env.VITE_MPWX_APPID);
console.log(import.meta.env.VITE_API_DOMAIN_JSON);
```

`import.meta.env` 在读取环境变量默认都是字符串，项目已经帮助你自动转换变量类型。可直接使用值<br/>
示例内容：

```js
const json = import.meta.env.VITE_API_DOMAIN_JSON;
const basics = json.basics;

// or

import.meta.env.VITE_API_DOMAIN_JSON.basics;
```
