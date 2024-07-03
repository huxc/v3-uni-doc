module.exports = {
    projectName: "uni",
    readyTimeout: 20000,
    dev: {
      name: "测试环境",
      script: "npm run docs:build",
      host: "180.100.200.14",
      port: 22,
      username: "root",
      distPath: ".vitepress/dist",
      webDir: "/usr/local/nginx/html/uni",
      bakDir: "/usr/local/nginx/html/uni_old",
      isRemoveRemoteFile: true,
      isRemoveLocalFile: false,
    },
  };
  