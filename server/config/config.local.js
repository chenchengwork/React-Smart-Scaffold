'use strict';
const path = require("path");

/**
 * 开发环境配置文件
 * @param appInfo
 * @returns {{}}
 */
module.exports = appInfo => {
    const isDev = appInfo.env === 'local';
    const config = {};

    config.cluster = {
        listen: {
            hostname: "localhost",          // 主机名称
            // hostname: "10.0.5.237",      // 主机名称
            port: 8002,                     // 监听端口
        }
    };


    // 配置cors
    // 详细的配置参数: https://github.com/koajs/cors
    if(isDev) {
        config.cors = {
            // 允许的跨域主机
            origin: (request) => {
                if (
                    [
                        "http://localhost:8000",
                        "http://127.0.0.1:8000",
                    ].indexOf(request.header.origin) !== -1
                ) {
                    return request.header.origin
                }

                return false;
            },
            credentials: true,      // 允许携带cookie
        };
    }

    // 配置安全模块
    config.security = {
        csrf: {
            enable: isDev ? false : true,      // 关闭crsf
        }
    };

    // 配置view
    config.view = {
        defaultViewEngine: 'nunjucks',  // 默认视图引擎
    };

    // 配置静态服务
    config.static = {
        gzip: true,        // 开启gzip压缩
        maxAge: 0,         // http中控制资源的最大缓存时间
        buffer: false,     // 是否将访问的文放入到内存中
    };

    // 配置graphql
    config.graphql = {
        router: '/graphql',
        // 是否加载到 app 上，默认开启
        app: true,
        // 是否加载到 agent 上，默认关闭
        agent: false,
        // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
        graphiql: true,
        // graphQL 路由前的拦截器
        onPreGraphQL: async function (ctx) {},
        // 开发工具 graphiQL 路由前的拦截器，建议用于做权限操作(如只提供开发者使用)
        onPreGraphiQL: async function (ctx) {},
    };

    config.middleware = [ 'graphql' ];


    return config;
};
