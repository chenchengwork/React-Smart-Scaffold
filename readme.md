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

(3). 在线编辑editor
    a). 基于Monaco Editor的react-monaco-editor
    https://github.com/superRaytin/react-monaco-editor
    Monaco Editor官网： https://microsoft.github.io/monaco-editor/index.html

(4). react布局
    a). 自由拖拽布局
    https://github.com/STRML/react-grid-layout
    
    b). 只拖拽
    https://github.com/mzabriskie/react-draggable
    
    c). 只更改dom大小
    https://github.com/STRML/react-resizable
    
    d). 拖拽和更改大小
    https://github.com/bokuweb/react-rnd
    
(5). 数据格式化
    a). JSON normalizr
    https://github.com/paularmstrong/normalizr
    
(6). 轻量级react table
    https://react-table.js.org/#/story/readme
    
(7). 添加全屏背景视频的库
    https://github.com/rishabhp/bideo.js
    
(8). 键盘操作事件库
    https://github.com/ccampbell/mousetrap
    
(9). 颜色选择器
    https://github.com/casesandberg/react-color

(10). 头部进度条
    http://ricostacruz.com/nprogress/
    
(11). 全局提示组件
    https://github.com/fkhadra/react-toastify
    
(12). 全局提示框
    https://github.com/haradakunihiko/react-confirm
    
```

5. PWA资源
```
(1). pwa实战源码
https://github.com/deanhume/progressive-web-apps-book

(2). Workbox构建PWA
https://codelabs.developers.google.com/codelabs/workbox-lab-cn/index.html?index=..%2F..%2Fgddchina#0

(3). workbox结合Webpack构建PWA
https://webpack.docschina.org/guides/progressive-web-application/

```
6. React 服务器渲染框架
```
(1). Next.js
    https://github.com/zeit/next.js     // 代码仓库
    https://juejin.im/post/59f72fef518825569538ef5a // Next.js v4.1.4 文档
    
(2). gatsby(静态站点生成器)
    https://github.com/gatsbyjs/gatsby
    
注意:
    next.js 和 gatsby的区别是：
        next.js是动态在服务器进行渲染成静态页面，然后发送到前端
        gatsby是预先生成静态页面，避免了重复渲染,它是静态站点生成器
    
    
```
7. 实现高阶组件常用包
```
(1). hoist-non-react-statics
    它会自动拷贝所有非React的静态方法
    https://github.com/mridgway/hoist-non-react-statics

```
8. React兼容的第三方mini库
```
(1). 完全兼容React16的第三方库
https://github.com/RubyLouvre/anu

(2). preact
https://github.com/developit/preact

```

9. 浏览器本地存储管理包
```
(1). localStore管理
https://github.com/ozantunca/locally

```

10. js算法
```
(1). 字符串压缩算法
http://pieroxy.net/blog/pages/lz-string/index.html

```

11. 组件工具
```
(1). 飞冰可视化设计器
https://alibaba.github.io/ice/docs/ice-design

```

12. 可视化组件库
```
(1). echarts

(2). highcharts

(3). antV
https://antv.alipay.com/zh-cn/index.html
备注： 针对antV封装的react组件库
http://bizcharts.net/index

```

13. react动画组件
```
(1).
https://github.com/FormidableLabs/react-animations

(2). 组件进入或离开是的过度动画库
https://github.com/reactjs/react-transition-group

(3). antd motion动画库
https://motion.ant.design/components/tween-one

(4). React FLIP动画助手库，用于高度可配置的过渡
https://github.com/aholachek/react-flip-toolkit

(5). 滚动动画
https://github.com/gilbox/react-spark-scroll

(6). 动画问题的春天
https://github.com/chenglou/react-motion

(7). 数据驱动动画
https://github.com/tkh44/data-driven-motion

(8). 数据驱动动画
https://github.com/react-tools/react-move

(9). 交互dom速率组件包
https://github.com/google-fabric/velocity-react

```

14. react中内置style css
```
1. 自带样式的组件
https://github.com/styled-components/styled-components

2. 
https://github.com/cssinjs/react-jss

3.
https://github.com/Khan/aphrodite

4.
https://github.com/FormidableLabs/radium

5.
https://github.com/zeit/styled-jsx

```


