import {helper} from 'utils/T';

const rootPath = window.ENV ? window.ENV.rootPath || "/" : "/";

const EnumEnv = helper.deepmerge({
    rootPath,                                      // 根路由前缀
    apiDomain: "",                                 // api域名
    apiPrefix: '/',                                // api前缀
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
}, window.ENV || {});


export default EnumEnv;
