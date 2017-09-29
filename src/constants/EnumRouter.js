/**
 * Created by chencheng on 2017/6/13.
 */

const _rootRoute = ENV.rootPath;

/**
 * 格式化路由
 * @param route
 * @returns {*}
 * @private
 */
const _processRoute = (route) => (_rootRoute + route);

/**
 *
 * @type {{rootRoute: string, login: *, dHub_pluginManage: *, dHub_hostMonitor: *, dHub_pluginMonitor: *, dMart_dataSource: *, dVisual_bigScreen: *}}
 */
const EnumRouter = {

    rootRoute: _rootRoute,		//根路由

    login: _processRoute('login'),		//登陆

    /*
     |-----------------------------------------------
     | 数据采集-相关的路由
     |-----------------------------------------------
     */
    dHub_pluginManage:_processRoute('dataHub/pluginManage'),
    dHub_hostMonitor:_processRoute('dataHub/resourceMonitor/host'),
    dHub_pluginMonitor:_processRoute('dataHub/resourceMonitor/plugin'),

    /*
     |-----------------------------------------------
     | 数据可视化-相关的路由
     |-----------------------------------------------
     */
    dVisual_bigScreen:_processRoute('dataVisual/bigScreen'),
};


export default EnumRouter;
