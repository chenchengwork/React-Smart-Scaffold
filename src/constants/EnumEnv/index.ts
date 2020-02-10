import deepmerge from '@/utils/T/core/deepmerge';

// @ts-ignore
const rootPath = window.ENV ? window.ENV.rootPath || "/" : "/";

const defaultEnumEnv = {
    rootPath,                                      // 根路由前缀
    apiDomain: "",                                 // api域名
    apiPrefix: '/',                                 // api前缀
    // 平台相关的配置
    platform: {
        title: "React-Smart-Scaffold",                        // 平台标题
        logoUrl: require("./img/logo.svg"),      // logo的url地址
    },
    intl: {
        lang: 'zh',                 // 语言
        timeZoneOffset: 8 * 60,     // 时区偏差, 单位分钟
    },
    respCode:{
        apiSuccessCode: "success",                          // 请求成功响应code
        errorCode: "error",                                 // 请求失败响应code
        noLoginCode: "110",                             // 未登录的code
        invalidParamCode: "invalid_param",                  // 参数校验失败code
    },
    login: {
        isStartLoginCheck: true,                        // 是否开启登录验证
        cookieKey: "vis_sess",                          // 登录验证的cookie
        defaultRedirectUrl: rootPath + "videoMonitor",        // 默认跳转页面
        loginUrl: rootPath + "login",                   // 登录页面路由
    }
};

const EnumEnv: typeof defaultEnumEnv = deepmerge(defaultEnumEnv,
    // @ts-ignore
    window.ENV || {});

export default EnumEnv;
