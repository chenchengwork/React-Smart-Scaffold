import EnumEnv from 'constants/EnumEnv';
const apiPrefix = EnumEnv.apiPrefix || '/';

export const proxyAPI = (api) => apiPrefix.replace(/\/$/, "") + "/" + api.replace(/^\//, "");


export default {
    login: proxyAPI("login"),                   // 登录
    logout: proxyAPI("logout"),                 // 退出
    register: proxyAPI("register"),             // 注册

    /**
     * 业务A相关的API
     */
    screen: {
        getItem: proxyAPI("/screen/getScreen"),
        getPageList: proxyAPI("/screen/getPageList"),
        createItem: proxyAPI("/screen/createScreen"),
        updateItem: (screen_id) => proxyAPI(`/screen/updateScreen?screen_id=${screen_id}`),
        deleteItem: proxyAPI("/screen/deleteScreen")
    },
}
