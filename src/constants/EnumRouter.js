/**
 * Created by chencheng on 2017/6/13.
 */

/**
 *
 * @type {{rootRoute: string, login: *, dHub_pluginManage: *, dHub_hostMonitor: *, dHub_pluginMonitor: *, dMart_dataSource: *, dVisual_bigScreen: *}}
 */
const EnumRouter = {
    rootRoute: '',		// 根路由

    login: 'login',		// 登陆

    /*
     |-----------------------------------------------
     | 数据采集-相关的路由
     |-----------------------------------------------
     */
    dHub_pluginManage: 'dataHub/pluginManage',
    dHub_hostMonitor: 'dataHub/resourceMonitor/host',
    dHub_pluginMonitor: 'dataHub/resourceMonitor/plugin',

    /*
     |-----------------------------------------------
     | 数据可视化-相关的路由
     |-----------------------------------------------
     */
    dVisual_bigScreen: 'dataVisual/bigScreen',
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
