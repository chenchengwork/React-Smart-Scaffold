const apiPrefix = window.ENV.apiPrefix || '/';

const proxyAPI = (api) => apiPrefix.replace(/\/$/, "") + "/" + api.replace(/^\//, "");


export default {
    login: proxyAPI("login"),                   // 登录
    logout: proxyAPI("logout"),                 // 退出
    register: proxyAPI("register"),             // 注册

    /*
     |-----------------------------------------------------------------------------------------------------
     | 大屏相关的API
     |-----------------------------------------------------------------------------------------------------
     */
    getScreen: proxyAPI("/screen/getScreen"),
    uploadSource: proxyAPI("/screen/uploadSource"),

    screenPageList: proxyAPI("/screen/getPageList"),
    createScreen: proxyAPI("/screen/createScreen"),
    updateScreen: (screen_id) => proxyAPI(`/screen/updateScreen?screen_id=${screen_id}`),
    deleteScreen: proxyAPI("/screen/deleteScreen"),
    uploadCover: (screen_id) => proxyAPI(`/screen/uploadScreenCover?screen_id=${screen_id}`),
}
