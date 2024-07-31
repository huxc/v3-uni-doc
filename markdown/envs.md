# 环境变量

在 `Vite` 中，环境变量的使用是通过 `.env` 文件以及在代码中访问这些变量来实现

## 定义环境变量

你可以在你的项目根目录 `/env` 中放置下列文件来指定环境变量：

```sh
.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略
.env.[mode]         # 只在指定的模式中被载入
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略
```

## 优先级

在加载环境变量时，`Vite` 会按照以下优先级从高到低加载：

```sh
.env.local
.env.[mode].local   # 如 .env.development.local、.env.production.local
.env.[mode]         # 如 .env.development、.env.production
.env

```

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

## 使用环境变量

::: danger 提示
`import.meta.env` 读取环境变量默认都是字符串，模版项目已经帮助你自动转换变量类型。可直接使用值
:::

在 `Vite` 中，环境变量需要以 `VITE\_ `开头。你可以通过 `import.meta.env` 访问这些变量。例如：

```js
console.log(import.meta.env.VITE_MPWX_APPID);
console.log(import.meta.env.VITE_API_DOMAIN_JSON);
```

示例内容：

```js
const json = import.meta.env.VITE_API_DOMAIN_JSON;
const basics = json.basics;

// or

import.meta.env.VITE_API_DOMAIN_JSON.basics;
```
