'use strict';

const path = require('path');
const fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);


// config after eject: we're in ./config/
module.exports = {
    webContentPath: resolveApp('public'),               // web服务内容path
    buildPath: resolveApp('public/build'),              // 编译后的文件path
    webpackPublicPath: "/public/",                      // webpack编译的public path
    app_IndexJs: resolveApp('src/index.js'),            // 入口文件路径
};
