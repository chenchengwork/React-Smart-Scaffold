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

