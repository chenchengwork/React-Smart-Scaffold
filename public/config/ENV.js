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
        apiPrefix: '/',                                     // api前缀
        screen: {   // 大屏相关配置
            screenEndPort: "http://localhost:7000/screen.html",
            editorEndPort: "http://localhost:7000/editor.html",
        },
        respCode:{
            apiSuccessCode: "success",                          // 请求成功响应code
            errorCode: "error",                                 // 请求失败响应code
            noLoginCode: "noLogin",                             // 未登录的code
            invalidParamCode: "invalid_param",                  // 参数校验失败code
        },
        login: {
            defaultRedirectUrl: rootPath + "screen",        // 默认跳转页面
            loginUrl: rootPath + "login",                   // 登录页面路由
        }
    }
})();
