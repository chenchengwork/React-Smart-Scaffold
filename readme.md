1.项目目录结构说明
```
|--__mocks__        //单元测试mock
|
|--__tests__        //单元测试目录
|
|--build
|    |
|    |--webpack.config.js       //webpack打包配置文件
|
|--mock
|    |
|    |--db.json         //模拟数据
|    |
|    |--routes.json     //与模拟数据的路由配置
|
|
|--public
|    |
|    |--config          //发布配置目录
|    |
|    |--index.html      //发布入口文件
|
|--scripts
|    |
|    |--translateIntl.js        //提取国际化内容并
|
|
|--src
    |
    |--actions          //存放action
    |
    |--components       //存放业务组件的，不同模块的业务组件不能相互引用
    |
    |--constants        //存放枚举
    |
    |--lang             //存放国际化语言包
    |
    |--reducers         //存放reducer
    |
    |--routes           //存放路由配置和路由入口
    |
    |--templates        //存放公共组件
    |
    |--utils            //存放工具方法
    |
    |--index.js         //入口文件
    |
    |--locale.js        //国际化区域设定
    |
    |--store.js         //实例redux stroe
    |
    |--base.scss        //基础样式

```

2. 升级devDependencies
```

npm install autoprefixer babel-cli babel-core babel-eslint babel-jest babel-loader babel-plugin-import babel-plugin-react-intl babel-plugin-transform-decorators babel-plugin-transform-decorators-legacy babel-polyfill babel-preset-es2015 babel-preset-react babel-preset-stage-0 bundle-loader cli-color copy-webpack-plugin crypto css-loader css-to-string-loader enzyme eslint eslint-config-airbnb eslint-config-alloy eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react extract-text-webpack-plugin file-loader glob jest json-server less less-loader mkdirp node-sass postcss-flexbugs-fixes postcss-loader react-hot-loader react-test-renderer rimraf sass-loader string-loader style-loader url-loader urlencode urllib-sync webpack webpack-dev-server  --save-dev

```

3. 升级dependencies
```

npm install antd axios flex.css immutability-helper jquery js-cookie lodash onfire.js promise-polyfill prop-types query-string react react-addons-pure-render-mixin react-dom react-intl react-redux react-router-dom redux redux-logger redux-thunk url-search-params-polyfill  --save  --registry http://registry.cnpmjs.org 

```

4. 常用组件
```
(1). react美化滚动条
https://github.com/malte-wessel/react-custom-scrollbars

(2). react动画库
https://github.com/FormidableLabs/react-animations
// 组件进入或离开是的过度动画库
https://github.com/reactjs/react-transition-group

(3). 在线编辑editor
    a). 基于Monaco Editor的react-monaco-editor
    https://github.com/superRaytin/react-monaco-editor
    Monaco Editor官网： https://microsoft.github.io/monaco-editor/index.html

(4). react布局
    a). 自由拖拽布局
    https://github.com/STRML/react-grid-layout

```
