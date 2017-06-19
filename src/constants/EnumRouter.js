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
const _processRoute = (route) => {

	return _rootRoute + route;
}

/**
 * 枚举使用的路由
 * @type {{home, user}}
 */
const EnumRouter = {
	rootPath:_rootRoute,

	home:_processRoute('home'),

	user:_processRoute('user')
}


export default EnumRouter;

