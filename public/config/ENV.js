/**
 * 配置文件
 * @type {{apiDomain}}
 */
var ENV = (function () {
    var apiDomain = "http://localhost:7101";
    var rootPath = "/";

    return {
        rootPath: rootPath,                                 // 根路由前缀
        apiDomain: apiDomain,
        login: {
            isStartLoginCheck: false,                        // 是否开启登录验证
            cookieKey: "vis_sess",                          // 登录验证的cookie
            defaultRedirectUrl: rootPath + "demoList",        // 默认跳转页面
            loginUrl: rootPath + "login",                   // 登录页面路由
        }
    }
})();
