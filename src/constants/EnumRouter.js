/**
 *
 * @type {{rootRoute: string, login: string, screen: string, data: string}}
 */
const EnumRouter = {
    rootRoute: '',		        // 根路由

    login: 'login',		// 登录
    screen: 'screen',		// 我的可视化
    data: 'data',		    // 我的数据

};


export default (() => {
    let routes = {};
    for (let [key, route] of Object.entries(EnumRouter)) {
        Object.defineProperty(routes, key, {
            get: () => {
                return window.ENV.rootPath + route;

                // TODO 后续改用这种方式
                // const path = window.ENV.rootPath + route;
                // return {
                //     path,
                //     // 实例化url参数
                //     getUrl: (params = {}) => {
                //         return T.lodash.isEmpty(params) ? path : path + '?' + T.queryString.stringify(params);
                //     }
                // };
            },
            configurable: false
        });
    }

    return routes;
})();
