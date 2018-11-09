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
            defaultRedirectUrl: rootPath + "screen",        // 默认跳转页面
            loginUrl: rootPath + "login",                   // 登录页面路由
        }
    }
})();
